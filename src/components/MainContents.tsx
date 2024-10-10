import { SaurusImage } from '@/components/elements/SaurusImage';
import { Calendar } from '@/components/modules/calendar/Calendar';
import { NiccaCompleteButton } from '@/components/modules/nicca/NiccaCompleteButton';
import { NiccaDeleteButton } from '@/components/modules/nicca/NiccaDeleteButton';
import { NiccaEditButton } from '@/components/modules/nicca/NiccaEditButton';

import { NiccaMessage } from '@/components/modules/nicca/NiccaMessage';
import { NiccaRegisterDialog } from '@/components/modules/nicca/NiccaRegisterDialog';

import { SaurusType } from '@/schemas/nicca/nicca-schemas';
import { useCallback, ReactNode } from 'react';

// TODO: useEffectは使わないようにする。調査。
type Props = {
  children: ReactNode;
  isRegisterDialogOpen: boolean;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
  closeRegisterDialog: () => void;
  hasActiveNicca: boolean;
  refreshActiveNicca: () => Promise<void>;
  activeNicca: { saurusType: SaurusType } | null;
};

export const MainContents = ({
  isRegisterDialogOpen,
  setIsRegisterDialogOpen,
  closeRegisterDialog,
  hasActiveNicca,
  refreshActiveNicca,
  activeNicca,
}: Props) => {
  // TODO: useCallbackが最適？
  const checkActiveNicca = useCallback(async () => {
    await refreshActiveNicca();
    if (!hasActiveNicca && !isRegisterDialogOpen) {
      setIsRegisterDialogOpen(true);
    } else if (hasActiveNicca && isRegisterDialogOpen) {
      setIsRegisterDialogOpen(false);
    }
  }, [refreshActiveNicca, hasActiveNicca, isRegisterDialogOpen, setIsRegisterDialogOpen]);

  const onCloseRegisterDialog = () => {
    closeRegisterDialog();
    checkActiveNicca();
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
                  <NiccaCompleteButton className="grow" />
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
      {isRegisterDialogOpen && (
        <NiccaRegisterDialog
          isOpen={isRegisterDialogOpen}
          onClose={onCloseRegisterDialog}
          onSuccess={checkActiveNicca}
        />
      )}
    </main>
  );
};
