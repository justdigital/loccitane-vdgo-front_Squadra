"use client";
import React, { useCallback, useEffect, useState } from 'react';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { IFormInputs, sendGtmFormEvent, validateStep } from '@/utils/form.util';
import StepValidationSelectDocument from './parts/select-document-type';
import StepValidationEmailCode from './parts/validate-code';

interface StepValidationProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

type PossibleSteps = 'validationAndDocumentTypeSelection' | 'uploadInstructions' | 'uploadConfirmation';

const StepValidation: React.FC<StepValidationProps> = ({isTabActive}) => {

  const [currentPart, setCurrentPart] = useState<PossibleSteps>('validationAndDocumentTypeSelection');

  const {
    setValue,
    handleSubmit,
    getFieldState,
    watch
  } = useFormContext<IFormInputs>();

  const {documentType, emailCodeConfirmation} = watch();
  
  const validateAndGoNextPart = async (onOk: () => void) => {
    setValue('submitButtonLoading', true);

    try {
      onOk();
    } catch (e) {
      
    } finally {
      setValue('submitButtonLoading', false);
    }
  };
  
  const clickButton = useCallback(async () => {
    setValue('submitButtonLoading', true);
    await handleSubmit(() => {}, () => setValue('submitButtonLoading', false))();
    if (validateStep('validationCodeAndDocumentType', getFieldState)) {
      validateAndGoNextPart(() => {
          console.log('ficou tudo ok');
          sendGtmFormEvent('validacao_inicio', 'success'); 
      });
    }
  }, [getFieldState]);
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    setValue('submitButtonAction', clickButton);
    setValue('submitButtonLabel', 'Avançar');
    setValue('headerTitle', 'Última etapa! Viu como é simples? Finalize agora e comece sua jornada!');
  }, [isTabActive]);

  useEffect(() => {
    setValue('submitButtonDisabled', !validateStep('validationCodeAndDocumentType', getFieldState));
  }, [documentType, emailCodeConfirmation]);

  
  return (
    <div className={`${css['validation-box']} mt-[-20]`}>
      
      {currentPart === 'validationAndDocumentTypeSelection' && (
        <>
          <StepValidationEmailCode isTabActive={isTabActive} />
          <div className="mt-7"><StepValidationSelectDocument /></div>
        </>
      )}
      
    </div>
  );
};

export default StepValidation;