"use client";
import React, { useEffect } from 'react';
import css from './style.module.scss';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import { IFormInputs } from '../..';
import { fetchAddressByCep } from '@/services/fetch-cep';

const StepAddress = () => {

  const {
    control,
    watch,
    setValue,
    formState
  } = useFormContext<IFormInputs>();

  const cep = watch('cep');

  const checkBoxColorStyle = {
    '&.Mui-checked': {
      color: '#51CF66',
    },
  };

  const fetchAddressDataByCep = async (cep: string) => {
    const data = await fetchAddressByCep(cep);
    const fullAddress = `<strong>${data.logradouro}</strong>, ${data.bairro}\n${data.localidade} - ${data.uf}`;
    setValue('address', fullAddress);
  };

  useEffect(() => {
    fetchAddressDataByCep(cep);
  }, [cep]);
  
  return (
    <>
      <Controller
        name="cep"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            {...field}
            error
            helperText=""
            className={`${css['input']}`} 
            fullWidth
            label="CEP"
            placeholder='00000-000'
            variant="outlined"
            size='small'
          />
        }
      />

      <Controller
        name="address"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <div contentEditable {...field} dangerouslySetInnerHTML={{ __html: field.value }}></div>
          // <TextField
          //   {...field}
          //   className={`${css['input']}`} 
          //   fullWidth
          //   label="Endereço" 
          //   variant="outlined" 
          //   size='small' 
          //   multiline
          //   rows={2}
          // />
        }
      />

      <div className="flex gap-x-4">
        <div className="w-2/5">
          <Controller
            name="addressNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => 
              <TextField
                {...field}
                className={`${css['input']}`} 
                fullWidth
                label="Número" 
                variant="outlined" 
                size='small' 
              />
            }
          />
        </div>
        <div className="w-3/5">
          <Controller
            name="addressAdditionalInfo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => 
              <TextField
                {...field}
                className={`${css['input']}`}
                fullWidth
                label="Complemento" 
                variant="outlined" 
                size='small'
              />
            }
          />
        </div>
      </div>

      <Controller
        name="addressReference"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <TextField
            {...field}
            className={`${css['input']}`} 
            fullWidth
            label="Referência" 
            variant="outlined" 
            size='small' 
          />
        }
      />

      <Button label="Avançar" buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepAddress;