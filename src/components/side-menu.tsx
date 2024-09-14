'use client';

import Image from 'next/image';
import { useState } from 'react';

import appLogo from '@/app/images/app-name/app-name-2column.png';

export function SideMenu() {
  const [isRegisterTaskModalOpen, setIsRegisterTaskModalOpen] = useState(false);

  return (
    <div className="hidden w-1/5 bg-primary p-4 text-white lg:block">
      <div className="flex flex-col items-center">
        <Image src={appLogo} alt="App Logo" className="mb-6 h-24 w-56" />
        <ul className="w-full list-none p-0">
          <li className="mb-4">
            <button
              className="w-full justify-start bg-primary p-2 text-left text-white hover:bg-[#0A3D8F]"
              onClick={() => setIsRegisterTaskModalOpen(true)}
            >
              日課登録
            </button>
          </li>
          <li className="mb-4">
            <button className="w-full justify-start bg-primary p-2 text-left text-white hover:bg-[#0A3D8F]">
              日課詳細
            </button>
          </li>
          <li className="mb-4">
            <button className="w-full justify-start bg-primary p-2 text-left text-white hover:bg-[#0A3D8F]">
              日課一覧
            </button>
          </li>
          <li className="mb-4">
            <button className="w-full justify-start bg-primary p-2 text-left text-white hover:bg-[#0A3D8F]">
              日課削除
            </button>
          </li>
          <li className="mb-4">
            <button className="w-full justify-start bg-primary p-2 text-left text-white hover:bg-[#0A3D8F]">
              ログアウト
            </button>
          </li>
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
}
