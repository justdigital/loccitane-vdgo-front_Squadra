"use client";
import React, { forwardRef, RefAttributes, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import css from './style.module.scss';
import { Tabs, Tab } from '@mui/material';
import StepPersonalData from './tab-steps/personal-data';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import StepAddress from './tab-steps/addresss';
import { IFormInputs } from '@/utils/form.util';
import Button from '../commons/button';
import CloseIcon from '@mui/icons-material/Close';

const CustomTabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
  return (
    <div hidden={index !== value}>
      {children}
    </div>
  );
};

interface LeadsFormProps {

}

const LeadsForm: React.FC<LeadsFormProps & RefAttributes<any>> = forwardRef(({}, ref) => {

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    // defaultValues: {
    //   submitButtonAction: () => {},
    //   submitButtonLoading: false,
    //   fullName: 'Jorge Luis',
    //   documentNumber: '00000000000',
    //   cellphoneNumber: '71999999999',
    //   birthdate: '10/03/1992',
    //   authorizeExposeCellNumbers: false,
    //   acceptReceiveInfo: false,
    //   acceptTerms: true,
    //   email: 'teste@teste.com',
    //   emailConfirmation: 'teste@teste.com',
    //   gender: "1",
    //   isIndication: false,
    // }
  });
  const {
    handleSubmit,
    watch,
    reset,
    getValues
  } = methods;
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  const [majorTabAvailable, setMajorTabAvailable] = useState(1);
  const [tab, setTab] = useState(0);
  const [mobileFormVisible, setMobileFormVisible] = useState(false);

  const headerTitle = watch('headerTitle');
  const submitButtonAction = watch('submitButtonAction');
  const submitButtonLabel = watch('submitButtonLabel');
  const submitButtonLoading = watch('submitButtonLoading');

  // const [headerTitle, setHeaderTitle] = useState('O cadastro é rápido e fácil, levando menos de 5 minutos!');
  // const [submitButtonLabel, setSubmitButtonLabel] = useState('Iniciar cadastro');
  const defaultHeader = 'O cadastro é rápido e fácil, levando menos de 5 minutos!';
  const defaultSubmitButtonLabel = 'Iniciar cadastro';

  const gotoNextStep = useCallback(() => {
    const newTab = tab + 1;
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
    switch (tab) {
      case 1:
        // setHeaderTitle('O cadastro é rápido e fácil, levando menos de 5 minutos!');
        // setSubmitButtonLabel('Iniciar cadastro');
        break;

      case 2:
        // setHeaderTitle('Está quase lá! Só 2 passos e essa oportunidade vira realidade!');
        // setSubmitButtonLabel('Avançar');
        break;
    }
  }, [tab]);

  useEffect(() => {
    gotoNextStep();
  }, []);


  const changeMobileFormVisibility = (e: React.MouseEvent, visible: boolean) => {
    // console.log('e', e)
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
        <main className='grow'>
        {tab ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tabs
                className={`${css['tabs']}`}
                value={tab}
                onChange={(e, i) => setTab(i)}
                aria-label="Navegação dos passos para cadastro"
              >
                <Tab label="Dados pessoais" value={1} />
                {/* <Tab label="Contato" value={1} /> */}
                <Tab label="Endereço" value={2} disabled={majorTabAvailable < 2} />
                <Tab label="Validação" value={3} disabled={majorTabAvailable < 3} />
              </Tabs>

              <div className={`mt-5 sm: mt-10`}>
                <CustomTabPanel value={tab} index={1}>
                  <StepPersonalData gotoNextStep={gotoNextStep} isTabActive={tab === 1} />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={2}>
                  <StepAddress gotoNextStep={gotoNextStep} isTabActive={tab === 2} />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={3}>
                  Item Three
                </CustomTabPanel>
              </div>
            </form>
          </FormProvider>
        )
          : <></>
        }
        </main>
        <div className={`${css['footer-button']}`}>
          <Button label={submitButtonLabel || defaultSubmitButtonLabel} onClick={submitButtonAction} isLoading={submitButtonLoading} type='button' buttonClasses={`w-full ${css['submit-button']}`} />
        </div>
      </div>
    </div>
  );
});

export default LeadsForm;