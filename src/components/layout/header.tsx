'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/app/images/logos/bg-removed-logo.png';
import { useSignOut } from '@/services/auth-service';

export const Header = () => {
  const { data: session } = useSession();
  const signOutUser = useSignOut();

  return (
    <header className="flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
      <Link href="/">
        <Image
          src={logo}
          alt="App Logo"
          width={64}
          height={64}
          className="mt-1 h-full w-auto object-contain"
          priority
        />
      </Link>
      {session ? (
        <Button onClick={signOutUser} variant="outline" size="sm">
          サインアウト
        </Button>
      ) : null}
    </header>
  );
};
