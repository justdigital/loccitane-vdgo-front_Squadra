"use client";

import React, { useState, useEffect, useRef } from 'react';
import css from './style.module.scss';
import ISectionLargeVideo from '@/interfaces/section-video';
import { useAppContext } from '@/contexts/app.context';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
import VideoComponent, { VideoComponentRefType } from '../commons/video';
import useIsInViewport from '@/hooks/useIsInViewport_';

interface LargeVideoSectionProps {
  sectionData: ISectionLargeVideo;
  className?: string;
}

const LargeVideoSection: React.FC<LargeVideoSectionProps> = ({ sectionData }) => {
  const { isMobileScreen: isMobile } = useAppContext();

  const { isInViewport, elementRef } = useIsInViewport({
    root: null, // Use o viewport como referência
    rootMargin: "0px", // Margem ao redor do viewport
    threshold: 0.3, // Percentual visível para considerar "dentro da viewport"
  });

  const [videoUrl, setVideoUrl] = useState<string>(sectionData.videosUrls.urlDesktop);
  const videoRef = useRef<VideoComponentRefType>(null);
  const [isMuted, setIsMuted] = useState(true); // Começa mudo por padrão
  const [isPaused, setIsPaused] = useState(true); // Começa pausado
  const hasResetOnUnmute = useRef(false); // Novo ref para controle

  const onVideoVideoPause = () => {
    setIsPaused(true);
  };

  const onVideoVideoPlay = () => {
    setIsPaused(false);
  };

  const onVideoVolumeChange = (e: any, volume: number, muted: boolean) => {
    setIsMuted(muted);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.togglePlay();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current.videoNativeElement;
      const wasMuted = videoElement.muted;
      videoElement.muted = !wasMuted;
      setIsMuted(!wasMuted);
  
      if (isMobile && wasMuted && !hasResetOnUnmute.current) {
        videoElement.currentTime = 0; // Volta para o início
        hasResetOnUnmute.current = true;
        videoElement.play(); // inicia a reprodução ao desmutar
      }
    }
  };
  
  useEffect(() => {
    setVideoUrl(isMobile ? sectionData.videosUrls.urlMobile : sectionData.videosUrls.urlDesktop);
    hasResetOnUnmute.current = false; // Resetar ao mudar de vídeo ou tamanho de tela
  }, [isMobile]);

  // Coloca o player no mudo quando o elemento sai da viewport
  useEffect(() => {
    if (!isInViewport) {
      setIsMuted(true);
    }
  }, [isInViewport]);

  return (
    <div id='large-video' className={`${css['section-container']} py-8`}>
      <div className='container'>
        {sectionData.text && (
          <div dangerouslySetInnerHTML={{ __html: sectionData.text }} />
        )}
        <hr className="w-[65px] h-1 mx-auto my-[22px] bg-[#C02031]" />
        
        <div className={`relative z-0`} ref={elementRef as any}>
          <VideoComponent
            ref={videoRef}
            videoText={sectionData.videosUrls.altText}
            autoPlay={isMobile}
            className="rounded-[20px] sm:block sm:w-full sm:rounded-none min-h-[260px] sm:min-h-[unset] xl:max-h-[607px]"
            loop
            playsInline
            muted={isMuted}
            controls={!isMobile}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            src={videoUrl} 
            poster={sectionData.videosUrls.posterImage} // Imagem antes do click
            aria-label={sectionData.videosUrls.altText || 'Vídeo'} // Texto alternativo
            onVideoClick={handleVideoClick}
            onVideoPause={onVideoVideoPause}
            onVideoPlay={onVideoVideoPlay}
            onVideoVolumeChange={onVideoVolumeChange}
          />

          {sectionData.textTranscription && ((isMobile && isMuted) || (!isMobile && isPaused)) &&(
            <div
              className={`${css['transcription']} absolute bottom-9 left-7 md:bottom-28 md:left-1/2 md:-translate-x-1/2 text-white`}
              dangerouslySetInnerHTML={{ __html: `<span>,,</span>${sectionData.textTranscription}` }}
            />
          )}

          {/* Botão de curtir */}
          <LikeButton
            className={`${css['btn-svg']} absolute top-5 right-4`}
            videoTitle={sectionData.textTranscription || ''}
            videoUrl={videoUrl || ''}
            sectionName="video_largo_lp1"
          />

          {/* Botão de compartilhar */}
          {/* <button 
            className={`${css['btn-svg']} absolute top-20 right-4 bg-black/30 rounded-full p-2 backdrop-blur-sm`}
            aria-label="Compartilhar vídeo"
            onClick={() => {}}
          >
            <ReplyIcon 
              className="w-8 h-8" 
              style={{ 
                transform: "scaleX(-1) rotate(360deg)",
                color: "#FFFFFFFF"
              }} 
            />
          </button> */}

          {/* Botão Mudo */}
          <MuteButton onClick={toggleMute} isMuted={isMuted} className={`${css['btn-svg']} absolute bottom-8 right-2.5`} />
        </div>
      </div>
    </div>
  );
};
export default LargeVideoSection;