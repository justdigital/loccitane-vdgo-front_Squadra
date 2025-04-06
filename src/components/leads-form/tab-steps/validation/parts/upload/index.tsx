"use client";
// import "client-only"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import css from './style.module.scss';
import { useFormContext } from 'react-hook-form';
import { DocumentType, IFormInputs } from '@/utils/form.util';
import { useAppContext } from '@/contexts/app.context';
import { useAppFormContext } from '@/contexts/app-form.context';
import { InstructionsByDocumentType } from '../upload-instructions/instructions-by-document-type';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress } from '@mui/material';
import { UUID } from 'crypto';
import { finishRegisterAndSendDocuments } from '@/services/backend-comunication.service';
import UploadApiCredilink from './upload-api-credilink';

interface UploadProps {
  isTabActive: boolean;
  backToSelectDocumentType: () => void;
  gotoNextPart: () => void;
}

const Upload: React.FC<UploadProps> = ({isTabActive, backToSelectDocumentType, gotoNextPart}) => {

  const {
    watch,
    setValue
  } = useFormContext<IFormInputs>();

  const {getUserFormId} = useAppContext();
  const {setFormButtonProps} = useAppFormContext();
  const { isMobileDevice } = useAppContext();

  const uploadSdkRef = useRef(null);

  const documentsUpload = watch('documentsUpload');
  const documentType: DocumentType = watch('documentType');
  const documentTypeInstructions = useMemo(() => InstructionsByDocumentType[documentType][(isMobileDevice ? 'mobile' : 'desktop')], [documentType, isMobileDevice]);
  const documentTypeInfo = useMemo(() => InstructionsByDocumentType[documentType], [documentType]);
  const [selectedFileContent, setSelectedFileContent] = useState<string | undefined>(undefined);
  const fileSelectorRef = useRef<HTMLInputElement>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);
  const [isTakingDocumentBack, setIsTakingDocumentBack] = useState(false);

  const confirmationInstruction = useMemo(() => {
    const key = isTakingDocumentBack ? 1 : 0;
    return documentTypeInstructions.confirmationInstructions[key];
  }, [documentTypeInstructions, isTakingDocumentBack]);
  
  const clickButton = useCallback(async () => {
    // setValue('submitButtonLoading', true);
    // sendGtmFormEvent('validacao_inicio', 'success');
    if (documentTypeInfo.hasDocumentBack && !isTakingDocumentBack) {
      // console.log('vai capturar o verso', 'documentsUpload', documentsUpload);
      gotoTakeDocumentBack();
      return;
    }

    if (!!documentsUpload.length) {
      sendDocumentsToServer();
    }
  }, [isTakingDocumentBack, documentTypeInfo, InstructionsByDocumentType, documentsUpload]);

  const sendDocumentsToServer = async () => {
    setFormButtonProps({ loading: true });
    try {
      await finishRegisterAndSendDocuments(getUserFormId() as UUID, documentType, documentsUpload);
      gotoNextPart();
    } catch (e) {
      console.log(e);
    } finally {
      setFormButtonProps({ loading: false });
    }
  }

  const gotoTakeDocumentBack = () => {
    setIsTakingDocumentBack(true);
    removeSelectedFile(true);
    goTakeDocument(true);
  };

  const estractBase64Content = (base64Content: string) => {
    const base64 = base64Content.split(',')[1];
    return base64;
  };

  const addDocumentToForm = useCallback((fileName: string, fileType: string, base64Content: string) => {
    const selectedFileData = {fileName, base64Content: estractBase64Content(base64Content)};
    setValue('documentsUpload', [...documentsUpload || [], selectedFileData]);
    setSelectedFileType(fileType);
    // setSelectedFileContent(URL.createObjectURL(e.target.files[0]));
    setSelectedFileContent(base64Content);
  }, [documentsUpload]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      removeSelectedFile();
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      addDocumentToForm(file.name, file.type, (evt.target?.result as string));
    }
  };

  const onCancel = () => {
    removeSelectedFile();
  }

  const removeSelectedFile = useCallback((isGoingTakeDocumentBack = false) => {
    if (documentsUpload && documentsUpload.length && !isGoingTakeDocumentBack) {
      documentsUpload.pop();
      setValue('documentsUpload', [...documentsUpload]);
    }

    setSelectedFileType(null);
    setSelectedFileContent(undefined);
    fileSelectorRef.current!.value = '';

    if (!isGoingTakeDocumentBack && !isTakingDocumentBack) {
      backToSelectDocumentType();
    }
  }, [documentsUpload, isTakingDocumentBack]);

  const goTakeDocument = useCallback((takingBack = false) => {
    if (isMobileDevice && !!documentTypeInfo.crediLinkDocumentTypes.length) {
      const crediLinkDocumentType = documentTypeInfo.crediLinkDocumentTypes[(takingBack ? 1 : 0)];
      (uploadSdkRef.current as any).openSdkCamera(crediLinkDocumentType);
      return;
    }

    fileSelectorRef.current?.click();
  }, [documentTypeInfo, isMobileDevice]);


  /**
   * Funções e sucesso e erro para upload via SDK
   */
  const onSuccessTakingDocumentPhoto = (base64Content: string) => {
    // setIsTakingDocumentBack(false);
    addDocumentToForm('teste.jpg', 'image/jpeg', base64Content);
  };

  const onErrorTakingDocumentPhoto = () => {
    onCancel();
    // console.error(error);
  };
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    if (!selectedFileContent) {
      goTakeDocument();
    }

    setFormButtonProps({
      action: clickButton,
      loading: false,
      disabled: false
    });
  }, [isTabActive, documentsUpload]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    let buttonLabel;

    if (!isMobileDevice) {
      buttonLabel = !documentTypeInfo.hasDocumentBack || isTakingDocumentBack ? 'Enviar arquivo' : 'Upload do verso';
    } else {
      buttonLabel = !documentTypeInfo.hasDocumentBack || isTakingDocumentBack ? 'Concluir' : 'Fotografar o verso';
    }
    
    setFormButtonProps({
      label: buttonLabel,
    });
  }, [isMobileDevice, documentTypeInfo, isTabActive, isTakingDocumentBack]);

  useEffect(() => {
    fileSelectorRef.current?.addEventListener('cancel', onCancel);
  }, []);
  
  return (
    <>
      <UploadApiCredilink ref={uploadSdkRef} onSucess={onSuccessTakingDocumentPhoto} onError={onErrorTakingDocumentPhoto} />
      <input type="file" accept={documentTypeInfo.acceptedFileTypes} onChange={onSelectFile} hidden ref={fileSelectorRef} />
      {selectedFileContent ? (
        <div className={`${css['upload-confirmation-box']} flex flex-col justify-center items-center w-[85%] mx-auto`}>
          
          <h2>Confirme se a imagem está clara e legível:</h2>

          <div className={`${css['uploaded-file-box']} w-full`}>
            <div className="text-center w-full my-5">
              {!selectedFileType?.includes('image/') && (
                <embed  
                  src={selectedFileContent}
                  className={`${css['image-preview']} inline`}
                />
              )}
              {selectedFileType?.includes('image/') && (
                <img src={selectedFileContent} className={`${css['image-preview']} inline`} alt="Imagem do arquivo selecionado" />
              )}
            </div>
            <div className={`${css['uploaded-file-actions']} flex items-center mt-5 gap-2`}>
              <div className="sm:w-4/5">
                <ul>
                  <li>O documento está inteiro e sem cortes</li>
                  <li>A iluminação está boa e sem reflexos</li>
                  <li>Os dados estão nítidos e legíveis</li>
                </ul>
              </div>
              <div className="w-1/5 justify-self-end">
                <a onClick={() => removeSelectedFile()} className={`${css['delete-button']} flex justify-center items-center`}><DeleteOutlineIcon fontSize="medium" /></a>
              </div>
            </div>
          </div>

          <p className="mt-5">{confirmationInstruction}</p>
        </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <CircularProgress size="50px" color="error" />
          </div>
        )
      }
    </>
  );
};


export default Upload;