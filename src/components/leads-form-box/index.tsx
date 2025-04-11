"use client";
import React, { useEffect, useMemo, useRef } from 'react';
import css from './style.module.scss';
import Button from '../commons/button';
import LeadsForm from '../leads-form';
import ISectionBanner from '@/interfaces/section-banner';
import { useAppContext } from '@/contexts/app.context';
import ISectionTermsAndConditions from '@/interfaces/section-terms-and-conditions';
import ISectionFooter from '@/interfaces/section-footer';
import ISectionHeader from '@/interfaces/section-header';
import TextOverlap from '../commons/text-overlap';

interface LeadsFormHeaderProps {
  sectionData: ISectionBanner;
  termsAndConditionsSectionData: ISectionTermsAndConditions;
  headerSectionData: ISectionHeader;
  footerSectionData: ISectionFooter;
}

const LeadsFormBox: React.FC<LeadsFormHeaderProps> = ({sectionData, termsAndConditionsSectionData, headerSectionData, footerSectionData}) => {

  const {
      updateSectionData
    } = useAppContext();

  const formChildElement = useRef(null);

  const openMobileForm = (e: React.MouseEvent) => {
    (formChildElement.current as any).openMobileForm(e, true);
  }


  const bannersUrls = useMemo(() => {
    return {
      // '--banner-url-desktop': "url('/assets/images/mock/banner-1-desktop-alt.jpg')",
      // '--banner-url-mobile': "url('/assets/images/mock/banner-1-mobile.jpg')"
      '--banner-url-desktop': `url('${sectionData.imagesUrls.desktop}')`,
      '--banner-url-mobile': `url('${sectionData.imagesUrls.mobile}')`
    }
  }, []);

  useEffect(() => {
    updateSectionData("terms", termsAndConditionsSectionData);
    updateSectionData("header", headerSectionData);
    updateSectionData("footer", footerSectionData);
  }, [termsAndConditionsSectionData, headerSectionData, footerSectionData])

  return (
    <div className={`${css['banner-wrapper']} relative`} style={bannersUrls as React.CSSProperties}>
      <TextOverlap />
      <div
        className={`container w-full h-full flex flex-col sm:items-stretch md:flex-row space-y-4 md:space-y-0 md:space-x-4`}
      >
        <div className={`flex justify-end sm:hidden`}>
          <Button label="Cadastre-se agora" onClick={openMobileForm} />
        </div>
        <div
          className={`basis-full flex flex-col mb-60 justify-end relative ${css['banner-text']}`}
          dangerouslySetInnerHTML={{ __html: sectionData.text }}
        >
          {/* <div>Revenda</div>
          <div>brasilidade</div>
          <div>com lucro de 40%, chérie!</div> */}
        </div>
        <div className="flex basis-full absolute top-0 left-0 sm:relative flex-1">
          <LeadsForm ref={formChildElement} />
        </div>
      </div>
    </div>
  );
};

export default LeadsFormBox;