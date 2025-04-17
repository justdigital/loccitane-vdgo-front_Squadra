'use client';
import React, { forwardRef, RefAttributes, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { getPlainText, sendDataLayerEvent } from '@/utils/general.util';

type ProgressTracked = {
  [key: string]: {tracked: boolean, progressName?: number, eventName: string};
};

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoText?: string;
  onVideoStart?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoProgress?: (e: SyntheticEvent<HTMLVideoElement, Event>, progress: number) => void;
  onVideoEnd?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoClick?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoPause?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoPlay?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onVideoVolumeChange?: (e: SyntheticEvent<HTMLVideoElement, Event>, volume: number, muted: boolean) => void;
  doPlay?: boolean;
  runsMuteOtherVideos?: boolean;
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
  onVideoVolumeChange,
  videoText,
  doPlay,
  runsMuteOtherVideos = true,
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
      ...(progress && { video_progress: `${progress.toFixed(0)}%`})
    };

    sendDataLayerEvent(eventData)
  }, [videoText, props.src]);

  const handleVideoProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!videoRef.current) return;

    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;

    Object.keys(progressTracked).forEach((key: string) => {
      const percent = parseInt(key);
      if (progress >= percent && !(progressTracked as any)[key].tracked) {
        // console.log('chegou em ', progressTracked[key].progressName || percent);
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

  const handleVideoVolumeChange = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (onVideoVolumeChange) {
      onVideoVolumeChange(e, e.currentTarget.volume, e.currentTarget.muted);
    }
  }

  const muteAllOthersVideosFromHtml = () => {
    document.querySelectorAll('video:not(.inactive)').forEach((video) => {
      const htmlVideo = video as HTMLVideoElement;
      // console.log(videoRef.current, htmlVideo);
      if (htmlVideo !== videoRef.current) {
        htmlVideo.muted = true;
      }
    });
  }

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
    if (!videoRef.current || typeof doPlay === 'undefined'){
      return;
    }

    if (doPlay) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [doPlay]);

  useEffect(() => {
    if (!props.muted && runsMuteOtherVideos) {
      muteAllOthersVideosFromHtml();
    }
  }, [props.muted, runsMuteOtherVideos]);


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
      onVolumeChange={handleVideoVolumeChange}
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