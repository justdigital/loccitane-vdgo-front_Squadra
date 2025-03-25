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

  const [value, setValue] = React.useState(field.value?.value);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    // const selected = props.options?.find((option: any) => option.label === field.value?.label);
    // console.log('props.options', props.options, 'field.value', field.value, 'selected', selected)
    // setValue(selected);
    // setInputValue(selected);
    // onChange(null, field.value);
    // console.log('autoSelectedValue', autoSelectedValue)
    // onChange(autoSelectedValue, autoSelectedValue);
    // setValue(field.value);
    setInputValue(field.value?.value);
  }, [field.value]);

  const onChange = (_, option: any) => {
    // setValue(option);
    // setInputValue(option);
    console.log('option?.value', option?.label)
    setInputValue(option?.label);
    field.onChange(option);
  };

  return (
    <Autocomplete
      disablePortal
      size='small'
      {...props}
      {...field}
      // value={value?.value}
      onChange={onChange}
      inputValue={inputValue || ''}
      onInputChange={(event, newInputValue) => {
        console.log('chegou aqui com: ', newInputValue)
        if (props.onInputChange) {
          props.onInputChange(event, newInputValue);
        }
        if (newInputValue) {
          setInputValue(newInputValue);
        }
      }}
      renderInput={(params) =>
        <TextField
          {...params}
          error={fieldState.invalid}
          helperText={fieldState.error?.message ?? ''}
          className={`${css['input']} ${fieldState.invalid ? css['invalid'] : fieldState.isDirty && css['valid']}`} 
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