import React, { useEffect } from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import css from './style.module.scss';


interface FormAutoCompleteProps {
  field?: any;
  fieldState?: any;
  label: string;
}

const FormAutoComplete: React.FC<FormAutoCompleteProps & TextFieldProps & Partial<AutocompleteProps<any, any, any, any>>> = ({
  field,
  fieldState,
  label,
  ...props
}) => {

  const [value, setValue] = React.useState(field.value || null);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (field.value === '') {
      setInputValue('');
      setValue('')
    }

    if (field.value && field.value !== '') {
      setInputValue(field.value?.label);
      setValue({...field.value, selected: true});
    }
  }, [field.value]);

  const onChange = (_: any, option: any) => {
    setValue(option);
    field.onChange(option);
  };

  return (
    <Autocomplete
      disablePortal
      size='small'
      {...props}
      {...field}
      value={value}
      onChange={onChange}
      inputValue={inputValue || ''}
      onInputChange={(event, newInputValue, reason) => {
        if (!event) {
          return;
        }

        if (props.onInputChange) {
          props.onInputChange(event, newInputValue, reason);
        }
        setInputValue(newInputValue);
      }}
      renderInput={(params) =>
        <TextField
          {...params}
          error={fieldState.invalid}
          helperText={fieldState.error?.message ?? ''}
          className={`${css['input']} ${fieldState.invalid ? css['invalid'] : field.value && css['valid']}`} 
          fullWidth
          variant="outlined"
          size='small'
          label={label}
        />
      }
    />
  );
};

export default FormAutoComplete;