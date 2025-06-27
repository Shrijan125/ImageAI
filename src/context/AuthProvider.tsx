'use client';
import { fal } from '@fal-ai/client';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    fal.config({
      proxyUrl: '/api/fal/proxy',
    });
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
}
