"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import css from './style.module.scss';
import { Box } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import { checkCpfIsUnavailable, createUser } from '@/services/backend-comunication';
import _ from 'lodash';
import { useAppContext } from '@/utils/app.context';

interface Part1Props {
  gotoPart: (step: 1 | 2) => void;
  isTabActive: boolean;
}

const StepPersonalPart1: React.FC<Part1Props> = ({gotoPart, isTabActive}) => {

  const {
    control,
    getFieldState,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors } 
  } = useFormContext<IFormInputs>();

  const {setUserFormId} = useAppContext();

  const sendDataToServer = async (onOk: () => void) => {
    setValue('submitButtonLoading', true);

    try {
      const data = _.pick(getValues(), ['fullName', 'documentNumber', 'cellphoneNumber', 'birthdate', 'authorizeExposeCellNumbers', 'acceptReceiveInfo', 'acceptTerms']);
      const uuid = await createUser(data);
      setUserFormId(uuid);
      onOk();
    } catch (e) {
      console.error('Erro ao enviar dados para o servidor:', e)
    } finally {
      setValue('submitButtonLoading', false);
    }
  };
  
  const clickButton = useCallback(async () => {
    setValue('submitButtonLoading', true);
    await handleSubmit(() => {}, () => setValue('submitButtonLoading', false))();
    if (validateStep('personalData1', getFieldState)) {
      sendDataToServer(() => gotoPart(2));
    }
  }, [getFieldState]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    setValue('submitButtonAction', clickButton);
    setValue('submitButtonLabel', 'Iniciar cadastro');
    setValue('headerTitle', 'O cadastro é rápido e fácil, levando menos de 5 minutos!');
  }, [isTabActive]);
  
  return (
    <>

      <Controller
        name="fullName"
        control={control}
        rules={{
          required: 'Digite o nome completo.',
          pattern: {
            value: /^(?=.*\b[a-zA-Z]{2,}\b.*\b[a-zA-Z]{2,}\b)[a-zA-Z\s]+$/,
            message: 'Digite seu nome completo'
          },
        }}
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
          name="acceptReceiveInfo"
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
          rules={{ required: 'Compo obrigatório.'}}
          render={({ field, fieldState }) =>
            <FormCheckbox
              field={field}
              fieldState={fieldState}
              labelOnclick={() => console.log('open terms')}
              label="Li e aceito os  termos de uso e privacidade"
            />
          }
        />
      </Box>

      {/* <Button label="Iniciar cadastro" onClick={clickButton} isLoading={isSendingData} type='button' buttonClasses={`w-full ${css['submit-button']}`} /> */}
    </>
  );
};

export default StepPersonalPart1;