"use client";
import React, { useEffect, useState } from 'react';
import css from './style.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';
import FormTextField from '@/components/commons/form-inputs/text-field';
import { useAppContext } from '@/contexts/app.context';
import { checkValidationCode, resendValidationCode, sendValidationCode } from '@/services/backend-comunication.service';
import { UUID } from 'crypto';
import { CircularProgress } from '@mui/material';

interface StepValidationEmailCodeProps {
  isTabActive: boolean;
}

const StepValidationEmailCode: React.FC<StepValidationEmailCodeProps> = ({isTabActive}) => {

  const {getUserFormId} = useAppContext();
  const {
    control,
    setValue,
    watch,
    getValues
  } = useFormContext<IFormInputs>();

  const {email, isCodeValidated} = watch();
  const [isResendingCode, setIsResendingCode] = useState(false);

  const sendCode = async (resending = false) => {
    const callable = resending ? resendValidationCode : sendValidationCode;
    const valueKey = resending ? 'validationCodeResent' : 'validationCodeSent';

    if (!resending && !!getValues(valueKey)) {
      return;
    }

    try {
      setIsResendingCode(resending ? true : false);
      await callable(getUserFormId() as UUID);
      setValue(valueKey, true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsResendingCode(false);
    }
  };

  const checkConfirmationCodeIsValid = async (value: string) => {
    if (isCodeValidated) {
      return true;
    }

    const result = await checkValidationCode(getUserFormId() as UUID, value);

    if (result == 1) {
      setValue('isCodeValidated', true); 
    }

    return result == 1;
  }

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    sendCode();
  }, [isTabActive]);
  
  return (
    <div className={`${css['validation-box']}`}>
      
      <p className='text-center w-full m-auto mb-[-8]'>Para sua segurança, enviamos um código de verificação para o e-mail cadastrado: {email}</p>

      <Controller
        name="emailCodeConfirmation"
        control={control}
        rules={{
          required: true,
          pattern: /^\d{5}$/g,
          validate: {
            validCode: async (value) => !!(await checkConfirmationCodeIsValid(value))
          }
        }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Código de confirmação"
            placeholder='Digite o código de verificação enviado para o seu e-mail.'
            mask="00000"
          />
        }
      />
      {!isCodeValidated && (
        <>
          <a onClick={() => sendCode(true)} className={`${css['resend-code-link']}`}>Não recebeu o código ou deu erro? Clique aqui para reenviar.</a>
          {isResendingCode && <CircularProgress color='error' size="15px" className='ml-2' />}
        </>
      )}
    </div>
  );
};

export default StepValidationEmailCode;