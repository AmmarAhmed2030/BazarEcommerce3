'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import UserAvatar2 from '../userAvatar';

export default function UserAvatar() {
  const router = useRouter();
  const { data: session } = useSession();
  async function handleLogout() {
    await signOut();

    router.push('/');
  }

  return <UserAvatar2 handleLogout={handleLogout} session={session} />;
}
