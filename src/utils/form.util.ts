export interface IFormInputs {
  fullName: string;
  documentNumber: string;
  cellphoneNumber: string;
  birthdate: string;
  authorizeExposeCellNumbers: boolean;
  receiveInfo: boolean;
  acceptTerms: boolean;

  email: string;
  emailConfirmation: string;
  isIndication: boolean;
  resellerCode: string;
  gender: '1' | '2' | '3';

  cep: string;
  address: string;
  addressNumber: boolean;
  addressAdditionalInfo: string;
  addressReference: string;
}

const StepFieldsToValidate = {
  'personalData1': [
    'fullName',
    'documentNumber',
    'cellphoneNumber',
    'birthdate',
    // 'authorizeExposeCellNumbers',
    // 'receiveInfo',
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
    return _fieldState.isDirty && !_fieldState.invalid;
  });
}