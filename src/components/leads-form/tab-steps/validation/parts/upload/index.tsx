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
import { useSearchParams } from 'next/navigation';
import { sendDataLayerEvent } from '@/utils/general.util';

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

  const searchParams = useSearchParams();
  const {getUserFormId} = useAppContext();
  const {setFormButtonProps, setFormError, showDefaultFormError} = useAppFormContext();
  const { isMobileDevice } = useAppContext();

  const uploadSdkRef = useRef(null);

  const email = watch('email');
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

  const sendDocumentsToServer =  useCallback(async () => {
    setFormButtonProps({ loading: true });
    try {
      await finishRegisterAndSendDocuments(getUserFormId() as UUID, documentType, documentsUpload);

      sendDataLayerEvent({
        event: 'generate_lead',
        lead_source: searchParams.get('utm_source')
      });

      gotoNextPart();
    } catch (e) {
      console.log(e);
      showDefaultFormError();
    } finally {
      setFormButtonProps({ loading: false });
    }
  }, [documentType, documentsUpload, getUserFormId]);

  const clickButton = useCallback(async () => {
    if (documentTypeInfo.hasDocumentBack && !isTakingDocumentBack) {
      gotoTakeDocumentBack();
      return;
    }

    if (!!documentsUpload.length) {
      sendDocumentsToServer();
    }
  }, [isTakingDocumentBack, documentTypeInfo, InstructionsByDocumentType, documentsUpload]);

  const estractBase64Content = (base64Content: string) => {
    const base64 = base64Content.split(',')[1];
    return base64;
  };

  const addDocumentToForm = useCallback((fileName: string, fileType: string, base64Content: string, file?: File) => {
    const selectedFileData = {fileName, base64Content: estractBase64Content(base64Content)};
    const newDocumentsUpload = [...documentsUpload || [], selectedFileData];
    setValue('documentsUpload', newDocumentsUpload);
    setSelectedFileType(fileType);

    if (!fileType.includes('image/') && file) {
      setSelectedFileContent(URL.createObjectURL(file));
      return;
    }

    setSelectedFileContent(base64Content);
  }, [documentsUpload]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      removeSelectedFile();
      return;
    }
    const file = e.target.files[0];

    if (!file.type.includes('image/') && !file.type.includes('application/pdf')) {
      setFormError('Tipo de arquivo não suportado. Por favor, envie um arquivo de imagem ou PDF.');
      removeSelectedFile();
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      addDocumentToForm(file.name, file.type, (evt.target?.result as string), file);
    }
  };

  const onCancel = () => {
    removeSelectedFile();
  }

  const removeSelectedFile = useCallback((isGoingTakeDocumentBack = false) => {
    if (documentsUpload && documentsUpload.length && !isGoingTakeDocumentBack) {
      // documentsUpload.pop();
      // setValue('documentsUpload', [...documentsUpload]);
      setValue('documentsUpload', []);
    }

    setSelectedFileType(null);
    setSelectedFileContent(undefined);
    if (fileSelectorRef.current) {
      fileSelectorRef.current!.value = '';
    }

    // if (!isGoingTakeDocumentBack && !isTakingDocumentBack) {
    backToSelectDocumentType();
    // }
  }, [documentsUpload, isTakingDocumentBack]);

  const gotoTakeDocumentBack = () => {
    setIsTakingDocumentBack(true);
    goTakeDocument(true);
  };

  const goTakeDocument = useCallback((takingBack = false) => {
    if (isMobileDevice && !!documentTypeInfo.crediLinkDocumentTypes.length) {
      const crediLinkDocumentType = documentTypeInfo.crediLinkDocumentTypes[(takingBack ? 1 : 0)];
      // console.log('crediLinkDocumentType', crediLinkDocumentType);
      (uploadSdkRef.current as any).openSdkCamera(crediLinkDocumentType, takingBack);
      return;
    }

    fileSelectorRef.current?.click();
  }, [documentTypeInfo, isMobileDevice]);


  /**
   * Funções e sucesso e erro para upload via SDK
   */
  const onSuccessTakingDocumentPhoto = useCallback((base64Content: string, tookDocumentBack: boolean) => {
    // setIsTakingDocumentBack(false);
    const fileName = `${email}_${(new Date()).getTime()}${tookDocumentBack ? '_verso' : ''}.jpg`.replace(/@/g, '_');
    addDocumentToForm(fileName, 'image/jpeg', base64Content);
  }, [email, documentsUpload]);

  const onErrorTakingDocumentPhoto = () => {
    onCancel();
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
                <a onClick={() => removeSelectedFile()} className={`${css['delete-button']} flex justify-center items-center`}>
                  <DeleteOutlineIcon fontSize="medium" />
                </a>
              </div>
            </div>
          </div>

          <p className="mt-5">{confirmationInstruction}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size="50px" color="error" />
        </div>
      )}
    </>
  );
};


export default Upload;