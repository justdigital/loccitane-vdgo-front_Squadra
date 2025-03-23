"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";
import FormTextField from '@/components/commons/form-inputs/text-field';
import { IFormInputs, validateStep } from '@/utils/form.util';
import { checkEmailIsUnavailable, putPersonalData } from '@/services/backend-comunication.service';
import FormCheckbox from '@/components/commons/form-inputs/checkbox';
import _ from 'lodash';
import { useAppContext } from '@/contexts/app.context';
import { UUID } from 'crypto';
import FormSelect from '@/components/commons/form-inputs/select';

interface Part2Props {
  gotoPart: (part: 1 | 2) => void;
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepPersonalPart2: React.FC<Part2Props> = ({gotoPart, gotoNextStep, isTabActive}) => {

  const {getUserFormId} = useAppContext();
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

  const genderItems = [
    { value: 1, label: 'Masculino' },
    { value: 2, label: 'Feminino' },
    { value: 3, label: 'Prefiro não informar' }
  ];

  const sendDataToServer = async (onOk: () => void) => {

    try {
      const data = _.pick(getValues(), ['email', 'gender', 'isIndication', 'resellerCode']);
      await putPersonalData(userFormId as UUID, data);
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
    if (validateStep('personalData2', getFieldState)) {
      sendDataToServer(() => gotoNextStep());
    }
  }, [getFieldState]);
  
  useEffect(() => {
    if (!isTabActive) {
      return;
    }
    
    setValue('submitButtonAction', clickButton);
    setValue('submitButtonLabel', 'Avançar');
    setValue('headerTitle', 'Apenas 3 passos para começar sua jornada de revenda.');
  }, [isTabActive]);
  
  return (
    <div className="flex flex-col">
      <Box className="grow">
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
                checkEmailAvailability: async (email) => (await checkEmailIsUnavailable(email)) ? 'O e-mail já está em uso' : true
              }
            }
          }
          render={({ field, fieldState }) =>
            <FormTextField
              field={field}
              fieldState={fieldState}
              type="email"
              label="E-mail"
            />
          }
        />

        <Controller
          name="emailConfirmation"
          control={control}
          rules={{ required: 'Confirme o e-mail', validate: value => value === watch('email') || 'E-mails não conferem' }}
          render={({ field, fieldState }) =>
            <FormTextField
              field={field}
              fieldState={fieldState}
              type="email"
              label="Confirmação do E-mail"
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
                rules={{ required: watch('isIndication') ? 'Digite o código do revendedor' : false }}
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
            // <FormControl
            //   fullWidth
            //   size='small'
            //   error={fieldState.invalid}
            // >
            //   <InputLabel id="gender-select">Gênero</InputLabel>
            //   <Select
            //     {...field}
            //     value={field.value ?? undefined}
            //     labelId="gender-select"
            //     label="Gênero"
            //     variant="outlined" 
            //   >
            //     <MenuItem value={1}>Masculino</MenuItem>
            //     <MenuItem value={2}>Feminino</MenuItem>
            //     <MenuItem value={3}>Prefiro não informar</MenuItem>
            //   </Select>
            //   <FormHelperText>{fieldState.error?.message}</FormHelperText>
            // </FormControl>
          }
        />
      </Box>

      {/* <Button label="Iniciar cadastro" type='button' onClick={clickButton} disabled={!activeSubmitButton} buttonClasses={`w-full ${css['submit-button']}`} /> */}
    </div>
  );
};

export default StepPersonalPart2;