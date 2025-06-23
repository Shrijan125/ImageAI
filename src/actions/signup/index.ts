'use server';
import prisma from '@/db';
import bcrypt from 'bcryptjs';

export const signupUser = async (
  email: string,
  password: string,
  username: string
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      username: username,
    },
  });

  return {
    success: true,
    message: 'User created successfully',
  };
};
