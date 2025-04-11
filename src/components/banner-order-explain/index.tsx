import React from 'react';
import ButtonDefault from '../commons/button-default';
import Image from 'next/image';
import SectionsTitle from '../commons/sections-title';
import ISectionBannerOrderExplain from '@/interfaces/section-banner-order-explain';

const BannerOrderExplain = (props: {
  sectionData: ISectionBannerOrderExplain
}) => {
  const { sectionData } = props;

  return (
    <div className="bg-[#f7e4d2] pb-6">
      <div className='container flex flex-col lg:flex-row justify-between items-start'>
        <div className="flex flex-col lg:w-5/12 px-[17px] py-[36px] lg:p-0 w-full  order-2 lg:order-1 relative">
          {/* <div className='w-[220px] lg:w-auto mx-auto lg:mx-0 text-center lg:text-start leading-[100%]'
            dangerouslySetInnerHTML={{ __html: sectionData.text }}
          />
          <div className="w-[65px] border-b-[3px] border-[#C02031] my-5 mx-auto lg:mx-0" /> */}
          <SectionsTitle title={sectionData.text} leftAligned />

          <div>
            <Image className='lg:hidden float-left h-auto mr-[14px]' width={158} height={158} src={sectionData.imagesUrls.desktop} alt="image-banner-order-explain" />
            <p dangerouslySetInnerHTML={{ __html: sectionData.textDescription }} />
          </div>
          <div className='mx-auto lg:mx-0 mt-[20px]'>
            <ButtonDefault
              style={{ padding: "7px 20px" }}
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
        <div className="hidden lg:block lg:w-5/12 w-[158px] h-auto order-1 lg:order-2 relative">
          <Image src={sectionData.imagesUrls.desktop} width={158} height={158} alt="image-banner-order-explain" className='w-full h-auto' />
        </div>
      </div>
    </div>
  )
}

export default BannerOrderExplain;