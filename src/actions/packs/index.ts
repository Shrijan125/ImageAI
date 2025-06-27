'use server';

import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export interface GetPackResponse {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  PackPrompts: {
    id: string;
    prompt: string;
  }[];
}
[];

export const getPacks = async (): Promise<GetPackResponse[]> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return [];
  }

  const packs = await prisma.packs.findMany({
    where: {
      PackPrompts: {
        some: {
          prompt: {
            not: '',
          },
        },
      },
    },
    include: {
      PackPrompts: {
        select: {
          prompt: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return packs;
};
