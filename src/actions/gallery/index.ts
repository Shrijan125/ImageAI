'use server';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export const getImages = async (): Promise<string[]> => {
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

  const images = await prisma.outputImages.findMany({
    where: {
      userId: user.id,
    },
    select: {
      imageUrl: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return images.map(image => image.imageUrl);
};

export const saveImage = async (
  imageUrl: string,
  modelId: string,
  prompt: string,
  requestId: string,
  cost : number
): Promise<void> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('User not authenticated');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const model = await prisma.trainModel.findUnique({
    where: {
      id: modelId,
    },
  });

  if (!model) {
    throw new Error('Model not found');
  }

  await prisma.user.update({
    where:{
      id: user.id,
    },
    data: {
      credits: {
        decrement: cost,
      },
    }
  });

  await prisma.outputImages.create({
    data: {
      userId: user.id,
      imageUrl: imageUrl,
      modelId: modelId,
      prompt: prompt,
      status: 'GENERATED',
      falAIRequestId: requestId,
    },
  });

  return;
};
