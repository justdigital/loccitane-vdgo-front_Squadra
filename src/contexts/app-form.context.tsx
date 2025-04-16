'use client';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AppFormContextProps {
  getFormButtonProps: () => Partial<ButtonProps>;
  setFormButtonProps: (props: Partial<ButtonProps>) => void;
  getFormError: () => string | null;
  setFormError: (error: string | null) => void;
  showDefaultFormError: () => void;
}

interface ButtonProps {
  label: string;
  action: () => void;
  loading: boolean;
  disabled: boolean;
}

const AppFormContext = createContext<AppFormContextProps>({} as AppFormContextProps);

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
  const [formError, setFormError] = useState<string | null>(null);

  const getFormButtonProps = useCallback(() => {
    return buttonProps;
  }, [buttonProps]);

  const setFormButtonProps = (props: Partial<ButtonProps>) => {
    updateButtonProps(currState => ({...currState, loading: false, disabled: false, ...props}));
  }

  const showDefaultFormError = useCallback(() => {
    setFormError('Houve um erro. Tente novamente');
  }, []);

  const getFormError = useCallback(() => {
    return formError;
  }, [formError]);


  return (
    <AppFormContext.Provider value={{ getFormButtonProps, setFormButtonProps, getFormError, setFormError, showDefaultFormError }}>
      {children}
    </AppFormContext.Provider>
  );
};