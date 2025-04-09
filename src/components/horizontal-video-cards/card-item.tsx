'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from './style.module.scss';
import ISectionHorizontalCards from '@/interfaces/section-horizontal-cards';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
import { useAppContext } from '@/contexts/app.context';
import Image from 'next/image';
// import Video from '../commons/video';

type ProgressTracked = {
  '10%': boolean;
  '25%': boolean;
  '50%': boolean;
  '75%': boolean;
};

interface CardItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ISectionHorizontalCards['cardItems'][number];
  openModal: (videoUrl: string) => void;
}

const CardItem: React.FC<CardItemsProps> = ({ item, openModal, ...props }) => {

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
    const hasResetOnUnmute = useRef(false); // Novo ref para controle
  const { isMobileScreen: isMobile } = useAppContext();
  const isVideoCard = !item.cardTypeImage;
  const videoUrl = isMobile ? item.videosUrls?.urlMobile : item.videosUrls?.urlDesktop;


  const [progressTracked, setProgressTracked] = useState<ProgressTracked>({
      '10%': false,
      '25%': false,
      '50%': false,
      '75%': false
    });
  
  // Funções de tracking
  const pushToDataLayer = useCallback((eventName: string, progress?: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      video_title: item.videosUrls?.altText || 'Vídeo sem título',
      video_url: videoUrl,
      page_url: window.location.href,
      ...(progress && { video_progress: progress })
    });
  }, [item.videosUrls?.altText, videoUrl]);
  
  // Handlers de eventos do vídeo
  const handleVideoStart = useCallback(() => {
    if (!isMobile) pushToDataLayer('video_start');
  }, [isMobile, pushToDataLayer]);

  const handleVideoProgress = useCallback(() => {
    if (!videoRef.current) return;
    
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;

    const checkProgress = (percent: number, key: keyof ProgressTracked) => {
      if (progress >= percent && !progressTracked[key]) {
        setProgressTracked(prev => ({ ...prev, [key]: true }));
        pushToDataLayer('video_progress', key);
      }
    };

    checkProgress(10, '10%');
    checkProgress(25, '25%');
    checkProgress(50, '50%');
    checkProgress(75, '75%');
  }, [progressTracked, pushToDataLayer]);
  
  const handleVideoEnd = useCallback(() => {
    pushToDataLayer('video_complete');
    setProgressTracked({
      '10%': false,
      '25%': false,
      '50%': false,
      '75%': false
    });
  }, [pushToDataLayer]);

  const handleVideoClick = () => {
    //if (!isMobile) return;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const wasMuted = videoRef.current.muted;
      videoRef.current.muted = !wasMuted;
      setIsMuted(!wasMuted);
  
      if (isMobile && wasMuted && !hasResetOnUnmute.current) {
        videoRef.current.currentTime = 0; // Volta para o início
        hasResetOnUnmute.current = true;
        // videoRef.current.play(); // inicia a reprodução ao desmutar
      }

      if (wasMuted) {
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Event listeners de vídeo
    videoElement.addEventListener('play', handleVideoStart);
    videoElement.addEventListener('timeupdate', handleVideoProgress);
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('play', handleVideoStart);
      videoElement.removeEventListener('timeupdate', handleVideoProgress);
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [
    handleVideoStart,
    handleVideoProgress,
    handleVideoEnd
  ]);

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
            // <Video
            //   videoText={item.videosUrls?.altText}
            //   className="w-[90dvw] sm:w-[60dvw] h-auto"
            //   loop
            //   playsInline
            //   autoPlay={isMobile}
            //   muted={isMuted}
            //   controls={false}
            //   controlsList="nodownload nofullscreen noremoteplayback"
            //   disablePictureInPicture
            //   src={videoUrl} 
            //   poster={isMobile ? item.imagesUrls?.mobile : item.imagesUrls?.desktop}
            //   aria-label="Vídeo"
            //   onClick={handleVideoClick}
            // />
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
              onClick={handleVideoClick}
            >
                Seu navegador não suporta vídeos HTML5.
            </video>
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

        {isVideoCard && (
          <div className='action-buttons'>

            {item.videosUrls?.altText && isMuted && (
              <div
                className={`${css['video-transcription']} w-[70%] absolute z-[3] bottom-8 left-5 text-white`}
                dangerouslySetInnerHTML={{ __html: `${item.videosUrls?.altText}` }}
              />
            )}

            <LikeButton className="absolute top-5 right-4 z-[3] sm:hidden" />
            <MuteButton onClick={() => toggleMute()} isMuted={isMuted} className={`absolute bottom-8 right-2.5 z-[3] sm:hidden`} />
          </div>
        )}
      </div>
    </a>
  );
}

export default CardItem;