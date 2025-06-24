'use client';
import { getCredits } from '@/actions/credits';
import { useState, createContext, useEffect, useContext } from 'react';
import { toast } from 'sonner';

interface CredtisContextType {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
}

const CreditsContext = createContext<CredtisContextType | undefined>(undefined);

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const credits = await getCredits();
        setCredits(credits);
      } catch (error) {
        toast.error('Failed to fetch credits. Please try again later.');
      }
    };
    fetchCredits();
  }, []);

  return (
    <CreditsContext.Provider value={{ credits, setCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = (): CredtisContextType => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
