"use client";
import React, { useState } from 'react';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';
import UploadInstructions from './parts/upload-instructions';
import StepValidationCodeAndDocumentType from './parts/document-type-and-validation-code';

interface StepValidationProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

type PossibleSteps = 'validationAndDocumentTypeSelection' | 'uploadInstructions' | 'uploadConfirmation';

const StepValidation: React.FC<StepValidationProps> = ({isTabActive}) => {

  const [currentPart, setCurrentPart] = useState<PossibleSteps>('validationAndDocumentTypeSelection');

  const {} = useFormContext<IFormInputs>();
  
  return (
    <div className={`${css['validation-box']}`}>
      
      {currentPart === 'validationAndDocumentTypeSelection' && (
        <StepValidationCodeAndDocumentType isTabActive={isTabActive} gotoNextPart={() => setCurrentPart('uploadInstructions')}  />
      )}

      {currentPart === 'uploadInstructions' && (
        <div className="mt-[-10px]">
          <UploadInstructions isTabActive={isTabActive} />
        </div>
      )}
      
    </div>
  );
};

export default StepValidation;