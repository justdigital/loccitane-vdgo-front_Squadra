"use client";
import 'swiper/css';
import css from './style.module.scss';
import ISectionAccordion from '@/interfaces/section-accordion';
import { useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { getPlainText, sendDataLayerEvent } from '@/utils/general.util';

interface AccordionProps {
  sectionData: ISectionAccordion;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ sectionData }) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSlideClick = (
    cardData: { title?: string, text?: string },
    index: number
  ) => {

    sendDataLayerEvent({
      'event': 'select_content',
      'section_name': 'faq',
      'content_type': `faq_${index + 1}`,
      'content_text': getPlainText(cardData.title),
    });
  };

  return (
    <div id='accordion' className={`${css.sectionContainer} py-8 border-x-4`}>
      <div className='container'>
        {/* Título */}
        <div className={`${css.accordionBottom} mx-auto w-full`}>
          {sectionData.text && (
            <div dangerouslySetInnerHTML={{ __html: sectionData.text }} />
          )}
        </div>

        <hr className="w-[65px] h-1 mx-auto my-[22px] bg-[#C02031]" />

        {/* Itens */}
        <div className={`${css.accordionItens}`}>
          {sectionData.accordionItem.map((accordion, index) => (            
            <div 
              className={`${css.accordion} ${activeIndex === index ? css.active : ''}`}
              onClick={() => {
                toggleAccordion(index);
                handleSlideClick(accordion, index);
              }}
              key={index}>
              {accordion.title && (
                <button 
                  className={`${css.accordionButton}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: accordion.title || '' }} />
                  <span className={css.iconContainer}>
                    {activeIndex === index ? (
                      <Remove className={css.accordionIcon} />
                    ) : (
                      <Add className={css.accordionIcon} />
                    )}
                  </span>
                </button>
              )}
              
              {accordion.text && (
                <div 
                  className={`${css.panel} truncate`} 
                  style={{ 
                    maxHeight: activeIndex === index ? '1000px' : '0',
                  }}
                >
                  <hr className="w-full h-[1px] my-3 bg-[#C8C5C5]" />
                  <div
                    className="inline-block max-w-full whitespace-normal py-3"
                    dangerouslySetInnerHTML={{ __html: accordion.text }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;