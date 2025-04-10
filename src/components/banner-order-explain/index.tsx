import { ISectionBannerOrderExplain } from '@/interfaces/section-banner-order-explain';
import React from 'react';
import ButtonDefault from '../commons/button-default';

// import { Container } from './styles';

const BannerOrderExplain = (props: {
    sectionData: ISectionBannerOrderExplain
}) => {
    const { sectionData } = props;
    console.log({sectionData})
    return (
        <div className="bg-[#f7e4d2] flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:w-5/12 px-[17px] py-[36px] lg:p-0 w-full lg:ml-[108px] order-2 lg:order-1 relative">
                <div className='w-[220px] lg:w-auto mx-auto lg:mx-0 text-center lg:text-start leading-[100%]' dangerouslySetInnerHTML={{ __html: sectionData.text }} />
                <div className="w-[65px] border-b-[3px] border-[#C02031] my-5 mx-auto lg:mx-0" />
                <div>
                    <img className='lg:hidden float-left w-[158px] h-auto mr-[14px]' src={sectionData.imagesUrls.desktop} alt="image-banner-order-explain" />
                    <p dangerouslySetInnerHTML={{ __html: sectionData.textDescription }} />
                </div>
                <div className='mx-auto lg:mx-0 mt-[20px]'>
                    <a 
                    href={sectionData.link_url} 
                    // target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sectionData.link_title} (opens in new tab)`}
                    >
                    <ButtonDefault 
                        style={{padding: "7px 20px"}} 
                        label={sectionData.link_title} 
                        eventData={{
                            eventName: 'cta_interaction',
                            sectionName: 'section_banner_lp2_part_2',
                            ctaName: sectionData.link_title,
                            customData: {
                            // outros dados
                            }
                        }}
                        />
                    </a>
                </div>
            </div>
            <div className="hidden lg:block lg:w-5/12 w-[158px] h-auto order-1 lg:order-2 relative">
                <img src={sectionData.imagesUrls.desktop} alt="image-banner-order-explain" />
            </div>
        </div>
    )
}

export default BannerOrderExplain;