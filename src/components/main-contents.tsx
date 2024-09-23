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
    <main className="flex-1 items-center p-10 sm:p-10 md:p-20 lg:p-32">
      <div className="flex flex-col items-center lg:flex-row">
        <div className="flex flex-col items-center lg:w-full">
          <div className="flex flex-col items-center lg:flex-row">
            <SaurusImage
              saurusType={activeNicca?.saurusType ?? 'brachiosaurus'}
              className="lg:w-1/2"
            />
            <div className="flex flex-col items-center lg:mt-4 lg:w-1/2">
              <div className="flex-1 lg:flex lg:space-x-2">
                <CompleteButton className="lg:w-3/5" />
                <NiccaEditButton className="lg:w-1/5" />
                <NiccaDeleteButton className="lg:w-1/5" />
              </div>
              <NiccaMessage className="mt-4 lg:mt-4 lg:w-full" />
            </div>
          </div>
          <div className="flex-1 lg:mt-4">
            <CustomCalendar className="lg:size-full" />
          </div>
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
