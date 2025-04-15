"use client";
import React, { useEffect, useState } from 'react';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';
import UploadInstructions from './parts/upload-instructions';
import StepValidationCodeAndDocumentType from './parts/document-type-and-validation-code';
import Upload from './parts/upload';
import StepSuccess from './parts/success';

interface StepValidationProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

type PossibleParts =
  'validationAndDocumentTypeSelection' |
  'validationAndDocumentTypeSelectionBacking' |
  'uploadInstructions' |
  'uploadConfirmation' |
  'uploadConfirmationDocumentBack' |
  'success';

const StepValidation: React.FC<StepValidationProps> = ({isTabActive}) => {

  const [currentPart, setCurrentPart] = useState<PossibleParts>('validationAndDocumentTypeSelection');

  const {watch} = useFormContext<IFormInputs>();

  const backToSelectDocumentType = () => setCurrentPart('validationAndDocumentTypeSelectionBacking');
  const documentType = watch('documentType');

  const checkIsPartActive = (parts: PossibleParts[]) => {
    return !!parts.includes(currentPart);
  }

  useEffect(() => {
    if (!isTabActive) {
      return;
    }
  
  }, [isTabActive]);
  
  return (
    <div className={`${css['validation-box']}`}>
      
      {checkIsPartActive(['validationAndDocumentTypeSelection', 'validationAndDocumentTypeSelectionBacking']) && (
        <StepValidationCodeAndDocumentType
          isTabActive={isTabActive}
          gotoNextPart={() => setCurrentPart('uploadInstructions')}
          isBacking={currentPart === 'validationAndDocumentTypeSelectionBacking'}
        />
      )}

      {checkIsPartActive(['uploadInstructions']) && documentType && (
        <div className="mt-[-10px]">
          <UploadInstructions
            isTabActive={isTabActive && checkIsPartActive(['uploadInstructions'])}
            backToSelectDocumentType={backToSelectDocumentType}
            gotoNextPart={() => setCurrentPart('uploadConfirmation')}
          />
        </div>
      )}

      {checkIsPartActive(['uploadConfirmation', 'uploadConfirmationDocumentBack']) && documentType && (
        <div className="mt-[-10px]">
          <Upload
            isTabActive={isTabActive && checkIsPartActive(['uploadConfirmation', 'uploadConfirmationDocumentBack'])}
            backToSelectDocumentType={backToSelectDocumentType}
            gotoNextPart={() => setCurrentPart('success')}
          />
        </div>
      )}

      {checkIsPartActive(['success']) && (
        <div className="">
          <StepSuccess
            isTabActive={isTabActive && checkIsPartActive(['success'])}
          />
        </div>
      )}

      {/* <div hidden={!checkIsPartActive(['validationAndDocumentTypeSelection', 'validationAndDocumentTypeSelectionBacking'])}>
        <StepValidationCodeAndDocumentType
          isTabActive={isTabActive && checkIsPartActive(['validationAndDocumentTypeSelection', 'validationAndDocumentTypeSelectionBacking'])}
          gotoNextPart={() => setCurrentPart('uploadInstructions')}
          isBacking={currentPart === 'validationAndDocumentTypeSelectionBacking'}
        />
      </div>

      <div hidden={!checkIsPartActive(['uploadInstructions'])} className="mt-[-10px]">
        <UploadInstructions
          isTabActive={isTabActive && currentPart === 'uploadInstructions'}
          backToSelectDocumentType={backToSelectDocumentType}
          gotoNextPart={() => setCurrentPart('uploadConfirmation')}
        />
      </div>

      <div hidden={!checkIsPartActive(['uploadConfirmation', 'uploadConfirmationDocumentBack'])} className="mt-[-10px]">
        <Upload
          isTabActive={isTabActive && currentPart === 'uploadConfirmation'}
          backToSelectDocumentType={backToSelectDocumentType}
        />
      </div> */}
      
    </div>
  );
};

export default StepValidation;