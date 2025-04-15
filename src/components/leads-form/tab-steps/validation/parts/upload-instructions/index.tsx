"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { DocumentType, IFormInputs } from '@/utils/form.util';
import { useAppContext } from '@/contexts/app.context';
import { InstructionsByDocumentType } from './instructions-by-document-type';
import { useAppFormContext } from '@/contexts/app-form.context';
import FormRadioButton from '@/components/commons/form-inputs/radio';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface UploadInstructionsProps {
  isTabActive: boolean;
  backToSelectDocumentType: () => void;
  gotoNextPart: () => void;
}

const UploadInstructions: React.FC<UploadInstructionsProps> = ({isTabActive, backToSelectDocumentType, gotoNextPart}) => {

  const {
    watch,
    setValue
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();

  const { isMobileScreen } = useAppContext();
  const documentType: DocumentType = watch('documentType');
  const documentTypeInstructions = useMemo(() => documentType && InstructionsByDocumentType[documentType][(isMobileScreen ? 'mobile' : 'desktop')], [documentType, isMobileScreen]);
  const documentTypeInfo = useMemo(() => InstructionsByDocumentType[documentType], [documentType]);

  const [subDocumentType, setSubDocumentType] = React.useState<string | null>(null);
  
  const clickButton = useCallback(async () => {
    // setValue('submitButtonLoading', true);
    gotoNextPart();
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
  }, [isTabActive]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    const buttonLabel = !isMobileScreen ? 'Enviar arquivo' : (documentType === 'CNH_DIGITAL' ? 'Fazer Upload' : 'Tirar foto');
    setFormButtonProps({
      label: buttonLabel,
    });
  }, [isMobileScreen, documentType]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    const buttonActive = !documentTypeInfo.subDocuments || subDocumentType !== null;
    setFormButtonProps({
      disabled: !buttonActive,
    });
  }, [documentTypeInfo, subDocumentType, isTabActive]);

  const onChangeDocumentType = (value: any) => {
    setSubDocumentType(value);
    setValue('documentType', value);
  }

  
  return (
    <>
      {documentTypeInstructions && (
        <div className={`${css['upload-instructions-box']} flex flex-col justify-center items-center`}>

          <div className={`${css['instructions-titles']} text-center`}>
            <h2>{documentTypeInstructions.title}</h2>
            <p className="mt-2">{documentTypeInstructions.subtitle}</p>
          </div>

          {documentTypeInfo.subDocuments && (
            <div className={`flex justify-around items-center mt-2 w-[90%]`}>
              {documentTypeInfo.subDocuments.map((subDocument, index) => (
                <FormRadioButton
                  key={index}
                  name="subDocumentType"
                  label={subDocument.label}
                  field={{
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onChange: (e: any) => onChangeDocumentType(subDocument.value),
                    checked: subDocument.value === subDocumentType,
                  }}
                />
              ))}
            </div>
          )}

          <div className={`${css['instructions-wrapper']} flex justify-center w-full gap-5 mt-3`}>
            <div className={`${css['instructions-box']} flex-1`}>
              <ul>
                {documentTypeInstructions.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <a className={`${css['back-document-type-link']} block mt-2`} onClick={backToSelectDocumentType}>
                <div className="inline-block mr-2">
                  <KeyboardArrowLeftIcon className={`${css['icon-back']}`} />
                </div>
                Voltar
              </a>
            </div>
            <div className={`${css['instructions-image-box']} text-center ${documentTypeInstructions.imageClassName}`}>
              <Image src={`/assets/images/document-types/open/${documentTypeInstructions.imageName}`} alt="Validação OK" width={155} height={216} />
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default UploadInstructions;