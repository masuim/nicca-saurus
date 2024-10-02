import { NiccaRegisterModal } from '@/components/common/modals/register';

import { SaurusType } from '@/schemas/nicca-schemas';
import { useEffect, ReactNode } from 'react';
import { Calendar } from '@/components/common/calendar';
import { CompleteButton } from '@/components/nicca/complete-button';
import { NiccaEditButton } from '@/components/nicca/nicca-edit-button';
import { NiccaDeleteButton } from '@/components/nicca/nicca-delete-button';
import { NiccaMessage } from '@/components/nicca/nicca-message';
import { SaurusImage } from '@/components/common/saurus-image';

// TODO: useEffectは使わないようにする。調査。
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
      if (!hasActiveNicca && !isRegisterModalOpen) {
        setIsRegisterModalOpen(true);
      } else if (hasActiveNicca && isRegisterModalOpen) {
        setIsRegisterModalOpen(false);
      }
    };

    checkActiveNicca();
  }, [refreshActiveNicca, hasActiveNicca, isRegisterModalOpen, setIsRegisterModalOpen]);

  const onCloseRegisterModal = () => {
    closeRegisterModal();
  };

  return (
    <main className="flex-1 items-center bg-yellow-200 p-4 md:p-5 lg:p-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <div className="flex w-full flex-col items-center rounded-lg bg-blue-200 p-4 sm:p-6 md:p-8">
          <div className="flex w-full max-w-[560px] flex-col items-center bg-orange-200">
            <div className="flex w-full flex-col items-center sm:flex-row sm:justify-center">
              <SaurusImage
                saurusType={activeNicca?.saurusType ?? 'brachiosaurus'}
                className="w-full max-w-[200px] sm:w-1/2 sm:max-w-[250px] md:w-1/3"
              />
              <div className="mt-4 flex w-full flex-col items-center sm:mt-0 sm:w-1/2 md:w-2/3">
                <div className="flex w-full max-w-[300px] justify-center">
                  <CompleteButton className="grow" />
                  <NiccaEditButton className="ml-2 w-12" />
                  <NiccaDeleteButton className="ml-2 w-12" />
                </div>
                <NiccaMessage className="mt-4 w-full max-w-[300px]" />
              </div>
            </div>
          </div>
          <div className="mt-8 w-full max-w-[560px] bg-green-200">
            <Calendar className="w-full" />
          </div>
        </div>
      </div>
      {isRegisterModalOpen && (
        <NiccaRegisterModal
          isOpen={isRegisterModalOpen}
          onClose={onCloseRegisterModal}
          onSuccess={closeRegisterModal}
        />
      )}
    </main>
  );
};
