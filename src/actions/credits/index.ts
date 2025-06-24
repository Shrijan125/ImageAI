'use server';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export const getCredits = async (): Promise<number> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return 0;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return 0;
  }

  return user.credits;
};
