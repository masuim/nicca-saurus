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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  const openRegisterModal = () => setIsRegisterModalOpen(true);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu openRegisterModal={openRegisterModal} />
        <MainContents
          isRegisterModalOpen={isRegisterModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        >
          <div>main-contents</div>
        </MainContents>
      </div>
    </div>
  );
}
