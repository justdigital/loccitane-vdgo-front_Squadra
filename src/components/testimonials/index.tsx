'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import css from './style.module.scss';
import ISectionTestimonials from '@/interfaces/section-testimonials';
import { sendGTMEvent } from "@next/third-parties/google";

interface TestimonialsProps {
  sectionData: ISectionTestimonials;
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ sectionData }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const touchPositionRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  useEffect(() => {
    gsap.registerPlugin(Flip);
    /* Força o click para aparecer UM primeiro slide */
    const requestId = requestAnimationFrame(() => {
      if (prevButtonRef.current) {
        prevButtonRef.current.setAttribute('data-programmatic-click', 'true');
        prevButtonRef.current.click();
      }
    });
    return () => cancelAnimationFrame(requestId);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchPositionRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPositionRef.current;
    if (touchDown === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;


    if (diff > 10) {
      touchPositionRef.current = null;
      if (nextButtonRef.current) {
        nextButtonRef.current.click();
      }
      return;
    }

    if (diff < -10) {
      if (prevButtonRef.current) {
        prevButtonRef.current.click();
      }
      return;
    }
  };

  const moveItem = (direction: number) => {
    direction = direction || 1;
    const slider = sliderRef.current;
    
    if (!slider) return;
    
    const items = gsap.utils.toArray<HTMLElement>(`.${css.item}`, slider);
    const state = Flip.getState(items, { props: 'transform, opacity' });

    const item = (direction === 1)
      ? slider.lastElementChild
      : slider.firstElementChild;
    
    if (!item) return;
    
    const clone = item.cloneNode(true) as HTMLElement;
    delete (clone as any).dataset.flipId;

    item.setAttribute('style', 'display: none');

    if (direction === -1) {
      slider.classList.add(css.sliderBackward);
      clone.setAttribute('aria-hidden', 'false');
      slider.append(clone);
      if (clone.previousElementSibling) {
        clone.previousElementSibling.setAttribute('aria-hidden', 'true');
      }
    } else {
      slider.classList.add(css.sliderForward);
      clone.setAttribute('aria-hidden', 'true');
      slider.prepend(clone);
      if (item.previousElementSibling) {
        item.previousElementSibling.setAttribute('aria-hidden', 'false');
      }
    }
    
    Flip.from(state, {
      targets: `.${css.item}`,
      ease: "sine.inOut",
      duration: 1.2,
      absoluteOnLeave: true,
      scale: true,
      onEnter: (elements) => {
        return gsap.from(elements, {
          opacity: () => direction === 1 ? 1 : 0,
          scale: () => direction === 1 ? 1 : .8,
          yPercent: () => direction === 1 ? 20 : 40,
          ease: "sine.inOut",
          //duration: 0.6
        });
      },
      onLeave: (elements) => {
        const tl = gsap.timeline();
        tl.to(elements, {
          yPercent: 20,
          opacity: 0,
          ease: "sine.inOut",
          //duration: 0.6,
          onComplete: () => {
            if (elements[0].parentNode === slider) {
              slider.removeChild(elements[0]);
            }
          }
        });
        return tl;
      },
      onComplete: () => {
        slider.classList.remove(css.sliderForward);
        slider.classList.remove(css.sliderBackward);
      }
    });
  };
  
  /* Datalayer */
  const toggleSlide = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSlideClick = (
    index: number
  ) => {
    const visibleCard = document.querySelector(`.${css.item}[aria-hidden="false"]`);
    const cardName = visibleCard?.querySelector(`.${css.textName}`)?.textContent;
    const isProgrammaticClick = prevButtonRef.current?.getAttribute('data-programmatic-click') === 'true';

    if (!isProgrammaticClick) {
      sendGTMEvent({
        'section_name': 'depoimentos',
        'content_type': `depoimento_${index + 1}`,
        'content_text': cardName || 'Nome',
      });
    }
    prevButtonRef.current?.removeAttribute('data-programmatic-click');
  };

  return (
    <div 
      id='testimonials'
      className={`${css.sectionContainer} md:px-8 py-4 sm:py-10`}
    >
      <div className={`container mx-auto w-full relative`}>
        {sectionData.text && (
          <div dangerouslySetInnerHTML={{ __html: sectionData.text || ''}} />
        )}
        
        <hr className="w-[65px] h-1 mx-auto mt-6 mb-[4.5rem] sm:mb-20 bg-[#C02031]" />
        
        {/* Slide */}
        <div 
          className={css.sliderContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className={css.slider} ref={sliderRef}>
            {sectionData.cardItems.map((card, index) => (
              <div 
                className={`${css.item} ${index === 0 ? '' : css.itemHidden}`} 
                aria-hidden={index !== 0 ? "true" : "false"}
                key={index}
              >
                <div className={`${css.card} flex flex-col justify-end text-center items-center px-3 py-7 sm:px-12 sm:py-3`}>
                  {/* Foto */}
                  <div className="absolute -top-14">
                    {card.imagesUrls && (
                      <picture>
                        <source 
                          media="(max-width: 104px)" 
                          srcSet={card.imagesUrls.desktop}
                        />
                        <img 
                          src={card.imagesUrls.mobile}
                          alt={`Imagem do card`}
                          className="w-[83px] h-[83px] sm:w-[104px] sm:h-[104px] rounded-[100%] object-cover hover:scale-110 transition-transform duration-200"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    )}
                  </div>

                  {/* Nome */}
                  <div className={css.textName}>
                    {card.textName}
                  </div>

                  {/* Estrela */}
                  <div className='flex items-center pt-1 pb-[10px]'
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const ratingValue = parseFloat(String(card.qualification || 0));
                      const isWholeStar = ratingValue >= star;
                      const isPartialStar = ratingValue > star - 1 && ratingValue < star;
                      const fillPercentage = isPartialStar ? (ratingValue - (star - 1)) * 100 : 0;

                      return (
                        <div key={star} className="relative inline-block mr-[2px]">
                          <StarBorderIcon 
                            style={{
                              fontSize: "26px",
                              position: 'relative',
                              zIndex: 1,
                              color: '#848484a3',
                              left: 2,
                            }}
                          />
                          {(isWholeStar || isPartialStar) && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 4,
                              width: isWholeStar ? '100%' : `${fillPercentage}%`,
                              height: '100%',
                              overflow: 'hidden',
                              zIndex: 2,
                            }}>
                              <StarIcon 
                                style={{
                                  fontSize: "23.5px",
                                  color: '#FFDD6B',
                                  stroke: '#FF0F0F',
                                  strokeWidth: 1.5,
                                  backgroundColor: '#FFFFFF',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Descrição */}
                  <div className={css.description}>
                    {card.text && <div dangerouslySetInnerHTML={{ __html: card.text }} />}
                  </div>

                  {/* Data */}
                  <div className={css.textDate}>
                    {card.textDate}
                  </div>
                    
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setas */}
        <div 
          ref={prevButtonRef}
          className={`${css.customPrev} absolute top-1/2 z-10 cursor-pointer max-sm:hidden`}
          onClick={() => {
            moveItem(-1);
            const prevIndex = activeIndex === 0 ? sectionData.cardItems.length - 1 : (activeIndex || 1) - 1;
            toggleSlide(prevIndex);
            handleSlideClick(prevIndex);
          }}
        >
          <NavigateBeforeIcon 
            style={{
              color: "#C02031",
              width: "38px",
              height: "38px",
              border: "2px solid",
              borderRadius: "50%",
            }}
          />
        </div>

        <div 
          ref={nextButtonRef}
          className={`${css.customNext} absolute top-1/2 z-10 cursor-pointer max-sm:hidden`}
          onClick={() => {
            moveItem(1);
            const nextIndex = ((activeIndex || 0) + 1) % sectionData.cardItems.length;
            toggleSlide(nextIndex);
            handleSlideClick(nextIndex);
          }}
        >
          <NavigateNextIcon 
            style={{
              color: "#C02031",
              width: "38px",
              height: "38px",
              border: "2px solid",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;