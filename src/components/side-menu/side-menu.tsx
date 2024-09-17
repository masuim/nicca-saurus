'use client';

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

  const menuItems: MenuItem[] = [
    // TODO: 登録モーダル作成後に追加する
    //   { label: '日課登録', onClick: () => setIsRegisterTaskModalOpen(true) },
    { label: '日課登録', onClick: () => alert('日課登録クリック！') },
    { label: '日課詳細', onClick: () => alert('日課詳細クリック！') },
    { label: '日課一覧', onClick: () => alert('日課一覧クリック！') },
    { label: '日課削除', onClick: () => alert('日課削除クリック！') },
    { label: 'サインアウト', onClick: handleSignOut },
  ];

  const [isRegisterTaskModalOpen, setIsRegisterTaskModalOpen] = useState(false);

  return (
    <div className="hidden w-1/5 bg-primary p-4 text-white lg:block">
      <div className="flex flex-col items-center">
        <Image src={appLogo} alt="App Logo" className="mb-6 h-24 w-56" />
        <ul className="w-full list-none p-0">
          {menuItems.map((item, index) => (
            <MenuButton key={index} {...item} />
          ))}
        </ul>
      </div>
      {/* モーダルの実装はここに追加 */}
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
};
