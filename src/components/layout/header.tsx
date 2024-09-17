'use client';

import { Button } from '@/components/ui/button';
import { useFlashMessage } from '@/contexts/flash-message-context';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import logo from '@/app/images/logos/bg-removed-logo.png';

export const Header = () => {
  const { data: session } = useSession();
  const { showFlashMessage } = useFlashMessage();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showFlashMessage('サインアウトしました', 'success');
      router.push('/auth');
    } catch (error) {
      showFlashMessage('サインアウト中にエラーが発生しました', 'error');
    }
  };

  return (
    <header className="flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
      <Link href="/">
        <Image
          src={logo}
          alt="App Logo"
          width={64}
          height={64}
          className="mt-1 h-full w-auto object-contain"
        />
      </Link>
      {session ? (
        <Button onClick={handleSignOut} variant="outline" size="sm">
          サインアウト
        </Button>
      ) : null}
    </header>
  );
};
