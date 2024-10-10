'use client';

import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { cn } from '@/lib/utils';

export const FlashMessage = () => {
  const { flashMessage, hideFlashMessage } = useFlashMessage();

  if (!flashMessage) return null;

  const bgColor = {
    success: 'border-success',
    error: 'border-error',
    info: 'border-info',
  }[flashMessage.type];

  const textColor = {
    success: 'text-success',
    error: 'text-error',
    info: 'text-info',
  }[flashMessage.type];

  return (
    <div className="fixed right-4 top-20 z-50 animate-fade-in-down">
      <div
        className={cn(
          'max-w-sm rounded-lg border-2 bg-white/80 shadow-lg transition-all duration-300 ease-in-out',
          bgColor,
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className={cn('text-sm font-bold', textColor)}>{flashMessage.message}</div>
          <button onClick={hideFlashMessage} className={cn('ml-4 hover:text-gray-700', textColor)}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
