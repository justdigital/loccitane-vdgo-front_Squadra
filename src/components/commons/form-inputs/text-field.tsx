import React, { ChangeEventHandler, useEffect, useMemo } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MaskedInput from '../masked-input';
import css from './style.module.scss';

interface FormTextFieldProps {
  field?: any;
  fieldState?: any;
  mask?: string;
  maxLength?: number;
  specificErrorTemplate?: {[arbitrary: string]: string | React.ReactNode};
}

const FormTextField: React.FC<FormTextFieldProps & TextFieldProps> = ({
  field,
  fieldState,
  mask,
  maxLength,
  specificErrorTemplate,
  ...props
}) => {

  const onChange = (e: any) => {
    let value = e.target.value;
    if (maxLength) {
      value = value.substring(0, maxLength)
    }

    field.onChange(value);
  }

  const helperText = useMemo(() => {
    return specificErrorTemplate && specificErrorTemplate[fieldState.error?.type] ? specificErrorTemplate[fieldState.error?.type] : (fieldState.error?.message ?? '')
  }, [fieldState.error, specificErrorTemplate]);

  return (
    <TextField
      {...field}
      {...props}
      value={field.value ?? ''}
      error={fieldState.invalid}
      helperText={helperText}
      className={`${css['input']} ${fieldState.invalid ? css['invalid'] : fieldState.isDirty && css['valid']}`} 
      fullWidth
      variant="outlined"
      size='small'
      onChange={onChange}
      slotProps={{
        ...props.slotProps,
        // htmlInput: { maxLength: 12 },
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