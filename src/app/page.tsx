'use client';

import { Header } from '@/components/layout/header';
import { MainContents } from '@/components/main-contents';
import { SideMenu } from '@/components/side-menu/side-menu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [hasActiveNicca, setHasActiveNicca] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  useEffect(() => {
    const checkActiveNicca = async () => {
      const response = await fetch('/api/nicca/active');
      const data = await response.json();
      setHasActiveNicca(data.hasActiveNicca);
      if (!data.hasActiveNicca) {
        setIsRegisterModalOpen(true);
      }
    };

    checkActiveNicca();
  }, []);

  const openRegisterModal = () => {
    if (hasActiveNicca) {
      alert('途中の日課があります');
    } else {
      setIsRegisterModalOpen(true);
    }
  };
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterModal={openRegisterModal} hasActiveNicca={hasActiveNicca} />
        <MainContents
          isRegisterModalOpen={isRegisterModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          closeRegisterModal={closeRegisterModal}
          hasActiveNicca={hasActiveNicca}
          setHasActiveNicca={setHasActiveNicca}
        >
          <div>main-contents</div>
        </MainContents>
      </div>
    </div>
  );
}
