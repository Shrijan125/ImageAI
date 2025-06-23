'use client';
import React, { useState } from 'react';
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
import { signupUser } from '@/actions/signup';
import { toast } from 'sonner';
import Loader from '../Loader';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);
    try {
      const { email, password, username } = values;
      await signupUser(email, password, username);
      toast.success('Account created successfully. Try logging in now!');
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-screen sm:w-[80%] mx-auto sm:h-full flex flex-col justify-center items-center px-4">
      <div className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-lg p-[1px]">
        <div className="border bg-black/90 borde-white/5 p-6 rounded-lg">
          <div className="bg-gradient-to-b sm:mb-4 mb-2 bg-clip-text bg-white to-zinc-500 via-zinc-300">
            <h1 className="text-4xl font-bold text-transparent">Sign Up</h1>
          </div>
          <p className="mb-9 block sm:hidden text-secondary-text">
            Join us and light up your journey. Create your account to get
            started.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Shrijan Shreshth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button
                disabled={loading}
                onClick={() => {}}
                className="w-full"
                type="submit"
              >
                {loading ? <Loader></Loader> : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <div className="mt-8">
            Already have an account?{' '}
            <Link href="/signin">
              <span className="text-blue-500 p-3 hover:cursor-pointer">
                Login Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
