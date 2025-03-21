export interface IStep1CreateUser {
  fullName: string;
  documentNumber: string;
  cellphoneNumber: string;
  birthdate: string;
  authorizeExposeCellNumbers: boolean;
  acceptReceiveInfo: boolean;
  acceptTerms: boolean;
}

export interface IStep1PersonalData {
  email: string;
  emailConfirmation: string;
  isIndication: boolean;
  resellerCode: string;
  gender: '1' | '2' | '3';
}

export interface IStep2Address {
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
  submitButtonLabel: string;
  submitButtonAction: () => void
  submitButtonLoading: boolean;
}

export interface IFormInputs extends IStep1CreateUser, IStep1PersonalData, IStep2Address, SharedInfo {

}

const StepFieldsToValidate = {
  'personalData1': [
    'fullName',
    'documentNumber',
    'cellphoneNumber',
    'birthdate',
    // 'authorizeExposeCellNumbers',
    // 'acceptReceiveInfo',
    'acceptTerms'
  ],
  'personalData2': [
    'email',
    'emailConfirmation',
    'isIndication',
    'resellerCode',
    'gender'
  ],
  'address': [
    'cep',
    'address',
    'addressNumber',
    'addressAdditionalInfo',
    'addressReference'
  ]
};

export const validateStep = (step: 'personalData1' | 'personalData2' | 'address', getFieldState: Function) => {
  return StepFieldsToValidate[step].every(field =>  {
    const _fieldState = getFieldState(field as keyof IFormInputs);
    // console.log(field, _fieldState);
    return !_fieldState.error;
  });
}