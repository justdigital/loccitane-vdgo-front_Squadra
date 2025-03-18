import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MaskedInput from '../masked-input';
import css from './style.module.scss';

interface FormTextFieldProps {
  field?: any;
  fieldState?: any;
  mask?: string;
}

const FormTextField: React.FC<FormTextFieldProps & TextFieldProps> = ({
  field,
  fieldState,
  mask,
  ...props
}) => {
  return (
    <TextField
      {...field}
      {...props}
      value={field.value ?? ''}
      error={fieldState.invalid}
      helperText={fieldState.error?.message ?? ''}
      className={`${css['input']} ${fieldState.isDirty && !fieldState.invalid ? css['valid'] : ''}`} 
      fullWidth
      variant="outlined"
      size='small'
      slotProps={{
        input: {
          inputComponent: mask && MaskedInput as any,
          inputProps: {
            mask: mask
          }
        }
      }}
    />
  );
};

export default FormTextField;