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
          <div>Revenda</div>
          <div>brasilidade</div>
          <div>com lucro de 40%, chérie!</div>
        </div>
        <div className="sm:flex basis-full absolute top-0 left-0 sm:relative flex-1">
          <LeadsForm />
        </div>
      </div>
    </div>
  );
};

export default LeadsFormHeader;