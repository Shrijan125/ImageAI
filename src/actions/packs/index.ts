'use server';

import prisma from '@/db';
import { Packs } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export const getPacks = async (): Promise<Packs[]> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return [];
  }

  const packs: Packs[] = await prisma.packs.findMany({
    where: {
      PackPrompts: {
        some: {
          prompt: {
            not: '',
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return packs;
};
