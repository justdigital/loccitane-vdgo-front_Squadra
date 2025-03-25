"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, set, useFormContext } from "react-hook-form";
import { fetchAddressByCep } from '@/services/fetch-cep';
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import { useAppContext } from '@/contexts/app.context';
import _ from 'lodash';
import { getStateCityList, getStateList, putAddressData } from '@/services/backend-comunication.service';
import { UUID } from 'crypto';
import FormSelect from '@/components/commons/form-inputs/select';
import { Autocomplete, TextField } from '@mui/material';
import FormAutoComplete from '@/components/commons/form-inputs/autocomplete';

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

  const [stateList, setStateList] = useState<{id: number, label: string}[]>([]);
  const [cityList, setCityList] = useState<{id: number, label: string}[]>([]);
  const [cityFilterInputValue, setCityFilterInputValue] = useState('');

  const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
  const cep = watch('cep');
  const state: any = watch('state');

  const fetchAddressDataByCep = async (cep: string) => {
    try {
      const data = await fetchAddressByCep(cep);
      if (data.erro) {
        setValue('address', '');
        throw new Error('CEP não encontrado');
      }
      const fullAddress = data.logradouro;
      setValue('address', fullAddress);
      /** remover quando atualizar formulário */
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      const foundState = stateList.find(state => state.label === data.estado);
      console.log('foundState', foundState)
      setValue('state', foundState as any);
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToServer = async (onOk: () => void) => {
    setValue('submitButtonLoading', true);

    try {
      const data = _.pick(getValues(), ['cep', 'address', 'addressNumber', 'addressAdditionalInfo', 'addressReference', 'neighborhood', 'city', 'state']);
      console.log('data', data)
      data.state = ''+data.state.id;
      data.city = ''+data.city.id;
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
    await handleSubmit(() => {}, () => setValue('submitButtonLoading', false))();
    if (validateStep('address', getFieldState)) {
      sendDataToServer(() => gotoNextStep());
    }
  }, [getFieldState, userFormId, gotoNextStep]);

  const fetchCityList = async (cityFilter: any) => {
    if (!state || !cityFilter) {
      return;
    }
    const result = await getStateCityList(+state?.id, cityFilter);
    setCityList(result.map(({id, nome}) => ({id, label: nome})));
  };

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

  useEffect(() => {
    (async () => {
      const result = (await getStateList());
      setStateList(
        result
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map(({id, nome}) => ({id, label: nome}))
      );
    })();
  }, []);
  
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
          />
          // <div
          //   contentEditable
          //   dangerouslySetInnerHTML={{ __html: field.value }}>
          
          // </div>
        }
      />

      <div className="flex gap-x-4 mt-5">
        <div className="w-1/5">
          <Controller
            name="addressNumber"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) =>
              <FormTextField
                field={field}
                fieldState={fieldState}
                label="Número" 
              />
            }
          />
        </div>
        <div className="w-2/5">
          <Controller
            name="state"
            control={control}
            rules={{ required: 'Selecione um estado' }}
            render={({ field, fieldState }) =>
              // <FormSelect
              //   field={field}
              //   fieldState={fieldState}
              //   label="Estado" 
              //   items={stateList}
              // />
              <FormAutoComplete
                field={field}
                fieldState={fieldState}
                options={stateList}
                label="Estado"
              />
            }
          />
        </div>
        <div className="w-2/5">
          {/* estado: {state?.label} */}
          <Controller
            name="city"
            control={control}
            rules={{ required: 'Selecione uma cidade' }}
            render={({ field, fieldState }) =>
              <FormAutoComplete
                field={field}
                fieldState={fieldState}
                filterOptions={(x) => x}
                options={cityList}
                onInputChange={(event, newInputValue) => {
                  setCityFilterInputValue(newInputValue);
                  fetchCityList(newInputValue);
                }}
                label="Cidade"
                noOptionsText={cityFilterInputValue ? 'Nenhuma cidade encontrada' : 'Pesquise uma cidade'}
              />
            }
          />
        </div>
      </div>

      <div className="flex gap-x-4 mt-5">
        <div className="w-2/5">
          <Controller
            name="neighborhood"
            control={control}
            rules={{ required: 'Bairro é obrigatório' }}
            render={({ field, fieldState }) =>
              <FormTextField
                field={field}
                fieldState={fieldState}
                label="Bairro" 
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
                maxLength={60}
                // slotProps={{ htmlInput: { maxLength: 12 } }}
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
            maxLength={60}
          />
        }
      />

      {/* <Button label="Avançar" buttonClasses={`w-full ${css['submit-button']}`} /> */}
    </>
  );
};

export default StepAddress;