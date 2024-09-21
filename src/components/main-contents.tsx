import { NiccaRegisterModal } from '@/components/common/modals/register';
import { useEffect, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  closeRegisterModal: () => void;
  hasActiveNicca: boolean;
  setHasActiveNicca: (hasActive: boolean) => void;
};

export function MainContents({
  children,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  closeRegisterModal,
}: Props) {
  const [hasActiveNicca, setHasActiveNicca] = useState(false);

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
  }, [setIsRegisterModalOpen]);

  const onCloseRegisterModal = () => {
    if (hasActiveNicca) {
      closeRegisterModal();
    }
  };

  return (
    <main className="flex-1 p-4">
      <h1 className="mb-4 text-2xl font-bold">ダッシュボード</h1>
      {children}
      <NiccaRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={onCloseRegisterModal}
        onSuccess={closeRegisterModal}
      />
    </main>
  );
}
