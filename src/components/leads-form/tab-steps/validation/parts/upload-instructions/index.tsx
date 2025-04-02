"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { DocumentType, IFormInputs } from '@/utils/form.util';
import { useAppContext } from '@/contexts/app.context';
import { InstructionsByDocumentType } from './instructions-by-document-type';
import { useAppFormContext } from '@/contexts/app-form.context';

interface UploadInstructionsProps {
  isTabActive: boolean;
  backToSelectDocumentType: () => void;
}

const UploadInstructions: React.FC<UploadInstructionsProps> = ({isTabActive, backToSelectDocumentType}) => {

  const {
    watch
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();

  const { isMobile } = useAppContext();
  const documentType: DocumentType = watch('documentType');
  const documentTypeInstructions = useMemo(() => InstructionsByDocumentType[documentType][(isMobile ? 'mobile' : 'desktop')], [documentType, isMobile]);
  
  
  const clickButton = useCallback(async () => {
    // setValue('submitButtonLoading', true);
    // sendGtmFormEvent('validacao_inicio', 'success'); 
  }, []);
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    setFormButtonProps({
      label: 'Enviar arquivo',
      action: clickButton,
      loading: false,
      disabled: false
    });
  }, [isTabActive,]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    const buttonLabel = !isMobile ? 'Enviar arquivo' : (documentType === 'CNH_DIGITAL' ? 'Fazer Upload' : 'Tirar foto');
    setFormButtonProps({
      label: buttonLabel,
    });
  }, [isMobile, documentType]);

  
  return (
    <div className={`${css['upload-instructions-box']} flex flex-col justify-center items-center`}>

      <div className={`${css['instructions-titles']} text-center`}>
        <h2>{documentTypeInstructions.title}</h2>
        <p className="mt-2">{documentTypeInstructions.subtitle}</p>
      </div>

      <div className={`${css['instructions-wrapper']} flex justify-center w-full gap-5 mt-7`}>
        <div className={`${css['instructions-box']} flex-1`}>
          <ul>
            {documentTypeInstructions.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <a className={`${css['back-document-type-link']} block sm:hidden`} onClick={backToSelectDocumentType}>Selecionar outro documento.</a>
        </div>
        <div className={`${css['instructions-image-box']} text-center`}>
          <Image src={`/assets/images/document-types/open/${documentTypeInstructions.imageName}`} alt="Validação OK" width={155} height={216} />
          <a className={`${css['back-document-type-link']} hidden sm:block`} onClick={backToSelectDocumentType}>Selecionar outro documento.</a>
        </div>
      </div>
      
    </div>
  );
};

export default UploadInstructions;