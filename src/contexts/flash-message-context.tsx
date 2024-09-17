'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type FlashMessage = {
  message: string;
  type: 'success' | 'error' | 'info';
};

type FlashMessageContextType = {
  flashMessage: FlashMessage | null;
  showFlashMessage: (message: string, type: FlashMessage['type']) => void;
  hideFlashMessage: () => void;
};

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const showFlashMessage = (message: string, type: FlashMessage['type']) => {
    setFlashMessage({ message, type });
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000);
  };

  const hideFlashMessage = () => {
    setFlashMessage(null);
  };

  return (
    <FlashMessageContext.Provider value={{ flashMessage, showFlashMessage, hideFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};
