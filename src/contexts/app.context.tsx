'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import { UUID } from 'crypto';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppFormProvider } from './app-form.context';
import ISectionTermsAndConditions from '@/interfaces/section-terms-and-conditions';
import ISectionFooter from '@/interfaces/section-footer';
import ISectionHeader from '@/interfaces/section-header'

type SectionKey = 'terms' | 'footer' | 'header';
interface AppContextProps {
  getUserFormId: () => UUID | undefined;
  setUserFormId: (value: UUID | undefined) => void;
  isMobileScreen: boolean;
  isMobileDevice: boolean;
  updateSectionData: <T>(key: SectionKey | string, value: T) => void;
  getSectionData: {
    (key: 'terms'): ISectionTermsAndConditions | undefined;
    (key: 'footer'): ISectionFooter | undefined;
    (key: 'header'): ISectionHeader | undefined;
    <T>(key: string): T | undefined;
  };
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider ');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userFormId, setUserFormId] = useState<UUID | undefined>(undefined);
  const [sectionData, setSectionData] = useState<Record<string, unknown>>({});

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getUserFormId = () => {
    return userFormId;
  };

  const getSectionData = useCallback(<T,>(key: string): T | undefined => {
    return sectionData[key] as T;
  }, [sectionData]);

  const updateSectionData = useCallback(<T,>(key: string, value: T) => {
    setSectionData(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const navigator: any = typeof window !== 'undefined' ? window.navigator : {};
  const isMobileDevice = /android.+mobile|ip(hone|[oa]d)/i.test(navigator?.userAgent);

  return (
    <AppContext.Provider value={{ getUserFormId, setUserFormId, isMobileScreen, isMobileDevice, updateSectionData, getSectionData }}>
      <AppFormProvider>
        {children}
      </AppFormProvider>
    </AppContext.Provider>
  );
};