import React, { useEffect } from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import { CircularProgress } from '@mui/material';
import { useAppFormContext } from '@/contexts/app-form.context';
import { useFormContext } from 'react-hook-form';
import { IFormInputs, sendDataLayerFormEvent } from '@/utils/form.util';
import { useAppContext } from '@/contexts/app.context';
import { useRouter } from 'next/navigation';

interface StepSuccessProps {
  isTabActive?: boolean;
}

const StepSuccess: React.FC<StepSuccessProps> = ({isTabActive}) => {

  const {setFormButtonProps} = useAppFormContext();
  const {pagesUrls} = useAppContext();
  const router = useRouter();

  const {
    watch, setValue
  } = useFormContext<IFormInputs>();

  const {sentAtDate, sentAtTime} = watch();

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    if (!sentAtDate && !sentAtTime) {
      setValue('sentAtDate',
        new Intl.DateTimeFormat('pt-BR').format(new Date())
      );
      setValue('sentAtTime',
        new Intl.DateTimeFormat('pt-BR', {timeStyle: 'medium'}).format(new Date())
      );
    }

    setFormButtonProps({
      label: undefined,
    });
    setValue('headerTitle', <div className="sm:text-center grow">Última etapa! Viu como é simples? <br/> Finalize agora e comece sua jornada!</div>);
    setTimeout(() => router.push(pagesUrls.lp2), (20 * 1000));
  }, [isTabActive]);

  useEffect(() => {
    sendDataLayerFormEvent('conclusao', 'success');
  }, []);

  
  return (
    <div className={`${css['success-box']} flex flex-col justify-center items-center`}>
      
      <Image src="/assets/images/icons/round-check-ok.svg" alt="Validação OK" width={81} height={81} />
      <h1 className={`${css['success-text']} text-center mt-5`}>Parabéns! Estávamos esperando por você.</h1>
      <div className={`${css['sent-time-text']} mt-2`}>Enviado em {sentAtDate} ás {sentAtTime}</div>

      <p>Seus documentos foram enviados para análise. Fique de olho em seu e-mail e acompanhe o status do seu cadastro.</p>
      <p>Mas antes, vamos descobrir tudo o que Escritório Virtual tem a oferecer?</p>

      <div className={`${css['redirect-alert-box']} flex items-center justify-center w-full mt-10`}>
        <CircularProgress
          sx={{
            color: '#C02031'
          }}
        />
        <div className="ml-5 w-3/5">
          Conheça mais em poucos segundos. Voilà!
        </div>
      </div>
    </div>
  );
};

export default StepSuccess;