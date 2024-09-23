'use client';
import { SaurusType } from '@/schemas/nicca-schemas';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

type NiccaContextType = {
  hasActiveNicca: boolean;
  setHasActiveNicca: (value: boolean) => void;
  refreshActiveNicca: () => Promise<void>;
  activeNicca: { saurusType: SaurusType } | null;
};

const NiccaContext = createContext<NiccaContextType | undefined>(undefined);

export const NiccaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasActiveNicca, setHasActiveNicca] = useState(false);
  const [activeNicca, setActiveNicca] = useState<{ saurusType: SaurusType } | null>(null);

  const refreshActiveNicca = useCallback(async () => {
    try {
      const response = await fetch('/api/nicca/active');
      const data = await response.json();
      setHasActiveNicca(data.success && data.data !== null);
      setActiveNicca(data.success ? data.data : null);
    } catch (error) {
      console.error('アクティブな日課の確認中にエラーが発生しました:', error);
      setHasActiveNicca(false);
      setActiveNicca(null);
    }
  }, []);

  useEffect(() => {
    refreshActiveNicca();
  }, []);

  return (
    <NiccaContext.Provider
      value={{ hasActiveNicca, setHasActiveNicca, refreshActiveNicca, activeNicca }}
    >
      {children}
    </NiccaContext.Provider>
  );
};

export const useNicca = () => {
  const context = useContext(NiccaContext);
  if (!context) {
    throw new Error('useNicca must be used within a NiccaProvider');
  }
  return context;
};
