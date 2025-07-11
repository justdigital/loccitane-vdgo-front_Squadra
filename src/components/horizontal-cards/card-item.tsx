import React, { useEffect, useRef, useState } from 'react';
import css from './style.module.scss';
import ISectionHorizontalCards from '@/interfaces/section-horizontal-cards';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
import { useAppContext } from '@/contexts/app.context';
import Image from 'next/image';
import VideoComponent, { VideoComponentRefType } from '../commons/video';
import TextOverlap from '../commons/text-overlap';
import { getPlainText, sendDataLayerEvent } from '@/utils/general.util';
import useIsInViewport from '@/hooks/useIsInViewport_';

interface CardItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ISectionHorizontalCards['cardItems'][number];
  openModal: (videoUrl: string) => void;
  index: number;
}

const CardItem: React.FC<CardItemsProps> = ({ item, openModal, index = 0, ...props }) => {

  const { isInViewport, elementRef } = useIsInViewport({
    root: null, // Use o viewport como referência
    rootMargin: "0px", // Margem ao redor do viewport
    threshold: 0.3, // Percentual visível para considerar "dentro da viewport"
  });
  const videoRef = useRef<VideoComponentRefType>(null);
  const [isMuted, setIsMuted] = useState(true);
  const hasResetOnUnmute = useRef(false); // Novo ref para controle
  const { isMobileScreen: isMobile } = useAppContext();
  const isVideoCard = !item.cardTypeImage;
  const videoUrl = item.videosUrls?.urlMobile || item.videosUrls?.urlDesktop;

  const toggleMute = () => {
    const videoElement = videoRef?.current?.videoNativeElement;
    if (videoElement) {
      const wasMuted = videoElement.muted;
      videoElement.muted = !wasMuted;
      setIsMuted(!wasMuted);
  
      if (isMobile && wasMuted && !hasResetOnUnmute.current) {
        videoElement.currentTime = 0; // Volta para o início
        hasResetOnUnmute.current = true;
      }

      if (wasMuted) {
        videoElement.play();
      }
    }
  };

  const onVideoVolumeChange = (e: any, volume: number, muted: boolean) => {
    setIsMuted(muted);
  };

  const handleVideoClick = () => {
    videoRef.current?.togglePlay();
  };

  /* Datalayer */
  const handleCardClick = () => {
    const textPlain = (getPlainText(item.text) || item.linkUrl || 'Título').slice(0, 40); 

    const cardIndex = typeof index === 'number' ? index + 1 : 1;
    
    sendDataLayerEvent({
      'event': 'select_content',
      'section_name': 'cards_horizontais_lp1',
      'content_type': `card__${cardIndex}`,
      'content_text': textPlain,
    });
  };

  useEffect(() => {
    if (!isInViewport) {
      setIsMuted(true);
    }
  }, [isInViewport]);

  return (
    <a 
      href={item.linkUrl} 
      onClick={() => {
        //toggleSlide(index);
        handleCardClick();
      }}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div ref={elementRef as any} className={`${css['card-item']} ${isVideoCard && css['video-card']} ${props.className} flex flex-col sm:flex-row`}>
        {isVideoCard && !isMobile && (
          <div className={`${css['play-button-box']} flex items-center justify-center`} onClick={() => openModal(videoUrl || '')}>
            <PlayCircleOutlineIcon />
          </div>
        )}
        <div
          className={`${css['side-image']} ${isVideoCard && css['video-card']} ${!isVideoCard ? 'sm:w-[48%]' : 'w-full'}`}
          style={{
            '--image-desktop': `url('${item.imagesUrls?.desktop}')`,
            '--image-mobile': `url('${item.imagesUrls?.mobile}')`
          } as React.CSSProperties}>

          {isVideoCard && (
            <VideoComponent
              ref={videoRef}
              videoText={item.videosUrls?.altText}
              className="w-[90dvw] sm:w-[60dvw] h-auto sm:hidden"
              loop
              playsInline
              doPlay={isMobile}
              muted={isMuted}
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              src={videoUrl} 
              poster={isMobile ? item.imagesUrls?.mobile : item.imagesUrls?.desktop}
              aria-label="Vídeo"
              onVideoClick={handleVideoClick}
              onVideoVolumeChange={onVideoVolumeChange}
            />
          )}
        </div>

        {!isVideoCard && (
          <div className={`${css['side-text']} sm:w-[52%] sm:flex flex-col items-center justify-center flex-grow`}>
            <div dangerouslySetInnerHTML={{__html: item.text || ''}} className={'ml-2 gap-y-5 sm:gap-y-2 flex flex-col flex-grow'}></div>
            
            {item.linkUrl && item.iconUrl && (
              <div className={`text-right self-end`}>
                <Image src={item.iconUrl || ''} alt={"Ir para link"} width={22} height={22} className={`${css['icone-link']}`} />
              </div>
            )}
          </div>
        )}

        {isVideoCard && item.videosUrls?.altText && isMuted && (
          <TextOverlap>
            <div
              className={`${css['video-transcription']} w-[70%] absolute z-[3] bottom-8 left-5 text-white`}
              dangerouslySetInnerHTML={{ __html: `${item.videosUrls?.altText}` }}
            />
          </TextOverlap>
        )}
        
        {isVideoCard && (
          <div className={`action-buttons flex sm:hidden absolute h-[92%] top-5 right-4 z-[3] bg-red flex-col gap-y-2`}>
            <div className='grow flex flex-col gap-y-2'>
              <LikeButton
                className=""
                videoTitle={item.videosUrls?.altText || ''}
                videoUrl={videoUrl || ''}
                sectionName="cards_horizontais_lp1"
              />
              {/* <ShareButton
                className=""
                title={`Assista: ${item.videosUrls?.altText || ''}`}
                text={item.videosUrls?.altText || ''}
                url={videoUrl || ''}
                sectionName="cards_horizontais_lp1"
              /> */}
            </div>
            
            <MuteButton className={`bottom-8 right-2.5 z-[3] self-end justify-self-end`} isMuted={isMuted} onClick={() => toggleMute()} />
          </div>
        )}

        {/* {isVideoCard && (
          <div className='action-buttons'>

            {item.videosUrls?.altText && isMuted && (
              <TextOverlap>
                <div
                  className={`${css['video-transcription']} w-[70%] absolute z-[3] bottom-8 left-5 text-white`}
                  dangerouslySetInnerHTML={{ __html: `${item.videosUrls?.altText}` }}
                />
              </TextOverlap>
            )}

            <LikeButton
              className="absolute top-5 right-4 z-[3] sm:hidden"
              videoTitle={item.videosUrls?.altText || ''}
              videoUrl={videoUrl || ''}
              sectionName="cards_horizontais_lp1"
            />
            <MuteButton onClick={() => toggleMute()} isMuted={isMuted} className={`absolute bottom-8 right-2.5 z-[3] sm:hidden`} />
          </div>
        )} */}
      </div>
    </a>
  );
}

export default CardItem;