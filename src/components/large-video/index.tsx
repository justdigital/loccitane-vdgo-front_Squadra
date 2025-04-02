"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import css from './style.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import ReplyIcon from '@mui/icons-material/Reply';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ISectionLargeVideo from '@/interfaces/section-video';

interface LargeVideoSectionProps {
  sectionData: ISectionLargeVideo;
  className?: string;
}

type ProgressTracked = {
  '10%': boolean;
  '25%': boolean;
  '50%': boolean;
  '75%': boolean;
};

const LargeVideoSection: React.FC<LargeVideoSectionProps> = ({ sectionData }) => {
  const [videoUrl, setVideoUrl] = useState<string>(sectionData.videosUrls.urlDesktop);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [liked, setLiked] = useState(false); //Controlar like
  const [isMuted, setIsMuted] = useState(true); // Começa mudo por padrão
  const [isPaused, setIsPaused] = useState(true); // Começa pausado
  const hasResetOnUnmute = useRef(false); // Novo ref para controle
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
      video_title: sectionData.videosUrls.altText || 'Vídeo sem título',
      video_url: videoUrl,
      page_url: window.location.href,
      ...(progress && { video_progress: progress })
    });
  }, [sectionData.videosUrls.altText, videoUrl]);
  
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
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    const handleVideoUrl = () => {
      const mobileCheck  = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setVideoUrl(mobileCheck ? sectionData.videosUrls.urlMobile : sectionData.videosUrls.urlDesktop);
      hasResetOnUnmute.current = false; // Resetar ao mudar de vídeo ou tamanho de tela
    };

    handleVideoUrl();
    window.addEventListener('resize', handleVideoUrl);

    // Event listeners de vídeo
    videoElement.addEventListener('play', handleVideoStart);
    videoElement.addEventListener('timeupdate', handleVideoProgress);
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      window.removeEventListener('resize', handleVideoUrl);
      videoElement.removeEventListener('play', handleVideoStart);
      videoElement.removeEventListener('timeupdate', handleVideoProgress);
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [
    sectionData.videosUrls.urlMobile,
    sectionData.videosUrls.urlDesktop,
    handleVideoStart,
    handleVideoProgress,
    handleVideoEnd
  ]);

  const handleVideoClick = () => {
    //if (!isMobile) return;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
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
        videoRef.current.play(); // inicia a reprodução ao desmutar
      }
    }
  };

  return (
    <div className={`${css['section-container']} py-8`}>
      <div className='container'>
        {sectionData.text && (
          <div dangerouslySetInnerHTML={{ __html: sectionData.text }} />
        )}
        <hr className="w-[65px] h-1 mx-auto my-[22px] bg-[#C02031]" />
        
        <div className={`relative z-0`}>
          <video
            className="rounded-[20px] sm:block sm:w-full sm:rounded-none min-h-[260px] sm:min-h-[unset] xl:max-h-[607px]"
            ref={videoRef}
            autoPlay={isMobile}
            loop
            playsInline
            controls={!isMobile}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onClick={handleVideoClick}
            muted={isMuted}
            src={videoUrl}
            poster={sectionData.videosUrls.posterImage} // Imagem antes do click
            aria-label={sectionData.videosUrls.altText || 'Vídeo'} // Texto alternativo
          >
            Seu navegador não suporta vídeos HTML5.
          </video>

          {sectionData.textTranscription && ((isMobile && isMuted) || (!isMobile && isPaused)) &&(
          <div
          className={`${css['transcription']} absolute bottom-9 left-7 md:bottom-28 md:left-1/2 md:-translate-x-1/2 text-white`}
            dangerouslySetInnerHTML={{ __html: `<span>,,</span>${sectionData.textTranscription}` }}
          />
        )}

          {/* Botão de curtir */}
          <button 
            className={`${css['btn-svg']} absolute top-5 right-4 bg-black/30 rounded-[100%] p-2 backdrop-blur-sm`}
            aria-label={liked ? "Descurtir vídeo" : "Curtir vídeo"}
            onClick={() => setLiked(!liked)}
          >
            <FavoriteIcon 
              style={{
                width: "20px",
                height: "20px",
                fill: liked ? "#C02031" : "#FFFFFF",
                color: liked ? "#C02031" : "#FFFFFF"
              }}
            />
          </button>

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
          <button
              onClick={toggleMute}
              className={`${css['btn-svg']} absolute bottom-8 right-2.5 bg-black/10 rounded-full p-2 text-white`}
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? (
                <VolumeOffIcon className="w-8 h-8" />
              ) : (
                <VolumeUpIcon className="w-12 h-12" />
              )}
            </button>

        </div>
      </div>
    </div>
  );
};
export default LargeVideoSection;