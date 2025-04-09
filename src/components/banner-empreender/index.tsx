"use client";
import css from './style.module.scss';
import React, { useMemo } from 'react';
import ButtonDefault from '../commons/button-default';
import ISectionBannerEmpreender from '@/interfaces/section-banner-empreender';

interface BannerEmpreenderProps {
  sectionData: ISectionBannerEmpreender;
  className?: string;
  onClick?: () => void;
}

const BannerEmpreender: React.FC<BannerEmpreenderProps> = ({ sectionData }) => {
  const { mobile, desktop } = sectionData.imagesUrls || {};
  const hasImages = mobile && desktop;

  const style = useMemo(() => ({
    '--banner-url-mobile': hasImages ? `url(${mobile})` : 'none',
    '--banner-url-desktop': hasImages ? `url(${desktop})` : 'none'
  }), [hasImages, mobile, desktop]);

  return (
    <div 
      id='banner-empreender'
      className={`${css['banner-wrapper']} ${hasImages ? css['has-background'] : ''}`}
      style={style as React.CSSProperties}
    >
      <div className={`${css['container']} mx-auto w-full`}>
        {sectionData.text && (
          <div className={`${css['text']}`}
            dangerouslySetInnerHTML={{ __html: sectionData.text }} />
        )}
        
        {/* {sectionData.buttonLinkTitle && sectionData.buttonLink && (
          <div className={css['button-default']}>
            <a 
              href={sectionData.buttonLink} 
              //target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${sectionData.buttonLinkTitle} (opens in new tab)`}
            >
              <ButtonDefault label={sectionData.buttonLinkTitle} />
            </a>
          </div>
        )} */}
        {sectionData.buttonLinkTitle && sectionData.buttonLink && (
          <div className={css['button-default']}>
            <ButtonDefault 
              className={`${css['button-default']}`}
              label={sectionData.buttonLinkTitle}
              href={sectionData.buttonLink}
            /> 
          </div>
        )}

      </div>
    </div>
  );
};

export default BannerEmpreender;