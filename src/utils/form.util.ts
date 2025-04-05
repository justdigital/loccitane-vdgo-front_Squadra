import { sendGTMEvent } from "@next/third-parties/google";

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
  addressNumber: boolean;
  addressAdditionalInfo: string;
  addressReference: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface SharedInfo {
  headerTitle: string;
  submitButtonLabel: string | null;
  submitButtonAction: () => void
  submitButtonLoading: boolean;
  submitButtonDisabled: boolean;
  documentType: DocumentType;
  emailCodeConfirmation: string;
  isCodeValidated: boolean;
  validationCodeSent: boolean;
  validationCodeResent: boolean;
  // documentsUpload: Base64URLString[];
  documentsUpload: any[];
}

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
    // 'cep',
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

export const validateStep = (step: 'personalData' | 'contactData' | 'address' | 'validationCodeAndDocumentType', getFieldState: (key: keyof IFormInputs) => any, needToBeDrity = false) => {
  return StepFieldsToValidate[step].every(field =>  {
    const _fieldState = getFieldState(field as keyof IFormInputs);
    // console.log(field, _fieldState);
    return !_fieldState.error && ((needToBeDrity && _fieldState.isDirty) || !needToBeDrity);
  });
}

export const sendGtmFormEvent = (formStep: string, submitStatus: string, extraParams: object = {}) => {
  sendGTMEvent({
    'event': 'form_lead',
    'form_step': formStep,
    'submit_status': submitStatus,
    'page_url': window.location.href,
    ...extraParams
  });
}