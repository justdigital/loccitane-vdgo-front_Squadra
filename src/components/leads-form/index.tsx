"use client";
import React, { useState } from 'react';
import css from './style.module.scss';
import { Tabs, Tab } from '@mui/material';
import StepPersonalData from './tab-steps/personal-data';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import StepAddress from './tab-steps/addresss';
import { IFormInputs } from '@/utils/form.util';

const CustomTabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
  return (
    <div hidden={index !== value}>
      {children}
    </div>
  );
};

const LeadsForm = () => {

  const methods = useForm<IFormInputs>({mode: "onChange", reValidateMode: "onChange"});
  const {
    handleSubmit,
  } = methods;
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  const [tab, setTab] = useState(1);

  const gotoNextStep = () => {
    setTab(tab + 1);
  }
  
  return (
    <div className={`${css['form-box']} flex-1 bg-white`}>
      <header className="text-center">
        O cadastro é rápido e fácil, levando menos de 5 minutos!
      </header>
      <main>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Tabs
              className={`${css['tabs']}`}
              sx={{
                'minHeight': '0',
                'borderBottom': 'none',
                // 'padding-bottom': '10px',
                // 'overflow': 'auto !important',

                '.MuiTabs-scroller': {
                  'borderBottom': '1px solid black',
                  // 'overflow': 'auto !important',
                  // 'overflow-x': 'auto'
                },
                '.MuiTab-root': {
                  'padding': '10px',
                  'minHeight': '0',
                  'fontFamily': 'var(--font-loccitane-sans)',
                  'fontSize': '0.875rem',
                  'fontWeight': '700',
                  'textTransform': 'none',
                  'color': '#939393',
                  'flex': '1',
                },
                '.Mui-selected': {
                  'color': '#552E0D !important',
                },
                '.MuiTabs-indicator': {
                  'height': '3px',
                  'bottom': '-1px',
                  'backgroundColor': '#C02031',
                },
              }}
              value={tab}
              onChange={(e, i) => setTab(i)}
              aria-label="Navegação dos passos para cadastro"
            >
              <Tab label="Dados pessoais" value={1} />
              <Tab label="Endereço" value={2} />
              <Tab label="Validação" value={3} />
            </Tabs>

            <div className={`${css['form']} mt-10`}>
              <CustomTabPanel value={tab} index={1}>
                <StepPersonalData gotoNextStep={gotoNextStep} />
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={2}>
                <StepAddress gotoNextStep={gotoNextStep} />
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={3}>
                Item Three
              </CustomTabPanel>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default LeadsForm;