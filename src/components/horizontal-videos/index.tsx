'use client';
import React, { useEffect, useState } from 'react';
import css from './style.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import SectionsTitle from '../commons/sections-title';
import ISectionHorizontalVideos from '@/interfaces/section-horizontal-videos';
import VideoComponent from '../commons/video';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
import ButtonDefault from '../commons/button-default';
import TextOverlap from '../commons/text-overlap';
import useIsInViewport from '@/hooks/useisInViewport';
// import TinySlider from "tiny-slider-react";
// import 'tiny-slider/dist/tiny-slider.css';

interface HorizontalVideosSectionProps {
  sectionData: ISectionHorizontalVideos
}

const HorizontalVideosSection: React.FC<HorizontalVideosSectionProps> = ({sectionData}) => {

  const [, setSwiper] = useState<SwiperClass>({} as SwiperClass);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardItems, setCardItems] = useState(sectionData.cardItems);

  const { isInViewport, elementRef } = useIsInViewport({
    root: null, // Use o viewport como referência
    rootMargin: "0px", // Margem ao redor do viewport
    threshold: 0.5, // Percentual visível para considerar "dentro da viewport"
  });
  const handleVideoClick = () => {
    setIsPaused(!isPaused);
  };


  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (isMuted) {
      setIsPaused(false);
    }
  };


  // Coloca o player no mudo quando o elemento sai da viewport
  useEffect(() => {
    if (!isInViewport) {
      console.log("FORA DA VISUALIZACAO")
      toggleMute(); 
    }
  }, [isInViewport]);

  // const gotoSlide = (index: number) => {
  //   // if (swiper) {
  //   //   console.log('vai pro slide:', index);
  //   //   swiper.slideTo(index, 300, false);
  //   // }
  // };

  // const settings = {
  //   prevButton: false,
  //   controls: false,
  //   lazyload: true,
  //   nav: false,
  //   mouseDrag: true,
  //   // items: 5,
  //   loop: true,
  //   // fixedWidth: 301,
  //   center: true,
  //   gutter: 5,
  //   responsive: {
  //     0: {
  //       items: 1.5,
  //       gutter: 5,
  //     },
  //     600: {
  //       items: 5,
  //       gutter: 10,
  //     }
  //   }
  // };

  useEffect(() => {
    if (cardItems.length > 7) {
      return;
    }

    const rest = 8 - cardItems.length;
    const newCardItems = [...cardItems, ...sectionData.cardItems.splice(0, rest)];
    setCardItems(newCardItems);
  }, [cardItems]);

  return (
    <div id='horizontal-video' className={`${css['section-wrapper']} py-10`}>
      <div className="container p-6">
        <SectionsTitle title={sectionData.title} subtitle={sectionData.subtitle} />
      </div>

      <div ref={elementRef} className={`${css['slider-wrapper']} mt-5 sm:mt-10`}>
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={15}
          slidesPerView={1.35}
          centeredSlides={false}
          loop={true}
          breakpoints={{
            600: {
              loop: true,
              slidesPerView: 4.1,
              spaceBetween: 10,
              centeredSlides: true
            },
            1800: {
              loop: true,
              slidesPerView: 6.5,
              spaceBetween: 10,
              centeredSlides: true
            }
          }}
          // onSlideChange={() => console.log('slide change')}
        >
        {/* <TinySlider settings={settings}> */}
          {cardItems.map((item, index) => (
            <SwiperSlide key={index}>
              {({isActive}) => {
                if(isActive && isInViewport){
                  console.log('isActive', index);
                }
                return(
                <div key={index}>
                  <div className={`${css['video-item']} relative`}>
                    <VideoComponent
                      // ref={videoRef}
                      className=""
                      videoText={item.text}
                      loop
                      playsInline
                      doPlay={isActive && !isPaused}
                      muted={isMuted}
                      controls={false}
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      src={item.videosUrls?.urlMobile || item.videosUrls?.urlDesktop} 
                      aria-label={`Vídeo "${item.text}"`}
                      onVideoClick={handleVideoClick}
                    />

                    <div className={`${css['action-buttons']}`}>
                      {item.text && (
                        <TextOverlap>
                          <div
                            className={`${css['video-transcription']} w-[70%] absolute z-[3] bottom-8 left-5 text-white`}
                            dangerouslySetInnerHTML={{ __html: `${item.text}` }}
                          />
                        </TextOverlap>
                      )}

                      {isActive && (
                        <>
                          <LikeButton
                            className="absolute top-5 right-4 z-[3]"
                            videoTitle={item.videosUrls?.altText || ''}
                            videoUrl={item.videosUrls?.urlMobile || item.videosUrls?.urlDesktop || ''}
                            sectionName="videos_horizontais_lp2"
                          />
                          <MuteButton className={`absolute bottom-8 right-2.5 z-[3]`} isMuted={isMuted} onClick={() => toggleMute()} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}}
            </SwiperSlide>
          ))}
        {/* </TinySlider> */}
        </Swiper>
      </div>

      <div className="container p-6">
        <div className="w-full sm:w-[80%] mx-auto">
          <div className="mt-10" dangerouslySetInnerHTML={{__html: sectionData.text1}}></div>
          <div className="mt-5" dangerouslySetInnerHTML={{__html: sectionData.text2}}></div>

          <ButtonDefault className="mx-auto mt-5 block" label={sectionData.buttonTitle} href={sectionData.buttonLinkUrl} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideosSection;