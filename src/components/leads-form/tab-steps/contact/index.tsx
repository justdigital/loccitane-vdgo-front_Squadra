"use client";
import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, sendDataLayerFormEvent, validateStep } from '@/utils/form.util';
import { checkBirthdateMatches, checkEmailIsUnavailable, checkIndicationCodeIsValid, putPersonalData } from '@/services/backend-comunication.service';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import _ from 'lodash';
import { useAppContext } from '@/contexts/app.context';
import { UUID } from 'crypto';
import FormSelect from '@/components/commons/form-inputs/select';
import css from './style.module.scss';
import { useAppFormContext } from '@/contexts/app-form.context';

interface StepContactProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepContact: React.FC<StepContactProps> = ({gotoNextStep, isTabActive}) => {

  const {getUserFormId, pagesUrls} = useAppContext();
  const {setFormButtonProps, showDefaultFormError} = useAppFormContext();
  const {
  } = useFormContext<IFormInputs>();

  const {
    control,
    watch,
    getFieldState,
    setValue,
    getValues,
    handleSubmit
  } = useFormContext<IFormInputs>();

  const userFormId = getUserFormId();
  const isIndication = watch("isIndication");
  const cpf = watch("documentNumber");

  const genderItems = [
    { value: 1, label: 'Feminino' },
    { value: 2, label: 'Masculino' },
    { value: 3, label: 'Prefiro não informar' }
  ];

  const sendDataToServer = async () => {
    const data = _.pick(getValues(), ['birthdate', 'email', 'gender', 'isIndication', 'resellerCode']);
    await putPersonalData(userFormId as UUID, data);
  };
  
  const clickButton = useCallback(async () => {
    try {
      setFormButtonProps({loading: true})
      await handleSubmit(() => {}, () => setFormButtonProps({loading: false}))();
      if (validateStep('contactData', getFieldState)) {
        await sendDataToServer();
        sendDataLayerFormEvent('contato', 'success');
        gotoNextStep();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setFormButtonProps({loading: false});
      sendDataLayerFormEvent('contato', 'error'); 
      showDefaultFormError();
    }
  }, [getFieldState, userFormId]);
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    setFormButtonProps({
      label: 'Avançar',
      action: clickButton
    });
    setValue('headerTitle', 'Apenas 3 passos para começar sua jornada de revenda.');
  }, [isTabActive]);
  
  return (
    <div className={`${css['fields-box']} flex flex-col`}>
      <Box className="grow">
        <Controller
          name="birthdate"
          control={control}
          rules={{
            required: 'Digite a data de nascimento',
            pattern: {value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.'},
            validate: {
              checkBirthdateMatches: async (birthdate) => {
                try {
                  return !(await checkBirthdateMatches(cpf, birthdate)) ? 'A data de nascimento não confere com o CPF' : true
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                  return 'Erro ao validar a data de nascimento. Tente novamente.';
                }
              }
            }
          }}
          render={({ field, fieldState }) =>
            <FormTextField
              field={field}
              fieldState={fieldState}
              label="Data de nascimento"
              mask="00/00/0000"
            />
          }
        />

        <Controller
          name="email"
          control={control}
          rules={
            {
              required: 'Digite seu e-mail',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'E-mail inválido'
              },
              validate: {
                checkEmailAvailability: async (email) => {
                  try {
                    return !!(await checkEmailIsUnavailable(email)) ? false : true
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  } catch (e) {
                    return 'Houve um erro ao verificar o e-mail. Tente novamente.';
                  }
                }
              }
            }
          }
          render={({ field, fieldState }) =>
            <FormTextField
              field={field}
              fieldState={fieldState}
              type="email"
              label="E-mail"
              specificErrorTemplate={{
                checkEmailAvailability: (
                  <>
                    {fieldState.error?.message ? fieldState.error.message : (
                      <a href={pagesUrls.externalLogin} target='_blank' className={`${css['helper-text-link']}`}>
                        Este e-mail já está cadastrado. Clique aqui para fazer login
                      </a>
                    )}
                  </>
                )
              }}
            />
          }
        />

        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Selecione o gênero' }}
          render={({ field, fieldState }) => 
            <FormSelect
              field={field}
              fieldState={fieldState}
              label="Gênero"
              items={genderItems}
            />
          }
        />

        <Box className="mt-3">
          <Controller
            name="isIndication"
            control={control}
            render={({ field }) =>
              <FormCheckbox
                field={field}
                label="É uma indicação?"
              />
            }
          />

          {isIndication && (
            <Box className="mt-1">
              <Controller
                name="resellerCode"
                control={control}
                rules={{
                  required: watch('isIndication') ? 'Digite o código do revendedor' : false,
                  pattern: {value: /^\d{4,}$/, message: 'Digite um código de, no mínimo, 4 números'},
                  validate: {
                    checkCodeIsValid: async (code: string) => !(await checkIndicationCodeIsValid(code)) ? 'Código não encontrado' : true
                  }
                }}
                render={({ field, fieldState }) =>
                  <FormTextField
                    field={field}
                    fieldState={fieldState}
                    label="Código"
                    type='number'
                    placeholder='digite código do(a) revendedor(a)'
                  />
                }
              />
            </Box>
          )}
        </Box>
      </Box>

    </div>
  );
};

export default StepContact;