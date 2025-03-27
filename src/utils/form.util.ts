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
}

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
  ]
};

export const validateStep = (step: 'personalData' | 'contactData' | 'address', getFieldState: (key: keyof IFormInputs) => any) => {
  return StepFieldsToValidate[step].every(field =>  {
    const _fieldState = getFieldState(field as keyof IFormInputs);
    // console.log(field, _fieldState);
    return !_fieldState.error;
  });
}