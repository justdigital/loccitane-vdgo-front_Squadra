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

interface UploadProps {
  isTabActive: boolean;
  backToSelectDocumentType: () => void;
}

const Upload: React.FC<UploadProps> = ({isTabActive, backToSelectDocumentType}) => {

  const {
    watch,
    setValue
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();
  const { isMobile } = useAppContext();

  const documentsUpload: Base64URLString[] = watch('documentsUpload');
  const documentType: DocumentType = watch('documentType');
  const documentTypeInstructions = useMemo(() => InstructionsByDocumentType[documentType][(isMobile ? 'mobile' : 'desktop')], [documentType, isMobile]);
  const [selectedFileContent, setSelectedFileContent] = useState<string | ArrayBuffer | null>(null);
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
    console.log('chego uaqui');
    if (InstructionsByDocumentType[documentType].hasDocumentBack && !isTakingDocumentBack) {
      console.log('vai capturar o verso', 'documentsUpload', documentsUpload);
      gotoTakeDocumentBack();
    }
  }, [isTakingDocumentBack, documentType, InstructionsByDocumentType, documentsUpload]);

  const gotoTakeDocumentBack = () => {
    setIsTakingDocumentBack(true);
    deSelectFile(true);
    fileSelectorRef.current?.click();
  };

  // const initSdk = () => {
  //   console.log('chegou na função');
  //   import('unico-webframe').then(UnicoWebframe => {
  //     console.log('chegou aqui');
  //     const { UnicoCheckBuilder, SDKEnvironmentTypes, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } = UnicoWebframe;

  //     // console.log('UnicoWebframe', UnicoWebframe);
  //     const config = new UnicoConfig()
  //       // .setProjectNumber("13557531040735768969")
  //       // .setProjectId("")
  //       // .setMobileSdkAppId("")
  //       .setHostname("http://localhost:8080")
  //       .setHostKey("r001-06a56722-87ef-49b6-a71b-3e05c74f9898")
  //       // .setHostInfo("nRMqSJJeWMZ0K4n9Dxs/Zhb5RslAxes+pmH0gJgmVtay02cX8aTbdzfZ4ln40v1Q")
        
  //     const unicoCameraBuilder = new UnicoCheckBuilder();
  //     unicoCameraBuilder.setResourceDirectory("/assets/vendor/unico/resources");
  //     unicoCameraBuilder.setModelsPath("/assets/vendor/unico/models");
  //     unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
  //     const unicoCamera = unicoCameraBuilder.build();
  //     console.log('e aqui');

  //     unicoCamera.prepareDocumentCamera(
  //       config, 
  //       DocumentCameraTypes.CNH
  //     ).then(cameraOpener => {
  //       cameraOpener.open(() => {});
  //     }).catch(error => {
  //       console.error(error);
  //       // confira na aba "Referências" sobre os erros possíveis
  //     });
  //   })
  // };

  const addDocumentToForm = useCallback((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setValue('documentsUpload', [...documentsUpload || [], (evt.target?.result as string)?.split(',')[1]]);
    }
  }, [documentsUpload]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      deSelectFile();
      return;
    }

    addDocumentToForm(e.target.files[0]);
    setSelectedFileType(e.target.files[0].type);
    setSelectedFileContent(URL.createObjectURL(e.target.files[0]));
  };

  const onCancel = () => {
    deSelectFile();
  }

  const deSelectFile = useCallback((isGoingTakeDocumentBack = false) => {
    if (documentsUpload.length && !isGoingTakeDocumentBack) {
      documentsUpload.pop();
      setValue('documentsUpload', [...documentsUpload]);
    }

    setSelectedFileType(null);
    setSelectedFileContent(null);
    fileSelectorRef.current!.value = '';

    if (!isGoingTakeDocumentBack) {
      backToSelectDocumentType();
    }
  }, [documentsUpload]);

  // const logDocuments = () => {
  //   console.log('documentsUpload', documentsUpload);
  // }
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    // initSdk();

    if (!selectedFileContent) {
      fileSelectorRef.current?.click();
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

    console.log('InstructionsByDocumentType[documentType]', InstructionsByDocumentType[documentType], isTakingDocumentBack);

    if (!isMobile) {
      buttonLabel = !InstructionsByDocumentType[documentType].hasDocumentBack || isTakingDocumentBack ? 'Enviar arquivo' : 'Upload do verso';
    } else {
      buttonLabel = !InstructionsByDocumentType[documentType].hasDocumentBack || isTakingDocumentBack ? 'Concluir' : 'Fotografar o verso';
    }
    
    //documentTypeInstructions
    // const buttonLabel = !isMobile ? 'Enviar arquivo' : (documentType === 'CNH_DIGITAL' ? 'Fazer Upload' : 'Tirar foto');
    setFormButtonProps({
      label: buttonLabel,
    });
  }, [isMobile, documentType, isTabActive, isTakingDocumentBack]);

  useEffect(() => {
    fileSelectorRef.current?.addEventListener('cancel', onCancel);
  }, []);
  
  return (
    <>
      <input type="file" accept='.jpg, .jpeg, .pdf' onChange={onSelectFile} hidden ref={fileSelectorRef} />
      {selectedFileContent && (
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
              {selectedFileType?.includes('image/') && <img src={selectedFileContent} className={`${css['image-preview']} inline`} alt="Imagem do arquivo selecionado" />}
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
                <a onClick={() => deSelectFile()} className={`${css['delete-button']} flex justify-center items-center`}><DeleteOutlineIcon fontSize="medium" /></a>
              </div>
            </div>
          </div>

          <p className="mt-5">{confirmationInstruction}</p>



          {/* <div className="relative w-[300px] h-[300px] bg-black">
            <div id="box-camera"></div>
          </div>

          <br />
          <button type="button" onClick={initSdk}>abrir camera</button> */}

          {/* <a onClick={logDocuments}>logar documents</a> */}
        </div>
      )}
    </>
  );
};

export default Upload;