'use server';

import prisma from '@/db';
import { TrainModel } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

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
