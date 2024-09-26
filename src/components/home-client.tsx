'use client';

import { Header } from '@/components/layout/header';
import { MainContents } from '@/components/main-contents';
import { SideMenu } from '@/components/side-menu/side-menu';
import { useNicca } from '@/contexts/niicca-context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const HomeClient = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { hasActiveNicca, refreshActiveNicca, activeNicca } = useNicca();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  const openRegisterModal = () => {
    if (hasActiveNicca) {
      alert('途中の日課があります');
      return;
    }
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    refreshActiveNicca();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header openRegisterModal={openRegisterModal} />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterModal={openRegisterModal} hasActiveNicca={hasActiveNicca} />
        <MainContents
          isRegisterModalOpen={isRegisterModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          closeRegisterModal={closeRegisterModal}
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
