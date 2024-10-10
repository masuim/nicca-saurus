'use client';

import { Header } from '@/components/layout/Header';
import { SideMenu } from '@/components/layout/SideMenu';

import { MainContents } from '@/components/modules/MainContents';

import { useNicca } from '@/context/NiccaProvider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const HomeClient = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { hasActiveNicca, refreshActiveNicca, activeNicca } = useNicca();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  const openRegisterDialog = () => {
    if (hasActiveNicca) {
      alert('途中の日課があります');
      return;
    }
    setIsRegisterDialogOpen(true);
  };

  const closeRegisterDialog = () => {
    setIsRegisterDialogOpen(false);
    refreshActiveNicca();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header openRegisterDialog={openRegisterDialog} />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterDialog={openRegisterDialog} hasActiveNicca={hasActiveNicca} />
        <MainContents
          isRegisterDialogOpen={isRegisterDialogOpen}
          setIsRegisterDialogOpen={setIsRegisterDialogOpen}
          closeRegisterDialog={closeRegisterDialog}
          hasActiveNicca={hasActiveNicca}
          refreshActiveNicca={refreshActiveNicca}
          activeNicca={activeNicca}
        >
          <div>main-contents</div>
        </MainContents>
      </div>
    </div>
  );
};
