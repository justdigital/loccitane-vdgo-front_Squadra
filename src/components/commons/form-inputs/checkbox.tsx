import React, { SyntheticEvent } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import css from './style.module.scss';


interface FormCheckboxProps {
  field?: any;
  fieldState?: any;
  label?: string;
  labelOnclick?: () => void;
}

const checkBoxColorStyle = {
  '&.Mui-checked': {
    color: '#51CF66',
  },
};

const onClick = (e: SyntheticEvent<HTMLElement, Event>, labelOnclick?: () => void) => {
  if ((e.target as any).className.includes('checkbox-label') && !!labelOnclick) {
    e.preventDefault();
  }
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  fieldState,
  label,
  labelOnclick,
  ...props
}) => {
  return (
    <Box className={`relative ${css['checkbox']}`}>
      <FormControlLabel
        {...props}
        control={
          <Checkbox
            {...field}
            checked={!!field.value}
            sx={checkBoxColorStyle}
          />
        }
        onClick={(e) => onClick(e, labelOnclick)}
        label={!labelOnclick ? <span className={css['checkbox-label']}>{label}</span> : <a onClick={labelOnclick} className={css['checkbox-label']}>{label}</a>}
      />
      {fieldState?.error && <div className={css['checkbox-error']}>{fieldState?.error?.message ?? ''}</div>}
    </Box>
  );
};

export default FormCheckbox;