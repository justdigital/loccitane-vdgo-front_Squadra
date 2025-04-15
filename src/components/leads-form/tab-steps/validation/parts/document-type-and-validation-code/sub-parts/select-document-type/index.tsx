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
      documentTypes: ['RG']
    },
    {
      name: 'CNH',
      image: '/assets/images/document-types/cnh.png',
      documentTypes: ['CNH']
    },
    {
      name: 'RG modelo novo',
      image: '/assets/images/document-types/new-rg.jpg',
      documentTypes: ['RG_NOVO']
    },
    {
      name: 'RG ou CNH Digital',
      image: '/assets/images/document-types/rg-cnh-digital.png',
      documentTypes: ['CNH_DIGITAL', 'RG_DIGITAL']
    }
  ];

  register('documentType', {
    required: true
  });

  const setDocumentType = (documentType: SharedInfo['documentType']) => {
    setValue('documentType', documentType, { shouldDirty: true });
  };

  
  return (
    <div className={`${css['document-type-selection-box']}`}>
      
      <p className='text-center'>Agora, selecione o tipo de <strong>documento oficial com foto.</strong></p>

      <div className={`mt-2 w-5/6 m-auto flex flex-wrap justify-between items-center`}>

        {documentTypes.map(({image, name, documentTypes}: any, index) => (
          <div key={index}
            onClick={() => setDocumentType(documentTypes[0])}
            className={`${css['document-type-box']} ${(documentTypes.includes(selectedDocumentType) && css['selected'])} p-2 flex flex-col justify-end items-center`}
          >
            <Image src={image} className={`${css['document-sample']}`} width={149} height={112} alt={name} />
            <p className='p-1'>{name}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default StepValidationSelectDocument;