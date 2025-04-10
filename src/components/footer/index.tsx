"use client";
import 'swiper/css';
import css from './style.module.scss';
import ISectionFooter from '@/interfaces/section-footer';
//import Image from 'next/image';
import { sendGTMEvent } from '@next/third-parties/google';

interface FooterProps {
  sectionData: ISectionFooter;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ sectionData }) => {

  const handleSlideClick = (cardData: { text?: string, linkUrl?: string }) => {
    const getPlainText = (html?: string) => {
      if (!html) return null;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    };

      sendGTMEvent({
        'event': 'click_content',
        'section_name': 'footer',
        'content_text': getPlainText(cardData.text)?.substring(0, 100) || cardData.linkUrl || 'Título',
        //'cta_name': cardName || 'Nome',
        'page_url': window.location.href
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
              onClick={() => card.buttonLink && window.open(card.buttonLink, '_self') && handleSlideClick(card)}
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
        <div className={`${css.footerImage}`} onClick={() => sectionData.buttonLink && window.open(sectionData.buttonLink, '_self')}>
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