"use client";
import React, { useCallback, useEffect } from 'react';
import StepValidationEmailCode from './sub-parts/validate-code';
import StepValidationSelectDocument from './sub-parts/select-document-type';
import { useFormContext } from 'react-hook-form';
import { IFormInputs, sendDataLayerFormEvent, validateStep } from '@/utils/form.util';
import { useAppFormContext } from '@/contexts/app-form.context';

interface StepValidationCodeAndDocumentTypeProps {
  isTabActive: boolean;
  isBacking?: boolean;
  gotoNextPart: () => void;
}

const StepValidationCodeAndDocumentType: React.FC<StepValidationCodeAndDocumentTypeProps> = ({isTabActive, gotoNextPart, isBacking}) => {

  const {
    setValue,
    handleSubmit,
    getFieldState,
    watch,
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();
  
  const {documentType} = watch();
  
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
        sendDataLayerFormEvent('validacao_inicio', 'success'); 
      });
    }
  }, [getFieldState]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    setFormButtonProps({
      label: 'Avançar',
      action: clickButton,
      loading: false,
      disabled: !documentType
    });
    setValue('headerTitle', 'Última etapa! Viu como é simples? Finalize agora e comece sua jornada!');
  }, [isTabActive, documentType]);


  return (
    <div className="sm:mt-[-20px]">
      {!isBacking && <StepValidationEmailCode isTabActive={isTabActive} />}
      <div className="mt-7"><StepValidationSelectDocument /></div>
    </div>
  );
};

export default StepValidationCodeAndDocumentType;