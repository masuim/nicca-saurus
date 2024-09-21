'use client';

import { NiccaRegisterModal } from '@/components/common/modals/register';
import Image from 'next/image';
import { useState } from 'react';

import appLogo from '@/app/images/app-name/app-name-2column.png';

import { useSignOut } from '@/services/auth-service';
import { MenuButton } from './menu-button';

type MenuItem = {
  label: string;
  onClick?: () => void;
};

export const SideMenu = () => {
  const signOutUser = useSignOut();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const menuItems: MenuItem[] = [
    { label: '日課登録', onClick: openRegisterModal },
    { label: '日課詳細', onClick: () => alert('日課詳細クリック！') },
    { label: '日課一覧', onClick: () => alert('日課一覧クリック！') },
    { label: '日課削除', onClick: () => alert('日課削除クリック！') },
    { label: 'サインアウト', onClick: signOutUser },
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
      <NiccaRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};
