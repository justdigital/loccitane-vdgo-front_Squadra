"use client";
import React from 'react';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { IFormInputs, SharedInfo } from '@/utils/form.util';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StepValidationSelectDocumentProps {
  
}

const StepValidationSelectDocument: React.FC<StepValidationSelectDocumentProps> = ({}) => {

  const {
    setValue,
    watch,
    register
  } = useFormContext<IFormInputs>();

  const selectedDocumentType = watch('documentType');

  const documentTypes = [
    {
      name: 'RG',
      image: '/assets/images/document-types/rg.jpg',
      documentType: 'RG'
    },
    {
      name: 'CNH',
      image: '/assets/images/document-types/cnh.png',
      documentType: 'CNH'
    },
    {
      name: 'RG modelo novo',
      image: '/assets/images/document-types/new-rg.jpg',
      documentType: 'RG_NOVO'
    },
    {
      name: 'CNH Digital',
      image: '/assets/images/document-types/digital-cnh.jpg',
      documentType: 'CNH_DIGITAL'
    }
  ];

  register('documentType', {
    required: true
  });

  const setDocumentType = (documentType: SharedInfo['documentType']) => {
    setValue('documentType', documentType);
  };

  
  return (
    <div className={`${css['document-type-selection-box']}`}>
      
      <p className='text-center'>Agora, selecione o tipo de <strong>documento oficial com foto.</strong></p>

      <div className={`mt-2 w-5/6 m-auto flex flex-wrap justify-between items-center`}>

        {documentTypes.map(({image, name, documentType}: any, index) => (
          <div key={index}
            onClick={() => setDocumentType(documentType)}
            className={`${css['document-type-box']} ${(documentType === selectedDocumentType && css['selected'])} p-2 flex flex-col justify-end items-center`}
          >
            <Image src={image} className={`${css['document-sample']}`} width={149} height={112} alt="RG" />
            <p className='p-1'>{name}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default StepValidationSelectDocument;