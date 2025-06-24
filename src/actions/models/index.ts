'use server';

import { TrainModelFormValues } from '@/components/TrainModel';
import prisma from '@/db';
import { TrainModel } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fal } from '@fal-ai/client';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export const getModels = async (): Promise<TrainModel[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return [];
  }

  const models = await prisma.trainModel.findMany({
    where: {
      userId: user?.id,
    },
  });

  return models;
};

export async function getPresignedUrlAction() {
  const key = `models/${Date.now()}_${Math.random()}.zip`;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    ContentType: 'application/zip',
  });

  const url = await getSignedUrl(r2Client, command, {
    expiresIn: 60 * 5,
  });

  return {
    url,
    modelkey: key,
  };
}

export const trainModel = async ({
  name,
  age,
  bald,
  ethinicity,
  eyeColor,
  type,
  zipUrl,
}: TrainModelFormValues) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('User not authenticated');
  }
  const { request_id, response_url } = await fal.queue.submit(
    'fal-ai/flux-lora-fast-training',
    {
      input: {
        images_data_url: zipUrl,
        trigger_word: name,
      },
      webhookUrl: `${process.env.WEBHOOK_BASE_URL}/api/fal/webhook/train`,
    }
  );
  await prisma.trainModel.create({
    data: {
      name: name,
      age: Number(age),
      bald: bald,
      ethinicity: ethinicity,
      eyeColor: eyeColor,
      type: type,
      zipUrl: zipUrl,
      falAIRequestId: request_id,
      falAIResponseUrl: response_url,
      userId: session.user.id,
      status: 'PENDING',
    },
  });
  await prisma.user.update({
    where:{
      id: session.user.id,
    },
    data:{
      credits: {
        decrement: 20,
      },
    }
  });
  return {
    success: true,
    message: 'Model training started successfully.',
  };
};
