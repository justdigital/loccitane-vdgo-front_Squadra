"use client";
import React, { useMemo } from 'react';
import css from './style.module.scss';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import { checkEmailIsUnavailable } from '@/services/backend-comunication';

interface Part2Props {
  gotoPart: (part: 1 | 2) => void;
  gotoNextStep: () => void;
}

const StepPersonalPart2: React.FC<Part2Props> = ({gotoPart, gotoNextStep}) => {

  const {
  } = useFormContext<IFormInputs>();

  const {
    control,
    watch,
    getFieldState
  } = useFormContext<IFormInputs>()

  const watchedFields = watch();
  const isIndication = watch("isIndication");

  const activeSubmitButton = useMemo(() => validateStep('personalData2', getFieldState), [getFieldState, watchedFields]);


  const clickButton = () => {
    gotoNextStep();
  }

  const checkBoxColorStyle = {
    '&.Mui-checked': {
      color: '#51CF66',
    },
  };
  
  return (
    <>

      <Controller
        name="email"
        control={control}
        rules={
          { required: 'Digite seu e-mail',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'E-mail inválido'
            },
            validate: {
              checkEmailAvailability: async (email) => (await checkEmailIsUnavailable(email)) ? false : 'O e-mail já está em uso'
            }
          }
        }
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            type="email"
            label="E-mail"
          />
        }
      />

      <Controller
        name="emailConfirmation"
        control={control}
        rules={{ required: 'Confirme o e-mail', validate: value => value === watch('email') || 'E-mails não conferem' }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            type="email"
            label="Confirmação de e-mail"
          />
        }
      />

      <Controller
        name="isIndication"
        control={control}
        render={({ field }) => 
          <FormControlLabel
            sx={{'marginBottom': '-10px'}}
            control={
              <Checkbox
                {...field}
                sx={checkBoxColorStyle}
              />
            }
            label={<span className={`${css['checkbox-label']}`}>É uma indicação?</span>}
          />
        }
      />

      <Controller
        name="resellerCode"
        control={control}
        rules={{ required: watch('isIndication') && 'Digite o código do revendedor' }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            disabled={!isIndication}
            label="Código" 
            placeholder='digite código do revendedor'
          />
        }
      />

      <Controller
        name="gender"
        control={control}
        rules={{ required: 'Selecione o gênero' }}
        render={({ field }) => 
          <FormControl fullWidth size='small'>
            <InputLabel id="gender-select">Gênero</InputLabel>
            <Select
              {...field}
              labelId="gender-select"
              label="Gênero"
              variant="outlined" 
            >
              <MenuItem value={1}>Masculino</MenuItem>
              <MenuItem value={2}>Feminino</MenuItem>
              <MenuItem value={3}>Prefiro não informar</MenuItem>
            </Select>
          </FormControl>
        }
      />

      <Button label="Iniciar cadastro" type='button' onClick={clickButton} disabled={!activeSubmitButton} buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepPersonalPart2;