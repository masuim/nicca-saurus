import { NiccaRegisterModal } from '@/components/common/modals/register';
import { useEffect, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
};

export function MainContents({ children, isRegisterModalOpen, setIsRegisterModalOpen }: Props) {
  const [hasActiveNicca, setHasActiveNicca] = useState(false);

  useEffect(() => {
    const checkActiveNicca = async () => {
      const response = await fetch('/api/nicca/active');
      const data = await response.json();
      setHasActiveNicca(data.hasActiveNicca);
      setIsRegisterModalOpen(!data.hasActiveNicca);
    };

    checkActiveNicca();
  }, [setIsRegisterModalOpen]);

  const onCloseRegisterModal = () => {
    if (!hasActiveNicca) {
      // アクティブな日課がない場合、モーダルを閉じることはできません
      return;
    }
    setIsRegisterModalOpen(false);
  };

  return (
    <main className="flex-1 p-4">
      <h1 className="mb-4 text-2xl font-bold">ダッシュボード</h1>
      {children}
      <NiccaRegisterModal isOpen={isRegisterModalOpen} onClose={onCloseRegisterModal} />
    </main>
  );
}
