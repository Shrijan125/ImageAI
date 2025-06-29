'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
import Loader from '../Loader';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Sign in failed. Please check your credentials.');
        return;
      }

      const session = await getSession();
      if (session) {
        toast.success('Signed in successfully!');
        router.replace('/home');
      }
    } catch (error) {
      toast.error('Sign in failed. Please check your credentials.');
    }
  }
  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="h-screen w-screen sm:w-[80%] mx-auto sm:h-full flex flex-col justify-center items-center px-4">
      <div className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-lg p-[1px]">
        <div className="border bg-black/90 borde-white/5 p-6 rounded-lg">
          <div className="bg-gradient-to-b sm:mb-4 mb-2 bg-clip-text bg-white to-zinc-500 via-zinc-300">
            <h1 className="text-4xl font-bold text-transparent">Sign In</h1>
          </div>
          <p className="mb-9 block sm:hidden text-secondary-text">
            Welcome back to your creative space. Sign in to generate stunning AI
            photos.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shrijan@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? <Loader></Loader> : 'Sign In'}
              </Button>
            </form>
          </Form>
          <div className="mt-8">
            Don't have an account?{' '}
            <Link href="/signup">
              <span className="text-blue-500 p-3 hover:cursor-pointer">
                Create Account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
