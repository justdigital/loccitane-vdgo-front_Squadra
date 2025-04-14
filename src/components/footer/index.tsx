"use client";
import 'swiper/css';
import css from './style.module.scss';
import ISectionFooter from '@/interfaces/section-footer';
import { getPlainText, sendDataLayerEvent } from '@/utils/general.util';

interface FooterProps {
  sectionData: ISectionFooter;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ sectionData }) => {

  const handleSlideClick = (cardData: { text?: string, linkUrl?: string, buttonLink?: string }) => {
    sendDataLayerEvent({
      'event': 'click_content',
      'section_name': 'footer',
      'content_text': getPlainText(cardData?.text) || cardData?.linkUrl || cardData?.buttonLink || 'Título',
    });
  };

  return (
    <footer id='footer' className={`${css.sectionContainer} py-8 border-x-4`}>
      {/* Colunas */}
      <div className={`${css.footerContainer} container`}>
        <div className={`${css.footerItens}`}>
          {sectionData.cardItems.map((card, index) => (
            <div 
              className={`${css.columnContent}`} 
              onClick={() => card.buttonLink && (handleSlideClick(card), window.open(card.buttonLink, '_self'))}
              key={index}
            >
              {card.imagesUrls && (
                <picture>
                  <source media="(min-width: 768px)" srcSet={card.imagesUrls.desktop} />
                  <img 
                    src={card.imagesUrls.mobile}
                    alt={card.linkTitle || `Card ${index + 1}`}
                    className="object-cover hover:scale-110 transition-transform duration-200"
                  />
                </picture>
              )}
              {card.text && (
                <div 
                  className={`${css.columnText}`}
                  dangerouslySetInnerHTML={{ __html: card.text }} />
              )}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div 
          className={`${css.footerImage}`} 
          onClick={() => sectionData.buttonLink && (handleSlideClick({ buttonLink: sectionData.buttonLink }), window.open(sectionData.buttonLink, '_self'))}
        >
          {sectionData.imagesUrls && (
            <picture>
              <source media="(min-width: 768px)" srcSet={sectionData.imagesUrls.desktop} />
              <img
                src={sectionData.imagesUrls.mobile}
                alt={sectionData.buttonLinkTitle}
                className="w-[167px] h-[167px] object-cover hover:scale-110 transition-transform duration-200"
              />
            </picture>
          )}
        </div>

        {/* Descrição */}
        <div className={`${css.footerBottom} mx-auto w-full`}>
          {sectionData.textDescription && (
            <div dangerouslySetInnerHTML={{ __html: sectionData.textDescription }} />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;