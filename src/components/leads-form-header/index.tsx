import React, { useMemo } from 'react';
import css from './style.module.scss';
import Button from '../commons/button';
import LeadsForm from '../leads-form';

interface LeadsFormHeaderProps {}

const LeadsFormHeader: React.FC<LeadsFormHeaderProps> = () => {


  const bannersUrls = useMemo(() => {
    return {
      '--banner-url-desktop': "url('/assets/images/mock/banner-1-desktop.jpg')",
      '--banner-url-mobile': "url('/assets/images/mock/banner-1-mobile.jpg')"
    }
  }, []);

  return (
    <div className='container'>
      <div
        className={`${css['banner-wrapper']} w-full h-full flex flex-col sm:items-stretch md:flex-row space-y-4 md:space-y-0 md:space-x-4`}
        style={bannersUrls as React.CSSProperties}
      >
        <div className={`text-right sm:hidden`}>
          <Button label="Cadastre-se agora" />
        </div>
        <div className={`basis-full flex flex-col mb-60 justify-end ${css['banner-text']}`}>
          <p>Revenda</p>
          <h2>brasilidade</h2>
          <p>com lucro de 40%, chérie!</p>
        </div>
        <div className="hidden sm:flex basis-full relative flex-1">
          <LeadsForm />
        </div>
      </div>
    </div>
  );
};

export default LeadsFormHeader;