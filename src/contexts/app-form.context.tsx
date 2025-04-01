'use client';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AppFormContextProps {
  getFormButtonProps: () => Partial<ButtonProps>;
  setFormButtonProps: (props: Partial<ButtonProps>) => void;
}

interface ButtonProps {
  label: string;
  action: () => void;
  loading: boolean;
  disabled: boolean;
}

const AppFormContext = createContext<AppFormContextProps>({getFormButtonProps: () => ({label: '', action: () => {}, loading: false, disabled: false}), setFormButtonProps: () => {}});

export const useAppFormContext = () => {
  const context = useContext(AppFormContext);
  if (!context) {
    throw new Error('useAppFormContext must be used within a AppFormProvider');
  }
  return context;
};

interface AppFormProviderProps {
  children: ReactNode;
}

export const AppFormProvider: React.FC<AppFormProviderProps> = ({ children }) => {
  const [buttonProps, updateButtonProps] = useState<Partial<ButtonProps>>({label: '', action: () => {}, loading: false, disabled: false});

  const getFormButtonProps = useCallback(() => {
    return buttonProps;
  }, [buttonProps]);

  const setFormButtonProps = (props: Partial<ButtonProps>) => {
    updateButtonProps(currState => ({...currState, loading: false, disabled: false, ...props}));
  }


  return (
    <AppFormContext.Provider value={{ getFormButtonProps, setFormButtonProps }}>
      {children}
    </AppFormContext.Provider>
  );
};