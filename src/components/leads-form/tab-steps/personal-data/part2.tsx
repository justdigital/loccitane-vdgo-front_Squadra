"use client";
import React from 'react';
import css from './style.module.scss';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import { IFormInputs } from '../..';

const StepPersonalPart2 = () => {

  const {
    control,
    watch,
  } = useFormContext<IFormInputs>()

  const isIndication = watch("isIndication")

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
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            error
            helperText="Incorrect entry."
            className={`${css['input']}`} 
            fullWidth
            type='email'
            label="E-mail"
            variant="outlined"
            size='small'
          />
        }
      />

      <Controller
        name="emailConfirmation"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            className={`${css['input']}`} 
            fullWidth
            type='email'
            label="Confirmação de e-mail" 
            variant="outlined" 
            size='small'
          />
        }
      />

      <Controller
        name="isIndication"
        control={control}
        rules={{ required: true }}
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
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            className={`${css['input']}`} 
            fullWidth
            disabled={!isIndication}
            label="Código" 
            placeholder='digite código do revendedor'
            variant="outlined" 
            size='small' 
          />
        }
      />

      <Controller
        name="resellerCode"
        control={control}
        rules={{ required: true }}
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

      <Button label="Iniciar cadastro" buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepPersonalPart2;