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
    <main className="xs:p-10 flex-1 items-center bg-yellow-200 p-10 md:p-20 lg:p-32">
      <div className="xs:flex-row xs:flex-wrap xs:justify-center flex flex-col items-center bg-orange-300">
        <div className="xs:flex-row xs:flex-wrap xs:justify-center flex w-full flex-col items-center bg-purple-200">
          <div className="xs:w-full xs:flex-row xs:flex-wrap xs:justify-center flex flex-col items-center bg-red-200">
            <SaurusImage
              saurusType={activeNicca?.saurusType ?? 'brachiosaurus'}
              className="xs:w-1/2"
            />
            <div className="xs:mt-0 xs:w-1/2 xs:flex-row xs:flex-wrap xs:justify-center flex flex-col items-center bg-red-200">
              <div className="flex w-full bg-blue-200">
                {/* TODO: それぞれのボタンのmax-widthを設定する */}
                <CompleteButton className="xs:w-3/5" />
                <NiccaEditButton className="xs:w-1/5" />
                <NiccaDeleteButton className="xs:w-1/5" />
              </div>
              <NiccaMessage className="xs:mt-4 mt-4" />
            </div>
          </div>
          <div className="xs:mt-4 w-full">
            <CustomCalendar className="xs:w-full" />
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
