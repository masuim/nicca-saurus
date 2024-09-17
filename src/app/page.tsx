'use client';

import { Header } from '@/components/layout/header';
import { MainContents } from '@/components/main-contents';
import { SideMenu } from '@/components/side-menu/side-menu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isRegisterTaskModalOpen, setIsRegisterTaskModalOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideMenu />
        <MainContents />
      </div>
      {isRegisterTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">日課登録</h2>
            {/* モーダルの内容 */}
            <button
              className="mt-4 rounded bg-primary px-4 py-2 text-white"
              onClick={() => setIsRegisterTaskModalOpen(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
