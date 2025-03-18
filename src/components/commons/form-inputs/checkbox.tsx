import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import css from './style.module.scss';


interface FormCheckboxProps {
  field?: any;
  label?: string;
  error?: boolean | undefined;
  labelOnclick?: () => void;
}

const checkBoxColorStyle = {
  '&.Mui-checked': {
    color: '#51CF66',
  },
};

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  label,
  error,
  labelOnclick,
  ...props
}) => {
  return (
    <FormControlLabel
      {...props}
      control={
        <Checkbox
          {...field}
          className={{error: !!error && css['checkbox-error']}}
          sx={checkBoxColorStyle}
        />
      }
      label={!labelOnclick ? <span className={css['checkbox-label']}>{label}</span> : <a onClick={labelOnclick} className={css['checkbox-label']}>{label}</a>}
    />
  );
};

export default FormCheckbox;