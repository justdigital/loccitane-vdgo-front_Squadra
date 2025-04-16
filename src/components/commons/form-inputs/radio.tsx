import React from 'react';
import { Box, FormControlLabel, Radio } from '@mui/material';
import css from './style.module.scss';


interface FormRadioButtonProps {
  field?: any;
  fieldState?: any;
  label?: string;
  name?: string;
  labelOnclick?: () => void;
}

const checkBoxColorStyle = {
  '&.Mui-checked': {
    color: '#51CF66',
  },
};

const FormRadioButton: React.FC<FormRadioButtonProps> = ({
  field,
  fieldState,
  label,
  labelOnclick,
  ...props
}) => {
  return (
    <Box className={`relative ${css['radio']}`}>
      <FormControlLabel
        {...props}
        control={
          <Radio
            {...field}
            // checked={field ? field.value : props.value }
            sx={checkBoxColorStyle}
          />
        }
        label={!labelOnclick ? <span className={css['radio-label']}>{label}</span> : <a onClick={labelOnclick} className={css['radio-label']}>{label}</a>}
      />
      {fieldState?.error && <div className={css['radio-error']}>{fieldState?.error?.message ?? ''}</div>}
    </Box>
  );
};

export default FormRadioButton;