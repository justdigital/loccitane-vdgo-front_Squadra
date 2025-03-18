"use client";
import React, { useEffect } from 'react';
import css from './style.module.scss';
import { FormControl, Input, InputLabel, TextField } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import { IFormInputs } from '../..';
import { fetchAddressByCep } from '@/services/fetch-cep';
import MaskedInput from '@/components/commons/masked-input';
import FormTextField from '@/components/commons/form-inputs/text-field';

const StepAddress = () => {

  const {
    control,
    watch,
    setValue,
    getFieldState,
  } = useFormContext<IFormInputs>();

  const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
  const cep = watch('cep');

  const fetchAddressDataByCep = async (cep: string) => {
    try {
      const data = await fetchAddressByCep(cep);
      if (data.erro) {
        setValue('address', '');
        throw new Error('CEP não encontrado');
      }
      // const fullAddress = `<strong>${data.logradouro}</strong>, ${data.bairro}\n${data.localidade} - ${data.uf}`;
      const fullAddress = `${data.logradouro}, ${data.bairro}\n${data.localidade} - ${data.uf}`;
      setValue('address', fullAddress);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cep || !cep.match(cepPattern))
      return;

    fetchAddressDataByCep(cep);
  }, [cep, getFieldState]);
  
  return (
    <>
      <Controller
        name="cep"
        control={control}
        rules={{ required: 'Digite o CEP', pattern: {value: cepPattern, message: 'CEP inválido'} }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="CEP" 
            placeholder='00000-000'
            mask="00000-000"
          />
        }
      />

      <Controller
        name="address"
        control={control}
        rules={{ required: 'Endereço é obrigatório'}}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Endereço" 
            multiline
            rows={2}
          />
          // <div
          //   contentEditable
          //   dangerouslySetInnerHTML={{ __html: field.value }}>
          
          // </div>
        }
      />

      <div className="flex gap-x-4 mt-5">
        <div className="w-2/5">
          <Controller
            name="addressNumber"
            control={control}
            rules={{ required: 'Número é obrigatório' }}
            render={({ field, fieldState }) =>
              <FormTextField
                field={field}
                fieldState={fieldState}
                label="Número" 
              />
            }
          />
        </div>
        <div className="w-3/5">
          <Controller
            name="addressAdditionalInfo"
            control={control}
            render={({ field, fieldState }) =>
              <FormTextField
                field={field}
                fieldState={fieldState}
                label="Complemento" 
              />
            }
          />
        </div>
      </div>

      <Controller
        name="addressReference"
        control={control}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Referência" 
          />
        }
      />

      <Button label="Avançar" buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepAddress;