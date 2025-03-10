"use client";
import React from 'react';
import css from './style.module.scss';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import { IFormInputs } from '../..';

const StepPersonalPart1 = () => {

  const {
    control,
  } = useFormContext<IFormInputs>()

  const checkBoxColorStyle = {
    '&.Mui-checked': {
      color: '#51CF66',
    },
  };
  
  return (
    <>

      <Controller
        name="fullName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            error
            helperText="Incorrect entry."
            className={`${css['input']}`} 
            fullWidth
            label="Nome completo"
            variant="outlined"
            size='small'
          />
        }
      />

      <Controller
        name="documentNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            className={`${css['input']}`} 
            fullWidth
            label="CPF" 
            variant="outlined" 
            size='small' 
          />
        }
      />

      <Controller
        name="cellphoneNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            className={`${css['input']}`} 
            fullWidth
            label="Celular" 
            variant="outlined" 
            size='small' 
          />
        }
      />

      <Controller
        name="birthdate"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            className={`${css['input']}`} 
            fullWidth
            label="Data de nascimento" 
            variant="outlined" 
            size='small' 
          />
        }
      />

      <Controller
        name="authorizeExposeCellNumbers"
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
            label={<span className={`${css['checkbox-label']}`}>Autorizo a divulgação dos telefones de contato no site?</span>}
          />
        }
      />

      <Controller
        name="receiveInfo"
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
            label={<span className={`${css['checkbox-label']}`}>Desejo receber informativos da L’Occitane ai Brésil?</span>}
          />
        }
      />

      <Controller
        name="acceptTerms"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <FormControlLabel
            sx={{'marginBottom': '0px'}}
            control={
              <Checkbox
                {...field}
                sx={checkBoxColorStyle}
              />
            }
            label={<a className={`${css['checkbox-label']}`}>Li e aceito os  termos de uso e privacidade</a>}
          />
        }
      />

      <Button label="Iniciar cadastro" buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepPersonalPart1;