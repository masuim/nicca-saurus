'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NiccaContextType = {
  hasActiveNicca: boolean;
  setHasActiveNicca: (value: boolean) => void;
  refreshActiveNicca: () => Promise<void>;
};

const NiccaContext = createContext<NiccaContextType | undefined>(undefined);

export const NiccaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasActiveNicca, setHasActiveNicca] = useState(false);

  const refreshActiveNicca = async () => {
    try {
      const response = await fetch('/api/nicca/active');
      const data = await response.json();
      setHasActiveNicca(data.hasActiveNicca);
    } catch (error) {
      console.error('アクティブな日課の確認中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    refreshActiveNicca();
  }, []);

  return (
    <NiccaContext.Provider value={{ hasActiveNicca, setHasActiveNicca, refreshActiveNicca }}>
      {children}
    </NiccaContext.Provider>
  );
};

export const useNicca = () => {
  const context = useContext(NiccaContext);
  if (context === undefined) {
    throw new Error('useNicca must be used within a NiccaProvider');
  }
  return context;
};
