'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import { UUID } from 'crypto';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppFormProvider } from './app-form.context';

interface AppContextProps {
  getUserFormId: () => UUID | undefined;
  setUserFormId: (value: UUID | undefined) => void;
  isMobile: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userFormId, setUserFormId] = useState<UUID | undefined>(undefined);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getUserFormId = () => {
    return userFormId;
  };

  return (
    <AppContext.Provider value={{ getUserFormId, setUserFormId, isMobile }}>
      <AppFormProvider>
        {children}
      </AppFormProvider>
    </AppContext.Provider>
  );
};