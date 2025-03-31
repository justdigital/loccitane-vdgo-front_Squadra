"use client";

import React, { useState, useEffect, useRef } from 'react';
import css from './style.module.scss';
import ISectionLargeVideo from '@/interfaces/section-video';

interface LargeVideoSectionProps {
  sectionData: ISectionLargeVideo;
  className?: string;
}

const LargeVideoSection: React.FC<LargeVideoSectionProps> = ({ sectionData }) => {
  const [videoUrl, setVideoUrl] = useState<string>(sectionData.videosUrls.urlDesktop);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [liked, setLiked] = useState(false); //Controlar like
  const [isMuted, setIsMuted] = useState(true); // Começa mudo por padrão

  useEffect(() => {
    const handleVideoUrl = () => {
      const mobileCheck  = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setVideoUrl(mobileCheck ? sectionData.videosUrls.urlMobile : sectionData.videosUrls.urlDesktop);
    };

    handleVideoUrl();
    window.addEventListener('resize', handleVideoUrl);

    return () => {
      window.removeEventListener('resize', handleVideoUrl);
    };
  }, [sectionData.videosUrls.urlMobile, sectionData.videosUrls.urlDesktop]);

  const handleVideoClick = () => {
    if (!isMobile) return;
    
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
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={`${css['section-container']} px-8 py-8`}>
      <div className='container'>
        {sectionData.text && (
          <div
            dangerouslySetInnerHTML={{ __html: sectionData.text }}
          />
        )}
        <hr className="w-[65px] h-1 mx-auto my-[22px] bg-[#C02031]"></hr>
        <div className={`relative`}>
          <video
            ref={videoRef}
            className="bg-black rounded-[20px] sm:block sm:w-full sm:rounded-none min-h-[260px] sm:min-h-[unset]"
            controls={!isMobile} // Controles apenas no mobile
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onClick={handleVideoClick}
            muted={isMuted} // Controla o estado mudo
            src={videoUrl}
            poster={sectionData.videosUrls.posterImage} // Imagem antes do click
            aria-label={sectionData.videosUrls.altText || 'Vídeo'} // Texto alternativo
          >
            Seu navegador não suporta vídeos HTML5.
          </video>


          {/* Botão de curtir */}
          <button 
            className={`${css['btn-svg']} absolute top-5 right-4 bg-black/30 rounded-full p-2 backdrop-blur-sm`}
            aria-label={liked ? "Descurtir vídeo" : "Curtir vídeo"}
            onClick={() => setLiked(!liked)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24"
              fill={liked ? "#C02031" : "#FFFFFF"}
              stroke={liked ? "#C02031" : "#FFFFFF"}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          {/* Botão de compartilhar */}
          <button 
            className={`${css['btn-svg']} absolute top-20 right-4 bg-black/30 rounded-full p-2 backdrop-blur-sm`}
            aria-label="Compartilhar vídeo"
            onClick={() => {}}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          {/* Botão Mudo */}
          <button
              onClick={toggleMute}
              className={`${css['btn-svg']} absolute bottom-8 right-2.5 bg-black/10 rounded-full p-2`}
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? (
                <VolumeOffIcon className="w-8 h-8" />
              ) : (
                <VolumeUpIcon className="w-8 h-8" />
              )}
            </button>

        </div>
      </div>
    </div>
  );
};

const VolumeUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

export default LargeVideoSection;