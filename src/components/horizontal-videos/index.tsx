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
import useIsInViewport from '@/hooks/useIsInViewport_';
import ShareButton from '../commons/share-button';

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
    threshold: 0.3, // Percentual visível para considerar "dentro da viewport"
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

  const onVideoVolumeChange = (e: any, volume: number, muted: boolean) => {
    setIsMuted(muted);
  };


  // Coloca o player no mudo quando o elemento sai da viewport
  useEffect(() => {
    if (!isInViewport) {
      setIsMuted(true);
    }
  }, [isInViewport]);

  useEffect(() => {
    if (cardItems.length > 7) {
      return;
    }

    const fillableCount = 8 - cardItems.length;
    const newCardItems = [...cardItems, ...sectionData.cardItems.reverse().splice(0, fillableCount)];
    setCardItems(newCardItems);
  }, [cardItems]);

  return (
    <div id='horizontal-video' className={`${css['section-wrapper']} py-10`}>
      <div className="container p-6">
        <SectionsTitle title={sectionData.title} subtitle={sectionData.subtitle} />
      </div>

      <div ref={elementRef as any} className={`${css['slider-wrapper']} mt-5 sm:mt-[50px]`}>
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
          {cardItems.map((item, index) => (
            <SwiperSlide key={index}>
              {({isActive}) => (
                <div key={index}>
                  <div className={`${css['video-item']} relative`}>
                    <VideoComponent
                      // ref={videoRef}
                      runsMuteOtherVideos={false}
                      className={`${(!isActive ? 'inactive' : '')}`}
                      videoText={item.text}
                      loop
                      playsInline
                      doPlay={isActive && !isPaused}
                      muted={isMuted}
                      controls={false}
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      src={item.videosUrls?.urlDesktop} 
                      aria-label={`Vídeo "${item.text}"`}
                      onVideoClick={handleVideoClick}
                      onVideoVolumeChange={onVideoVolumeChange}
                    />

                    
                    {item.text && (
                      <TextOverlap>
                        <div
                          className={`${css['video-transcription']} w-[70%] absolute z-[3] bottom-8 left-5 text-white`}
                          dangerouslySetInnerHTML={{ __html: `${item.text}` }}
                        />
                      </TextOverlap>
                    )}

                    {isActive && (
                      <div className={`${css['action-buttons']} absolute h-[92%] top-5 right-4 z-[3] bg-red flex flex-col gap-y-2`}>
                        <div className='grow flex flex-col gap-y-2'>
                          <LikeButton
                            className=""
                            videoTitle={item.videosUrls?.altText || ''}
                            videoUrl={item.videosUrls?.urlMobile || item.videosUrls?.urlDesktop || ''}
                            sectionName="videos_horizontais_lp2"
                          />
                          <ShareButton
                            className=""
                            title={`Assista: ${item.videosUrls?.altText || ''}`}
                            text={item.videosUrls?.altText || ''}
                            url={item.videosUrls?.urlMobile || item.videosUrls?.urlDesktop || ''}
                            sectionName="videos_horizontais_lp2"
                          />
                        </div>
                        
                        <MuteButton className={`bottom-8 right-2.5 z-[3] self-end justify-self-end`} isMuted={isMuted} onClick={() => toggleMute()} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
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