"use client";
import React, { useCallback, useEffect, useState } from 'react';
import css from './style.module.scss';
import { Box } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, sendDataLayerFormEvent, validateStep } from '@/utils/form.util';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import TermsAndConditions from '@/components/modals/terms-and-conditions';
import { checkCpfIsUnavailable, checkCpfIsValid, createUser } from '@/services/backend-comunication.service';
import _ from 'lodash';
import { useAppContext } from '@/contexts/app.context';
import { useAppFormContext } from '@/contexts/app-form.context';
import ISectionTermsAndConditions from '@/interfaces/section-terms-and-conditions';
import ISectionFooter from '@/interfaces/section-footer';
import ISectionHeader from '@/interfaces/section-header';

interface StepPersonalDataProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({gotoNextStep, isTabActive}) => {

  const {
    getSectionData
  } = useAppContext();

  const {showDefaultFormError} = useAppFormContext();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    control,
    getFieldState,
    handleSubmit,
    getValues,
    setValue,
  } = useFormContext<IFormInputs>();

  const {setFormButtonProps} = useAppFormContext();
  const {setUserFormId, pagesUrls} = useAppContext();
  const [disableFormFields, setDisableFormFields] = useState(false);

  const sendDataToServer = async () => {
    const data = _.pick(getValues(), ['fullName', 'documentNumber', 'cellphoneNumber', 'authorizeExposeCellNumbers', 'acceptReceiveInfo', 'acceptTerms']);
    const uuid = await createUser(data);
    setUserFormId(uuid);
  };
  
  const clickButton = useCallback(async () => {
    try {
      setFormButtonProps({loading: true});
      await handleSubmit(() => {}, () => setFormButtonProps({loading: false}))();
      if (validateStep('personalData', getFieldState)) {
        await sendDataToServer();
        sendDataLayerFormEvent('dados_pessoais', 'success');
        gotoNextStep();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      setFormButtonProps({loading: false});
      sendDataLayerFormEvent('dados_pessoais', 'error'); 
      showDefaultFormError();
    }
  }, [getFieldState]);

  const checkCpfAvailability = useCallback(async (cpf: string) => {
    const isUnavailable = await checkCpfIsUnavailable(cpf);
    if (isUnavailable) {
      setDisableFormFields(true);

      if (isTabActive) {
        setFormButtonProps({
          label: 'Fazer login',
          action: () => window.open(pagesUrls.externalLogin, '_blank')
        });
      }
      return false;
    }

    setDisableFormFields(false);
    return true;
  }, [isTabActive]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    if (!disableFormFields) {
      setFormButtonProps({
        label: 'Iniciar cadastro',
        action: clickButton
      });
    }
    setValue('headerTitle', 'O cadastro é rápido e fácil, levando menos de 5 minutos!');
  }, [isTabActive, disableFormFields]);
  
  return (
    <div className={`${css['fields-box']}`}>

      <Controller
        name="fullName"
        control={control}
        rules={{
          required: 'Digite o nome completo.',
          pattern: {
            value: /^(?=.*\b[\p{L}]{2,}\b.*\b[\p{L}]{2,}\b)[\p{L}\s]+$/u,
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
                (await checkCpfIsValid(cpf));
                return true;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (e: any) {
                if (e.response.data === 'CPF inválido.') {
                  return 'CPF inválido. Digite um CPF válido.';
                }

                return 'Houve um erro ao verificar o CPF. Tente novamente.';
              }
            },
            checkCpfAvailability: async (cpf) => {
              try {
                return (await checkCpfAvailability(cpf));
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (e) {
                return 'Houve um erro ao verificar se o CPF está disponível. Tente novamente.'
              }
            }
          }
        }}
        render={({ field, fieldState }) =>
          <FormTextField
            field={field}
            fieldState={fieldState}
            label="CPF"
            mask="000.000.000-00"
            specificErrorTemplate={{
              checkCpfAvailability: (
                <>
                  {fieldState.error?.message ? fieldState.error.message : (
                    <a href={pagesUrls.externalLogin} target='_blank' className={`${css['helper-text-link']}`}>
                      Este CPF já está cadastrado. Clique aqui para fazer login
                    </a>
                  )}
                </>
              )
            }}
          />
        }
      />

      <Controller
        name="cellphoneNumber"
        control={control}
        disabled={disableFormFields}
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
              label="Desejo receber informativos da L’Occitane au Brésil?"
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
          terms: getSectionData<ISectionTermsAndConditions>("terms") as ISectionTermsAndConditions, 
          footer: getSectionData<ISectionFooter>("footer") as ISectionFooter, 
          header: getSectionData<ISectionHeader>("header") as ISectionHeader
        }} 
      />
    </div>
  );
};

export default StepPersonalData;