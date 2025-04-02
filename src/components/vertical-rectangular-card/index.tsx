"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import css from './style.module.scss';
import ButtonDefault from '../commons/button-default';
import { usePathname } from 'next/navigation';
import ISectionVerticalRectangularCard from '@/interfaces/section-vertical-rectangular-card';
interface VerticalRectangularCardProps {
  sectionData: ISectionVerticalRectangularCard;
  className?: string;
}

const VerticalRectangularCard: React.FC<VerticalRectangularCardProps> = ({ sectionData }) => {

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
  
  return (
    <div className={`${css['section-container']} md:px-8 py-8`}>
      <div className={`${css['container']} mx-auto w-full`}>
        {sectionData.text && (
          <div dangerouslySetInnerHTML={{ __html: sectionData.text }} />
        )}

        <hr className="w-[65px] h-1 mx-auto my-[22px] bg-[#C02031]" />
        
        {/* Slider de Cards */}
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
              <div className={`${css['card']} h-full`} onClick={() => card.linkUrl && window.open(card.linkUrl, '_blank')}>
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
                <div className={`${css['card-container']}`}>
                  {card.text ? (
                    <div dangerouslySetInnerHTML={{ __html: card.text }} />
                  ) : (
                    <p>{card.linkTitle}</p>
                  )}
                </div>
              </div>

              {/* Botão do ícone */}
              <button 
          className={`${css['btn-icon']} relative z-10 bottom-14 left-56 md:bottom-14 md:left-72`}
          //onClick={() => card.iconeLink && window.open(card.iconeLink, '_blank')}
          onClick={() => card.linkUrl && window.open(card.linkUrl, '_blank')}
          aria-label="Abrir link"
        >
          <img 
            src={card.iconeUrl}
            width="24"
            height="24"
            className="w-6 h-6 object-contain hover:scale-110 transition-transform duration-200"
          />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {sectionData.ButtonLinkTitle && sectionData.ButtonLink && (
          <div className="text-center">
            <ButtonDefault 
              className={`${css['button-default']}`}
              label={sectionData.ButtonLinkTitle}
              onClick={() => handleButtonClick(sectionData.ButtonLink)}
              /*
              onClick={() => {
                if (isLandingPage1) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.open(sectionData.ButtonLink, '_blank', 'noopener,noreferrer');
                }
              }}
              */
            /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalRectangularCard;