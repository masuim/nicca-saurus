'use client';

import { Layout } from '@/components/layout/Layout';
import { MainContents } from '@/components/MainContents';

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
      router.push('/');
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
    <Layout hasActiveNicca={hasActiveNicca} openRegisterDialog={openRegisterDialog}>
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
    </Layout>
  );
};
