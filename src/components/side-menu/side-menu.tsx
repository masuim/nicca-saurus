'use client';

import { RegisterNiccaModal } from '@/components/common/modals/register';
import Image from 'next/image';
import { useState } from 'react';

import appLogo from '@/app/images/app-name/app-name-2column.png';
import { signOutUser } from '@/services/auth-service';

import { MenuButton } from './menu-button';

import { useFlashMessage } from '@/contexts/flash-message-context';
import { useRouter } from 'next/navigation';

type MenuItem = {
  label: string;
  onClick?: () => void;
};

export const SideMenu = () => {
  const { showFlashMessage } = useFlashMessage();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      showFlashMessage('サインアウトしました', 'success');
      router.push('/auth');
    } catch (error) {
      showFlashMessage('サインアウト中にエラーが発生しました', 'error');
    }
  };

  const [isRegisterNiccaModalOpen, setIsRegisterNiccaModalOpen] = useState(false);

  const handleRegisterTaskClick = () => {
    setIsRegisterNiccaModalOpen(true);
  };

  const menuItems: MenuItem[] = [
    { label: '日課登録', onClick: handleRegisterTaskClick },
    { label: '日課詳細', onClick: () => alert('日課詳細クリック！') },
    { label: '日課一覧', onClick: () => alert('日課一覧クリック！') },
    { label: '日課削除', onClick: () => alert('日課削除クリック！') },
    { label: 'サインアウト', onClick: handleSignOut },
  ];

  return (
    <div className="hidden w-1/5 bg-primary p-4 text-white lg:block">
      <div className="flex flex-col items-center">
        <Image src={appLogo} alt="App Logo" className="mb-6 h-24 w-56" priority />
        <ul className="w-full list-none p-0">
          {menuItems.map((item, index) => (
            <MenuButton key={index} {...item} />
          ))}
        </ul>
      </div>
      <RegisterNiccaModal
        isOpen={isRegisterNiccaModalOpen}
        onClose={() => setIsRegisterNiccaModalOpen(false)}
      />
    </div>
  );
};
