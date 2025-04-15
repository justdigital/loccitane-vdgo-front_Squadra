"use client";

import React from 'react';
import ButtonDefault from '../commons/button-default';
import Image from 'next/image';
import SectionsTitle from '../commons/sections-title';
import ISectionBannerOrderExplain from '@/interfaces/section-banner-order-explain';
import useWindowWidth from '@/hooks/useWindowWidth';

const BannerOrderExplain = (props: {
  sectionData: ISectionBannerOrderExplain
}) => {
  const { sectionData } = props;
  const windowWidth = useWindowWidth() || 0;
  const isMobile = windowWidth < 640;

  return (
    <div className="bg-[#F6F7F7] lg:pb-6">
      <div className='container flex flex-col lg:flex-row justify-between items-start'>
        <div className="flex flex-col lg:w-5/12 pt-[29px] pb-[36px] lg:p-0 w-full  order-2 lg:order-1 relative">
          <SectionsTitle title={sectionData.text} leftAligned={!isMobile} />

          <div>
            <Image className='lg:hidden float-left mr-[14px] relative top-[4px] object-cover' width={158} height={107} src={isMobile? sectionData.imagesUrls.mobile : sectionData.imagesUrls.desktop} alt="image-banner-order-explain" style={{
              width: "158px",
              height: "116px",
            }}/>
            <p dangerouslySetInnerHTML={{ __html: sectionData.textDescription }} />
          </div>
          <div className='mx-auto lg:mx-0 mt-[20px]'>
            <ButtonDefault
              style={{ 
                padding: "7px 20px", 
                width: isMobile? "230px" : "337px",
                height: isMobile? "50px" : "60px"
              }}
              label={sectionData.linkTitle}
              rel="noopener noreferrer"
              aria-label={`${sectionData.linkTitle} (opens in new tab)`}
              href={sectionData.linkUrl}
              eventData={{
                eventName: 'cta_interaction',
                sectionName: 'fazer_pedido',
                ctaName: sectionData.linkTitle,
                customData: {
                  // outros dados
                }
              }}
            />
          </div>
        </div>
        <div className="hidden lg:block lg:w-6/12 w-[158px] h-auto order-1 lg:order-2 relative">
          <Image src={isMobile? sectionData.imagesUrls.mobile : sectionData.imagesUrls.desktop} width={158} height={158} alt="image-banner-order-explain" className='w-full h-auto' />
        </div>
      </div>
    </div>
  )
}

export default BannerOrderExplain;