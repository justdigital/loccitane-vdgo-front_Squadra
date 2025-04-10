"use client";
import React, { useCallback, useEffect, useState } from 'react';
import css from './style.module.scss';
import { Box } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import TermsAndConditions from '@/components/modals/terms-and-conditions';
import { checkCpfIsUnavailable, checkCpfIsValid, createUser } from '@/services/backend-comunication.service';
import _ from 'lodash';
import { useAppContext } from '@/contexts/app.context';
import { useAppFormContext } from '@/contexts/app-form.context';
/*
import type { 
  ISectionTermsAndConditions,
  ISectionFooter,
  ISectionHeader 
} from '@/interfaces';
*/

interface StepPersonalDataProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({gotoNextStep, isTabActive}) => {
  const {
    getSectionData
  } = useAppContext();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    control,
    getFieldState,
    handleSubmit,
    getValues,
    setValue,
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();
  const {setUserFormId} = useAppContext();

  const sendDataToServer = async (onOk: () => void) => {
    try {
      const data = _.pick(getValues(), ['fullName', 'documentNumber', 'cellphoneNumber', 'authorizeExposeCellNumbers', 'acceptReceiveInfo', 'acceptTerms']);
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
    setFormButtonProps({loading: true})
    await handleSubmit(() => {}, () => setFormButtonProps({loading: false}))();
    if (validateStep('personalData', getFieldState)) {
      sendDataToServer(() => gotoNextStep());
    }
  }, [getFieldState]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    setFormButtonProps({
      label: 'Iniciar cadastro',
      action: clickButton
    });
    setValue('headerTitle', 'O cadastro é rápido e fácil, levando menos de 5 minutos!');
  }, [isTabActive]);
  
  return (
    <div className={`${css['fields-box']}`}>

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
          pattern: {value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'CPF inválido. Digite um CPF válido.'},
          validate: {
            checkCpfIsValid: async (cpf) => {
              try {
                return (await checkCpfIsValid(cpf)) && true
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (e) {
                return 'CPF inválido. Digite um CPF válido.'
              }
            },
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
          rules={{ required: 'Campo obrigatório.'}}
          render={({ field, fieldState }) =>
            <FormCheckbox
              field={field}
              fieldState={fieldState}
              //labelOnclick={() => console.log('open terms')}
              labelOnclick={() => setModalOpen(true)}
              label="Li e aceito os  termos de uso e privacidade"
            />
          }
        />
      </Box>

      {/* Modal */}
      <TermsAndConditions 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        sectionData={{
          terms: getSectionData<ISectionTermsAndConditions>("terms"), 
          footer: getSectionData<ISectionFooter>("footer"), 
          header: getSectionData<ISectionHeader>("header")
        }} 
      />
    </div>
  );
};

export default StepPersonalData;