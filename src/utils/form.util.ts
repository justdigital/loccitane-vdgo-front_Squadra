import { sendDataLayerEvent } from "./general.util";

export interface IStepCreateUser {
  fullName: string;
  documentNumber: string;
  cellphoneNumber: string;
  authorizeExposeCellNumbers: boolean;
  acceptReceiveInfo: boolean;
  acceptTerms: boolean;
}

export interface IStepContactData {
  birthdate: string;
  email: string;
  isIndication: boolean;
  resellerCode: string;
  gender: '1' | '2' | '3';
}

export interface IStepAddress {
  cep: string;
  address: string;
  addressNumber: string | number;
  addressAdditionalInfo: string;
  addressReference: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface SharedInfo {
  headerTitle: string | any;
  submitButtonLabel: string | null;
  submitButtonAction: () => void
  submitButtonLoading: boolean;
  submitButtonDisabled: boolean;
  documentType: DocumentType;
  emailCodeConfirmation: string;
  isCodeValidated: boolean;
  validationCodeSent: boolean;
  validationCodeResent: boolean;
  emailAdressValidationSent: string;
  documentsUpload: UploadFile[];
  sentAtDate: string;
  sentAtTime: string;
}

export type UploadFile = {fileName: string, base64Content: Base64URLString};
export type DocumentType = 'RG' | 'CNH' | 'RG_NOVO' | 'CNH_DIGITAL';

export interface IFormInputs extends IStepCreateUser, IStepContactData, IStepAddress, SharedInfo {

}

const StepFieldsToValidate = {
  'personalData': [
    'fullName',
    'documentNumber',
    'cellphoneNumber',
    // 'authorizeExposeCellNumbers',
    // 'acceptReceiveInfo',
    'acceptTerms'
  ],
  'contactData': [
    'email',
    'birthdate',
    'isIndication',
    'resellerCode',
    'gender'
  ],
  'address': [
    'cep',
    'address',
    'city',
    'state',
    'neighborhood',
    'addressNumber',
    'addressAdditionalInfo',
    'addressReference'
  ],
  'validationCodeAndDocumentType': [
    'emailCodeConfirmation',
    'documentType'
  ]
};

export const validateStep = (step: 'personalData' | 'contactData' | 'address' | 'validationCodeAndDocumentType', getFieldState: (key: keyof IFormInputs) => any, needToBeDrity = false, ignoreFields: string[] = []) => {
  return StepFieldsToValidate[step].filter(field => !ignoreFields.includes(field)).every(field =>  {
    const _fieldState = getFieldState(field as keyof IFormInputs);
    // console.log(field, _fieldState);
    return !_fieldState.error && ((needToBeDrity && _fieldState.isDirty) || !needToBeDrity);
  });
}

export const sendDataLayerFormEvent = (formStep: string, submitStatus: string, extraParams: object = {}) => {
  const data = {
    'event': 'form_lead',
    'form_step': formStep,
    'submit_status': submitStatus,
    ...extraParams
  };
  // console.log('novo evento: ', data)
  sendDataLayerEvent(data);
}