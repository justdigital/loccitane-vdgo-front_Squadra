"use client";
import React, { forwardRef, RefAttributes, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import css from './style.module.scss';
import { Tabs, Tab } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import StepAddress from './tab-steps/addresss';
import { IFormInputs } from '@/utils/form.util';
import Button from '../commons/button';
import CloseIcon from '@mui/icons-material/Close';
import StepPersonalData from './tab-steps/personal-data';
import StepContact from './tab-steps/contact';
import StepValidation from './tab-steps/validation';
import { useAppFormContext } from '@/contexts/app-form.context';

const CustomTabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
  return (
    <div hidden={index !== value}>
      {children}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LeadsFormProps {

}

const LeadsForm: React.FC<LeadsFormProps & RefAttributes<any>> = forwardRef(({}, ref) => {

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      authorizeExposeCellNumbers: true,
      acceptReceiveInfo: true,

      // submitButtonAction: () => {},
      // submitButtonLoading: false,
      // fullName: 'Jorge Luis',
      // documentNumber: '04084092584',
      // cellphoneNumber: '71999999999',
      // birthdate: '10/03/1992',
      // acceptTerms: true,
      // email: 'jorge.malaquias@squadra.com.br',
      // gender: "2",
      // isIndication: false,
      // documentType: 'RG',
      // cep: '40296370',
      // // state: "29",
      // // city: '2927408',
      // addressNumber: '123',
      // isCodeValidated: false
    }
  });

  const {getFormButtonProps} = useAppFormContext();

  const {
    handleSubmit,
    watch,
    reset,
    getValues,
  } = methods;
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  const [majorTabAvailable, setMajorTabAvailable] = useState(1);
  const [tab, setTab] = useState(0);
  const [mobileFormVisible, setMobileFormVisible] = useState(false);

  const {
    headerTitle,
  } = watch();

  const defaultHeader = 'O cadastro é rápido e fácil, levando menos de 5 minutos!';

  const gotoNextStep = useCallback((step?: number) => {
    const newTab = step ? step : tab + 1;
    setTab(newTab);
    reset(getValues(), {
      keepValues: true,
      keepIsValid: true,
      keepDirty: true,
      keepTouched: true
    })
    
    // console.log('newTab', newTab, '-< foi para essa tab', 'tab atual', tab);
    if (newTab > majorTabAvailable) {
      setMajorTabAvailable(newTab);
    }
  }, [tab, majorTabAvailable]);


  useEffect(() => {
    gotoNextStep();
  }, []);


  const changeMobileFormVisibility = (e: React.MouseEvent, visible: boolean) => {
    setMobileFormVisible(visible);
  }

  useImperativeHandle(ref, () => ({
    openMobileForm(e: React.MouseEvent) {
      changeMobileFormVisibility(e, true);
    }
  }));
  
  return (
    <div className={`${css['modal-wrapper']} ${css['form-hidden']}`} data-visible={+mobileFormVisible}>
      <div className={`${css['form-box']} flex flex-col flex-1 bg-white`}>
        <header className="flex items-center text-left sm:text-center">
          {headerTitle || defaultHeader}
          <a onClick={(e) => changeMobileFormVisibility(e, false)} className='block sm:hidden'><CloseIcon /></a>
        </header>
        <FormProvider {...methods}>
          {tab ? (
            <>
              <Tabs
                className={`${css['tabs']}`}
                value={tab}
                onChange={(e, i) => setTab(i)}
                aria-label="Navegação dos passos para cadastro"
              >
                <Tab label="Dados pessoais" value={1} />
                <Tab label="Contato" value={2} disabled={majorTabAvailable < 2} />
                <Tab label="Endereço" value={3} disabled={majorTabAvailable < 3} />
                <Tab label="Validação" value={4} disabled={majorTabAvailable < 4} />
              </Tabs>
              <main className='grow'>
              
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={`mt-5 sm:mt-10 pt-2 sm:pt-0`}>
                    <CustomTabPanel value={tab} index={1}>
                      <StepPersonalData gotoNextStep={gotoNextStep} isTabActive={tab === 1} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                      <StepContact gotoNextStep={gotoNextStep} isTabActive={tab === 2} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={3}>
                      <StepAddress gotoNextStep={gotoNextStep} isTabActive={tab === 3} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={4}>
                      <StepValidation gotoNextStep={gotoNextStep} isTabActive={tab === 4} />
                    </CustomTabPanel>
                  </div>
                </form>
              </main>
            </>
          ) : <></>
          }
        </FormProvider>
        {getFormButtonProps().label && (
          <div className={`${css['footer-button']}`}>
            <Button label={getFormButtonProps().label || ''} disabled={!!getFormButtonProps().disabled} onClick={getFormButtonProps().action} isLoading={getFormButtonProps().loading} type='button' buttonClasses={`w-full ${css['submit-button']}`} />
          </div>
        )}
      </div>
    </div>
  );
});

LeadsForm.displayName = 'LeadsForm';
export default LeadsForm;