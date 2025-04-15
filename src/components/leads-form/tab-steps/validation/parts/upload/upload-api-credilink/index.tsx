"use client";
import React, { forwardRef, RefAttributes, useImperativeHandle, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';

interface UploadApiCredilinkProps {
  onSucess: (base64Content: string, isTakingDocumentBack: boolean) => void;
  onError: (error: string) => void;
}

const UploadApiCredilink: React.FC<UploadApiCredilinkProps & RefAttributes<any>> = forwardRef(({onSucess, onError}, ref) => {

  const {} = useFormContext<IFormInputs>();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const unicoWebFrameRef = useRef<any>(null);
  const sdkConfig = useRef<any>(null);

  const configSdk = async () => {
    unicoWebFrameRef.current = await import('unico-webframe');
    const { UnicoConfig } = unicoWebFrameRef.current;
    sdkConfig.current = new UnicoConfig()
      .setHostname(process.env.NEXT_CREDILINK_UNICO_HOSTNAME)
      .setHostKey(process.env.NEXT_CREDILINK_UNICO_HOSTKEY)
    ;
  }

  const prepareAndOpenCamera = (documentTypeCrediLink: string, isTakingDocumentBack: boolean) => {
    const { UnicoCheckBuilder, SDKEnvironmentTypes, DocumentCameraTypes } = unicoWebFrameRef.current;
    const unicoCameraBuilder = new UnicoCheckBuilder();
    unicoCameraBuilder.setResourceDirectory("/assets/vendor/unico/resources");
    unicoCameraBuilder.setModelsPath("/assets/vendor/unico/models");
    unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
    const unicoCamera = unicoCameraBuilder.build();

    unicoCamera.prepareDocumentCamera(
      sdkConfig.current, 
      DocumentCameraTypes[documentTypeCrediLink]
    ).then((cameraOpener: any) => {
      cameraOpener.open({
        on: {
          success: (data: any) => onSuccessTakingDocumentPhoto(data.base64, isTakingDocumentBack),
          error: onErrorTakingDocumentPhoto
        }
      });
    }).catch((error: any) => {
      onErrorTakingDocumentPhoto(error);
    });
  }

  const openCamera = async (documentTypeCrediLink: string, isTakingDocumentBack: boolean) => {
    await configSdk();
    prepareAndOpenCamera(documentTypeCrediLink, isTakingDocumentBack);
  }

  const onSuccessTakingDocumentPhoto = (base64Content: string, isTakingDocumentBack: boolean) => {
    setIsCameraOpen(false);
    onSucess(base64Content, isTakingDocumentBack);
  }

  const onErrorTakingDocumentPhoto = (error: any) => {
    setIsCameraOpen(false);
    onError(error);
  }

  useImperativeHandle(ref, () => ({
    openSdkCamera(documentTypeCrediLink: string, isTakingDocumentBack: boolean) {
      setIsCameraOpen(true);
      openCamera(documentTypeCrediLink, isTakingDocumentBack);
    }
  }));

  
  return (
    <>
      {isCameraOpen && (
        <div className="fixed w-full h-full bg-black top-0 left-0 z-10">
          <div id="box-camera"></div>
        </div>
      )}
    </>
  );
});

UploadApiCredilink.displayName = 'UploadApiCredilink'
export default UploadApiCredilink;