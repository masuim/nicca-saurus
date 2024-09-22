import { NiccaRegisterModal } from '@/components/common/modals/register';
import { useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  closeRegisterModal: () => void;
  hasActiveNicca: boolean;
  refreshActiveNicca: () => Promise<void>;
};

export function MainContents({
  children,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  closeRegisterModal,
  hasActiveNicca,
  refreshActiveNicca,
}: Props) {
  useEffect(() => {
    const checkActiveNicca = async () => {
      await refreshActiveNicca();
      if (!hasActiveNicca) {
        setIsRegisterModalOpen(true);
      }
    };

    checkActiveNicca();
  }, [refreshActiveNicca, hasActiveNicca, setIsRegisterModalOpen]);

  const onCloseRegisterModal = () => {
    closeRegisterModal();
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
