'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import appLogo from '@/app/images/app-name/app-name-2column.png';
import { useSignOut } from '@/services/auth-service';
import { MenuButton } from './menu-button';

type Props = {
  openRegisterModal: () => void;
};

type MenuItem = {
  label: string;
  onClick?: () => void;
};

export const SideMenu = ({ openRegisterModal }: Props) => {
  const signOutUser = useSignOut();
  const [hasActiveNicca, setHasActiveNicca] = useState(false);

  useEffect(() => {
    const checkActiveNicca = async () => {
      const response = await fetch('/api/nicca/active');
      const data = await response.json();
      setHasActiveNicca(data.hasActiveNicca);
    };

    checkActiveNicca();
  }, []);

  const handleOpenRegisterModal = () => {
    if (hasActiveNicca) {
      alert('途中の日課があります');
    } else {
      openRegisterModal();
    }
  };

  const menuItems: MenuItem[] = [
    { label: '日課登録', onClick: handleOpenRegisterModal },
    //TODO: 日課詳細いらなくない？日課一覧から詳細を確認したり、編集した方が良いと思う。
    // { label: '日課詳細', onClick: () => alert('日課詳細クリック！') },
    { label: '日課削除', onClick: () => alert('日課削除クリック！') },
    // TODO: 日課一覧は、画面遷移する方が良いと思う。一覧から何をするか？
    { label: '日課一覧', onClick: () => alert('日課一覧クリック！') },
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
    </div>
  );
};
