"use client";
import React, { forwardRef, RefAttributes, useImperativeHandle, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormInputs } from '@/utils/form.util';

interface UploadApiCredilinkProps {
  onSucess: (base64Content: string) => void;
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

  const prepareAndOpenCamera = (documentTypeCrediLink: string) => {
    const { UnicoCheckBuilder, SDKEnvironmentTypes, DocumentCameraTypes } = unicoWebFrameRef.current;
    const unicoCameraBuilder = new UnicoCheckBuilder();
    unicoCameraBuilder.setResourceDirectory("/assets/vendor/unico/resources");
    unicoCameraBuilder.setModelsPath("/assets/vendor/unico/models");
    unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
    // unicoCameraBuilder.setTheme(unicoTheme);
    const unicoCamera = unicoCameraBuilder.build();

    // console.log('DocumentCameraTypes[documentTypeCrediLink]', DocumentCameraTypes[documentTypeCrediLink]);
    unicoCamera.prepareDocumentCamera(
      sdkConfig.current, 
      DocumentCameraTypes[documentTypeCrediLink]
    ).then((cameraOpener: any) => {
      cameraOpener.open({
        on: {
          success: onSuccessTakingDocumentPhoto,
          error: onErrorTakingDocumentPhoto
        }
      });
    }).catch((error: any) => {
      onErrorTakingDocumentPhoto(error);
    });
  }

  const openCamera = async (documentTypeCrediLink: string) => {
    await configSdk();
    prepareAndOpenCamera(documentTypeCrediLink);
  }

  const onSuccessTakingDocumentPhoto = (data: any) => {
    setIsCameraOpen(false);
    onSucess(data.base64);
  }

  const onErrorTakingDocumentPhoto = (error: any) => {
    setIsCameraOpen(false);
    onError(error);
  }

  // const initSdk = async () => {
  //   console.log('chegou na função');
  //   setIsCameraOpen(true);

  //   const UnicoWebframe = await import('unico-webframe');
  //   console.log('chegou aqui');
  //   const { UnicoCheckBuilder, SDKEnvironmentTypes, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes, UnicoConfig, LocaleTypes } = UnicoWebframe;

  //   // console.log('UnicoWebframe', UnicoWebframe);
  //   const config = new UnicoConfig()
  //     // .setProjectNumber("13557531040735768969")
  //     // .setProjectId("")
  //     // .setMobileSdkAppId("")
  //     .setHostname("http://localhost:8080")
  //     .setHostKey("r001-06a56722-87ef-49b6-a71b-3e05c74f9898")
  //     // .setHostInfo("nRMqSJJeWMZ0K4n9Dxs/Zhb5RslAxes+pmH0gJgmVtay02cX8aTbdzfZ4ln40v1Q")

  //     const unicoTheme = new UnicoThemeBuilder()
  //       .setColorSilhouetteSuccess("#0384fc")
  //       .setColorSilhouetteError("#D50000")
  //       .setColorSilhouetteNeutral("#fcfcfc")
  //       .setBackgroundColor("#dff1f5")
  //       .setColorText("#0384fc")
  //       .setBackgroundColorComponents("#0384fc")
  //       .setColorTextComponents("#dff1f5")
  //       .setBackgroundColorButtons("#0384fc")
  //       .setColorTextButtons("#dff1f5")
  //       .setBackgroundColorBoxMessage("#fff")
  //       .setColorTextBoxMessage("#000")
  //       .setColorCancelButton("#0384fc")
  //       .setColorProgressBar("#0384fc")
  //       .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform:
  //       translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`)
  //       .setFontFamily("Arial, sans-serif") // v3.19.2+
  //       .build();
      
  //   const unicoCameraBuilder = new UnicoCheckBuilder();
  //   unicoCameraBuilder.setResourceDirectory("/assets/vendor/unico/resources");
  //   unicoCameraBuilder.setModelsPath("/assets/vendor/unico/models");
  //   unicoCameraBuilder.setEnvironment(SDKEnvironmentTypes.UAT);
  //   unicoCameraBuilder.setTheme(unicoTheme);
  //   const unicoCamera = unicoCameraBuilder.build();
  //   console.log('e aqui');

  //   unicoCamera.prepareDocumentCamera(
  //     config, 
  //     DocumentCameraTypes.CNH
  //   ).then(cameraOpener => {
  //     console.log('cameraOpener', Object.keys(DocumentCameraTypes));
  //     cameraOpener.open(() => {});
  //   }).catch(error => {
  //     console.error(error);
  //     // confira na aba "Referências" sobre os erros possíveis
  //   });
  // };

  useImperativeHandle(ref, () => ({
    openSdkCamera(documentTypeCrediLink: string) {
      setIsCameraOpen(true);
      openCamera(documentTypeCrediLink);
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