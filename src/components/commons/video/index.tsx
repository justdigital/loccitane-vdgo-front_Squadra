'use client';
import React, { forwardRef, RefAttributes, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { getPlainText } from '@/utils/general.util';

type ProgressTracked = {
  [key: string]: {tracked: boolean, progressName?: number, eventName: string};
  // '25%': {tracked: boolean, eventName: string};
  // '50%': {tracked: boolean, eventName: string};
  // '75%': {tracked: boolean, eventName: string};
};

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoText?: string;
  onVideoStart?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoProgress?: (e: SyntheticEvent<HTMLVideoElement, Event>, progress: number) => void;
  onVideoEnd?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoClick?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoPause?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoPlay?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  doPlay?: boolean;
}

export interface VideoComponentRefType {
  videoNativeElement: HTMLVideoElement;
  togglePlay: () => void;
}

const VideoComponent: React.FC<VideoProps & RefAttributes<any>> = forwardRef(({
  onVideoProgress,
  onVideoEnd,
  onVideoClick,
  onVideoPause,
  onVideoPlay,
  videoText,
  doPlay,
  ...props
}, ref) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [progressTracked, setProgressTracked] = useState<ProgressTracked>({
    '0': {tracked: false,  eventName: 'video_start'},
    '10': {tracked: false, eventName: 'video_progress'},
    '25': {tracked: false, eventName: 'video_progress'},
    '50': {tracked: false, eventName: 'video_progress'},
    '75': {tracked: false, eventName: 'video_progress'},
    '99': {tracked: false, progressName: 100, eventName: 'video_complete'}, //envia track de finalização do vídeo antes por conta do possível loop: true
  });

  const pushToDataLayer = useCallback((eventName: string, progress?: number) => {
    
    const eventData = {
      event: eventName,
      video_title: videoText ? getPlainText(videoText) : 'Vídeo sem título',
      video_url: props.src,
      page_url: window.location.href,
      ...(progress && { video_progress: `${progress.toFixed(0)}%`})
    };

    sendGTMEvent(eventData)
  }, [videoText, props.src]);

  const handleVideoProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!videoRef.current) return;

    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;

    Object.keys(progressTracked).forEach((key: string) => {
      const percent = parseInt(key);
      if (progress >= percent && !(progressTracked as any)[key].tracked) {
        console.log('chegou em ', progressTracked[key].progressName || percent);
        setProgressTracked(prev => ({ ...prev, [key]: {...prev[key], tracked: true} }));
        pushToDataLayer(progressTracked[key].eventName, progressTracked[key].progressName || percent);

        if (progressTracked[key].eventName === 'video_complete') {
          setTimeout(() => {
            // Object.keys(progressTracked).forEach((key) => progressTracked[key] = {...progressTracked[key], tracked: false});
            // setProgressTracked(progressTracked);
          }, 500);
        }
      }
    });
    
    if (onVideoProgress)
      onVideoProgress(e, progress);
  }

  const handleVideoEnd = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    // pushToDataLayer('video_complete');
    // Object.keys(progressTracked).forEach((key) => progressTracked[key] = {...progressTracked[key], tracked: false});
    // setProgressTracked(progressTracked);
    // setProgressTracked(prev => ({
    //   ...prev,
    //   ...{Object.keys(prev).map((key) => ({...prev[key], tracked: false}))
    // }));

    if (onVideoEnd)
      onVideoEnd(e);
  };

  const handleVideoClick = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onVideoClick)
      onVideoClick(e);
  };

  const handleVideoPause = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onVideoPause)
      onVideoPause(e);
  };

  const handleVideoPlay = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onVideoPlay)
      onVideoPlay(e);
  };

  React.useImperativeHandle(ref, () => ({
    videoNativeElement: videoRef.current,
    togglePlay: () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          return;
        }

        videoRef.current.pause();
      }
    }
    // play: () => {
    //   videoRef.current?.play();
    // },
    // pause: () => {
    //   videoRef.current?.pause();
    // },
    // toggleMute: () => {
    //   if (videoRef.current) {
    //     videoRef.current.muted = !videoRef.current.muted;
    //   }
    // }
  }));

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (doPlay) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [doPlay]);


  return (
    <video
      ref={videoRef}
      {...props}
      playsInline
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      onPlay={handleVideoPlay}
      onPause={handleVideoPause}
      onEnded={handleVideoEnd}
      onTimeUpdate={handleVideoProgress}
      // onLoadedMetadata={handleVideoStart}
      onClick={handleVideoClick}
      // muted={isMuted}
      // src={videoUrl}
    >
      Seu navegador não suporta vídeos HTML5.
    </video>
  );
});
VideoComponent.displayName = 'Video';

export default VideoComponent;