import { NiccaRegisterModal } from '@/components/common/modals/register';
import { CustomCalendar } from '@/components/custom-calendar';
import { NiccaMessage } from '@/components/nicca-message';
import { SaurusImage } from '@/components/saurus-image';
import { CompleteButton } from '@/components/complete-button';
import { NiccaDeleteButton } from '@/components/nicca-delete-button';
import { NiccaEditButton } from '@/components/nicca-edit-button';
import { SaurusType } from '@/schemas/nicca-schemas';
import { useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  closeRegisterModal: () => void;
  hasActiveNicca: boolean;
  refreshActiveNicca: () => Promise<void>;
  activeNicca: { saurusType: SaurusType } | null;
};

export const MainContents = ({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  closeRegisterModal,
  hasActiveNicca,
  refreshActiveNicca,
  activeNicca,
}: Props) => {
  useEffect(() => {
    const checkActiveNicca = async () => {
      await refreshActiveNicca();
      if (!hasActiveNicca) {
        setIsRegisterModalOpen(true);
      }
    };

    checkActiveNicca();
  }, []);

  const onCloseRegisterModal = () => {
    closeRegisterModal();
  };

  return (
    <main className="flex-1 p-4">
      <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
        <div className="mb-4 flex flex-col items-center md:mb-0 md:w-1/2">
          <SaurusImage saurusType={activeNicca?.saurusType ?? 'brachiosaurus'} />
          <NiccaMessage />
          <div className="mt-4 flex space-x-2">
            <CompleteButton />
            <NiccaEditButton />
            <NiccaDeleteButton />
          </div>
        </div>
        <div className="flex justify-center md:w-1/2">
          <CustomCalendar />
        </div>
      </div>
      <NiccaRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={onCloseRegisterModal}
        onSuccess={closeRegisterModal}
      />
    </main>
  );
};
