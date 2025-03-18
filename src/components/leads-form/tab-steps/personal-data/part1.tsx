"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import css from './style.module.scss';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import Button from '@/components/commons/button';
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import { checkCpfIsUnavailable } from '@/services/backend-comunication';

interface Part1Props {
  gotoPart: (step: 1 | 2) => void;
}

const StepPersonalPart1: React.FC<Part1Props> = ({gotoPart}) => {

  const {
    control,
    watch,
    getFieldState,
    handleSubmit,
    formState: { errors } 
  } = useFormContext<IFormInputs>();

  const isStepValidated = useMemo(() => validateStep('personalData1', getFieldState), [getFieldState('documentNumber')]);

  const clickButton = useCallback(async () => {
    await handleSubmit(() => {}, () => {})();
    if (isStepValidated) {
      gotoPart(2);
    }
  }, [isStepValidated]);
  
  return (
    <>

      <Controller
        name="fullName"
        control={control}
        rules={{ required: 'Digite o nome completo.'}}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Nome completo"
          />
        }
      />

      <Controller
        name="documentNumber"
        control={control}
        rules={{
          required: 'Digite um CPF válido',
          pattern: {value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'CPF inválido'},
          validate: {
            checkCpfAvailability: async (cpf) => {
              return (await checkCpfIsUnavailable(cpf)) ? 'O CPF já está em uso' : true
            }
          }
        }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="CPF"
            mask="000.000.000-00"
          />
        }
      />

      <Controller
        name="cellphoneNumber"
        control={control}
        rules={{ required: 'Digite um número de celular válido', pattern: {value: /^\(\d{2}\) 9\d{4}-\d{4}$/, message: 'Número de celular inválido. Utilize o formato (DDD) 9XXXX-XXXX.'} }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Celular"
            mask="(00) 90000-0000"
          />
        }
      />

      <Controller
        name="birthdate"
        control={control}
        rules={{ required: 'Digite a data de nascimento', pattern: {value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.'} }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="Data de nascimento"
            mask="00/00/0000"
          />
        }
      />

      <Box className={`mt-5 ${css['checkboxes-box']}`}>
        <Controller
          name="authorizeExposeCellNumbers"
          control={control}
          render={({ field }) =>
            <FormCheckbox
              field={field}
              label="Autorizo a divulgação dos telefones de contato no site?"
            />
          }
        />

        <Controller
          name="receiveInfo"
          control={control}
          render={({ field }) =>
            <FormCheckbox
              field={field}
              label="Desejo receber informativos da L’Occitane ai Brésil?"
            />
          }
        />

        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: 'dsdsdsds'}}
          render={({ field }) =>
            <FormCheckbox
              field={field}
              error={!!errors.acceptTerms}
              labelOnclick={() => console.log('open terms')}
              label="Li e aceito os  termos de uso e privacidade"
            />
          }
        />
      </Box>

      <Button label="Iniciar cadastro" onClick={clickButton} type='button' buttonClasses={`w-full ${css['submit-button']}`} />
    </>
  );
};

export default StepPersonalPart1;