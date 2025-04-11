"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import css from './style.module.scss';
import ButtonDefault from '../commons/button-default';
//import { usePathname } from 'next/navigation';
import ISectionVerticalRectangularCard from '@/interfaces/section-vertical-rectangular-card';
import Image from 'next/image';
import SectionsTitle from '../commons/sections-title';
import { sendGTMEvent } from '@next/third-parties/google';
import { getPlainText } from '@/utils/general.util';
interface VerticalRectangularCardProps {
  sectionData: ISectionVerticalRectangularCard;
  className?: string;
}

const VerticalRectangularCard: React.FC<VerticalRectangularCardProps> = ({ sectionData }) => {
/*
  const pathname = usePathname();
  const isLandingPage1 = pathname.includes('/lp1');

  const handleButtonClick = (url?: string) => {
    if (!url) return;
    
    if (isLandingPage1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
*/

  const handleSlideClick = (cardData: { text?: string, linkUrl?: string }) => {
      //const visibleCard = document.querySelector(`.${css.btnIcon}[aria-hidden="false"]`);
      //const cardName = visibleCard?.querySelector(`.${css.linkUrl}`)?.textContent;

      sendGTMEvent({
        'event': 'select_content',
        'section_name': 'cards_informativos',
        'content_type': 'card_info',
        //'content_text': cardName || 'Título',
        'content_text': getPlainText(cardData.text)?.substring(0, 30) || cardData.linkUrl || 'Título',
        'page_url': window.location.href
      });
  };

  return (
    <div 
      id='vertical-rectangular-card' 
      className={`${css.sectionContainer} md:px-8 py-8`}
      style={{ backgroundColor: sectionData.bgColor }}
      >
      <div className={`container mx-auto w-full`}>
        <SectionsTitle title={sectionData.text} />
        
        {/* Slider de Cards */}
        <div className="sm:mr-0 -mr-5">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.3}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {sectionData.cardItems.map((card, index) => (
              <SwiperSlide key={index}>
                <div 
                  className={`${css.card} h-full`} 
                  onClick={() => card.linkUrl && 
                  window.open(card.linkUrl, '_self') &&  
                  handleSlideClick(card)}>

                  {card.imagesUrls && (
                    <picture>
                      <source media="(min-width: 768px)" srcSet={card.imagesUrls.desktop} />
                      <img 
                        src={card.imagesUrls.mobile}
                        alt={card.linkTitle || `Card ${index + 1}`}
                        className="w-full object-cover"
                      />
                    </picture>
                  )}
                  <div className={`${css.cardContainer}`}>
                    {card.text ? (
                      <div dangerouslySetInnerHTML={{ __html: card.text }} />
                    ) : (
                      <p>{card.linkTitle}</p>
                    )}
                  </div>
                </div>

                {/* Botão do ícone */}
                <button 
                  className={`${css.btnIcon} relative z-10 bottom-14 left-[86%] md:bottom-14`}
                  onClick={() => card.linkUrl && window.open(card.linkUrl, '_self') && handleSlideClick(card)}
                  aria-label="Abrir link"
                >
                  <Image 
                    src={ card.iconUrl || ''}
                    alt="icone"
                    width="24"
                    height="24"
                    className="w-6 h-6 object-contain hover:scale-110 transition-transform duration-200"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {sectionData.buttonLinkTitle && sectionData.buttonLink && (
          <div className="text-center">
            <ButtonDefault 
              className={`${css.buttonDefault}`}
              label={sectionData.buttonLinkTitle}
              href={sectionData.buttonLink}
              eventData={{
                eventName: 'cta_interaction',
                sectionName: 'cards_informativos',
                ctaName: sectionData.buttonLinkTitle,
                customData: {
                  // outros dados
                }
              }}
            /> 
          </div>
        )}

      </div>
    </div>
  );
};

export default VerticalRectangularCard;