import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import css from './style.module.scss';


interface FormSelectProps {
  field?: any;
  fieldState?: any;
  items: Array<{ value: string | number, label: string }>;
  name?: string;
  label?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const FormSelect: React.FC<FormSelectProps> = ({
  field,
  fieldState,
  items,
  name,
  label,
  ...props
}) => {
  return (
    <Box className={`form-checkbox`}>
      <FormControl
        fullWidth
        size='small'
        error={fieldState.invalid}
        className={`${css['select']} ${fieldState.invalid ? css['invalid'] : fieldState.isDirty && css['valid']}`} 
        variant="outlined"
      >
        <InputLabel id={`${name}-select`}>{label}</InputLabel>
        <Select
          {...field}
          {...props}
          label={label}
          value={field.value ?? ''}
          labelId={`${name}-select`} 
          MenuProps={MenuProps}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default FormSelect;