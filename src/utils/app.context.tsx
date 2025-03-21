'use client';
import { UUID } from 'crypto';
import { get } from 'http';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextProps {
  getUserFormId: () => UUID | undefined;
  setUserFormId: (value: UUID | undefined) => void;
}

const AppContext = createContext<MyContextProps | undefined>(undefined);

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

  const getUserFormId = () => {
    return userFormId;
  };

  return (
    <AppContext.Provider value={{ getUserFormId, setUserFormId }}>
      {children}
    </AppContext.Provider>
  );
};