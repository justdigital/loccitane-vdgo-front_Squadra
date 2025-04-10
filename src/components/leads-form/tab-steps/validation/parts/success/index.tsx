import React, { useEffect } from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import { CircularProgress } from '@mui/material';
import { useAppFormContext } from '@/contexts/app-form.context';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';
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
    setValue('headerTitle', <div className="sm:text-center grow">Você conseguiu!<br />Etapa concluída com sucesso.</div>);
    setTimeout(() => router.push(pagesUrls.lp2), 3000)
  }, [isTabActive]);

  
  return (
    <div className={`${css['success-box']} flex flex-col justify-center items-center`}>
      
      <Image src="/assets/images/icons/round-check-ok.svg" alt="Validação OK" width={81} height={81} />
      <h1 className={`${css['success-text']} text-center mt-5`}>Parabéns! Estávamos esperando por você.</h1>
      <div className={`${css['sent-time-text']} mt-2`}>Enviado em {sentAtDate} ás {sentAtTime}</div>

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