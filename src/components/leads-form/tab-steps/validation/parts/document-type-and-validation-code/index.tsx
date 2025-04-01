"use client";
import React, { useCallback, useEffect } from 'react';
import StepValidationEmailCode from './sub-parts/validate-code';
import StepValidationSelectDocument from './sub-parts/select-document-type';
import { useFormContext } from 'react-hook-form';
import { IFormInputs, sendGtmFormEvent, validateStep } from '@/utils/form.util';
import { useAppFormContext } from '@/contexts/app-form.context';

interface StepValidationCodeAndDocumentTypeProps {
  isTabActive: boolean;
  gotoNextPart: () => void;
}

const StepValidationCodeAndDocumentType: React.FC<StepValidationCodeAndDocumentTypeProps> = ({isTabActive, gotoNextPart}) => {

  const {
    setValue,
    handleSubmit,
    getFieldState,
    watch,
    trigger
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();
  
  const {emailCodeConfirmation, documentType} = watch();
  
  const validateAndGoNextPart = async (onOk: () => void) => {

    try {
      onOk();
    } catch (e) {
      console.error(e);
    } finally {
      setValue('submitButtonLoading', false);
    }
  };
  
  const clickButton = useCallback(async () => {
    setFormButtonProps({loading: true});
    await handleSubmit(() => {}, () => setFormButtonProps({loading: false}))();
    if (validateStep('validationCodeAndDocumentType', getFieldState)) {
      validateAndGoNextPart(() => {
          gotoNextPart();
          sendGtmFormEvent('validacao_inicio', 'success'); 
      });
    }
  }, [getFieldState]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    (async () => {
      if (emailCodeConfirmation) {
        await trigger('emailCodeConfirmation');
        await trigger('documentType');
      }
      setFormButtonProps({
        label: 'Avançar',
        action: clickButton,
        loading: false,
        disabled: !validateStep('validationCodeAndDocumentType', getFieldState)
      });
    })();

    setValue('headerTitle', 'Última etapa! Viu como é simples? Finalize agora e comece sua jornada!');
  }, [isTabActive, emailCodeConfirmation, documentType]);


  return (
    <div className="mt-[-20px]">
      <StepValidationEmailCode isTabActive={isTabActive} />
      <div className="mt-7"><StepValidationSelectDocument /></div>
    </div>
  );
};

export default StepValidationCodeAndDocumentType;