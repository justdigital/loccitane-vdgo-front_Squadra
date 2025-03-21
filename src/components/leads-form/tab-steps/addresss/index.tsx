"use client";
import React, { useCallback, useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { fetchAddressByCep } from '@/services/fetch-cep';
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import { useAppContext } from '@/utils/app.context';
import _ from 'lodash';
import { putAddressData } from '@/services/backend-comunication';
import { UUID } from 'crypto';

interface StepAddressProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepAddress: React.FC<StepAddressProps> = ({gotoNextStep, isTabActive}) => {

  const {getUserFormId} = useAppContext();

  const {
    control,
    watch,
    setValue,
    getFieldState,
    handleSubmit,
    getValues,
  } = useFormContext<IFormInputs>();
  
  const userFormId = getUserFormId();

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
      /** remover quando atualizar formulário */
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.estado);
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToServer = async (onOk: () => void) => {
    setValue('submitButtonLoading', true);

    try {
      const data = _.pick(getValues(), ['cep', 'address', 'addressNumber', 'addressAdditionalInfo', 'addressReference', 'neighborhood', 'city', 'state']);
      await putAddressData(userFormId as UUID, data);
      onOk();
    } catch (e) {
      console.error('Erro ao enviar dados para o servidor:', e)
    } finally {
      setValue('submitButtonLoading', false);
    }
  };

  const clickButton = useCallback(async () => {
    setValue('submitButtonLoading', true);
    console.log('userFormId', userFormId);
    await handleSubmit(() => {}, () => setValue('submitButtonLoading', false))();
    if (validateStep('address', getFieldState)) {
      sendDataToServer(() => gotoNextStep());
    }
  }, [getFieldState, userFormId]);

  useEffect(() => {
    if (!isTabActive) {
      return;
    }

    setValue('submitButtonAction', clickButton);
    setValue('submitButtonLabel', 'Avançar');
    setValue('headerTitle', 'Está quase lá! Só 2 passos e essa oportunidade vira realidade!');
  }, [isTabActive]);

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

      {/* <Button label="Avançar" buttonClasses={`w-full ${css['submit-button']}`} /> */}
    </>
  );
};

export default StepAddress;