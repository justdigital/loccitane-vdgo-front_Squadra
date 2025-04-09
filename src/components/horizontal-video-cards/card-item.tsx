'use client';
import React, { useRef, useState } from 'react';
import css from './style.module.scss';
import ISectionHorizontalCards from '@/interfaces/section-horizontal-cards';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
import { useAppContext } from '@/contexts/app.context';
import Image from 'next/image';

interface CardItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ISectionHorizontalCards['cardItems'][number];
  openModal: (videoUrl: string) => void;
}

const CardItem: React.FC<CardItemsProps> = ({ item, openModal, ...props }) => {

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
    const hasResetOnUnmute = useRef(false); // Novo ref para controle
  // const [isPaused, setIsPaused] = useState(true);

  const { isMobileScreen: isMobile } = useAppContext();
  const isVideoCard = !item.cardTypeImage;
  const videoUrl = isMobile ? item.videosUrl?.urlMobile : item.videosUrl?.urlDesktop;

  const toggleMute = () => {
    if (videoRef.current) {
      const wasMuted = videoRef.current.muted;
      videoRef.current.muted = !wasMuted;
      setIsMuted(!wasMuted);
  
      if (isMobile && wasMuted && !hasResetOnUnmute.current) {
        videoRef.current.currentTime = 0; // Volta para o início
        hasResetOnUnmute.current = true;
        videoRef.current.play(); // inicia a reprodução ao desmutar
      }
    }
  };

  // const onClickToPlay = useCallback(() => {
  //   if (isMobile) {
  //     videoRef.current?.play();
  //     setIsMuted(false);
  //   }
  // }, [isMobile]

  // useEffect(() => {
  //   if (isMobile) {
  //     console.log('videoRef.current?', videoRef.current);
  //     videoRef.current?.play();
  //     setIsMuted(false);
  //   }
  // }, [isMobile])

  return (
    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
      <div className={`${css['card-item']} ${isVideoCard && css['video-card']} ${props.className} flex flex-col sm:flex-row`}>
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
            <video
              ref={videoRef}
              className="w-[90dvw] sm:w-[60dvw] h-auto"
              loop
              playsInline
              autoPlay={isMobile}
              muted={isMuted}
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              src={videoUrl} 
              poster={isMobile ? item.imagesUrls?.mobile : item.imagesUrls?.desktop}
              aria-label="Vídeo"
            >
                Seu navegador não suporta vídeos HTML5.
            </video>
          )}
        </div>
        <div className={`${css['side-text']} sm:w-[52%] flex flex-col items-center justify-center flex-grow ${(isVideoCard ? 'hidden' : '')}`}>
          <div dangerouslySetInnerHTML={{__html: item.text || ''}} className={'ml-2 gap-y-5 sm:gap-y-2 flex flex-col flex-grow'}></div>
          
          {item.linkUrl && item.iconUrl && (
            <div className={`text-right self-end`}>
              <Image src={item.iconUrl || ''} alt={"Link do cartão"} width={22} height={22} className={`${css['icone-link']}`} />
            </div>
          )}
        </div>

        {isVideoCard && (
          <div className='action-buttons sm:hidden'>

            {item.text && ((isMobile && isMuted) || (!isMobile)) &&(
              <div
                className={`${css['transcription']} w-[70%] absolute z-[3] bottom-9 left-7 md:bottom-28 md:left-1/2 md:-translate-x-1/2 text-white`}
                dangerouslySetInnerHTML={{ __html: `<span>,,</span>${item.videosUrl?.altText}` }}
              />
            )}

            <LikeButton className="absolute top-5 right-4 z-[3]" />
            <MuteButton onClick={() => toggleMute()} isMuted={isMuted} className={`absolute bottom-8 right-2.5 z-[3]`} />
          </div>
        )}
      </div>
    </a>
  );
}

export default CardItem;