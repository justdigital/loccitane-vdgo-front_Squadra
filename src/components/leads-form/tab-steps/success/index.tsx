"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import { CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';

interface StepSuccessProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepSuccess: React.FC<StepSuccessProps> = ({isTabActive}) => {

  const {
      setValue,
    } = useFormContext<IFormInputs>();
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    setValue('submitButtonAction', () => {});
    setValue('submitButtonLabel', null);
    setValue('headerTitle', 'Última etapa! Viu como é simples? Finalize agora e comece sua jornada!');
  }, [isTabActive]);
  
  return (
    <div className={`${css['success-box']} flex flex-col justify-center items-center`}>
      
      <Image src="/assets/images/icons/round-check-ok.svg" alt="Validação OK" width={81} height={81} />
      <h1 className={`${css['success-text']} text-center mt-5`}>Parabéns! Estávamos esperando por você.</h1>
      <div className={`${css['sent-time-text']} mt-2`}>Enviado em {`{data}`} ás {`{hora}`}</div>

      <p>Seus dados de login e senha foram enviados para seu e-mail cadastrado.</p>
      <p>Basta conferir o e-mail e acessar o seu Escritório Virtual.</p>

      <div className={`${css['redirect-alert-box']} flex items-center justify-center w-full mt-10`}>
        <CircularProgress
          sx={{
            color: '#C02031'
          }}
        />
        <div className="ml-5 w-3/5">
          Aguarde, você avançará para próxima etapa, voilà!
        </div>
      </div>
    </div>
  );
};

export default StepSuccess;