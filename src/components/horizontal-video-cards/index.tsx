'use client';
import React, { useState } from 'react';
import css from './style.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import ISectionHorizontalCards from '@/interfaces/section-horizontal-cards';
import SectionsTitle from '../commons/sections-title';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Modal } from '@mui/material';
import LikeButton from '../commons/like-button';
import MuteButton from '../commons/mute-button';
// import { useAppContext } from '@/contexts/app.context';
import Image from 'next/image';

interface ItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ISectionHorizontalCards['cardItems'][number];
  openModal: (videoUrl: string) => void;
}

const CardItem: React.FC<ItemsProps> = ({ item, openModal, ...props }) => {

  const [isMuted, setIsMuted] = useState(true);
  // const [isPaused, setIsPaused] = useState(true);

  // const { isMobileScreen: isMobile } = useAppContext();
  const isVideoCard = !!item.videoUrl || false;
  // item.videoUrl = "https://vdgo-cms-dev.squadra.com.br/sites/default/files/2025-04/Modelo%20de%20Neg%C3%B3cio_Valentina%20Serikawa_FINAL_horizontal%20%281%29.mp4";

  return (
    <div className={`${css['card-item']} ${isVideoCard && css['video-card']} ${props.className} flex flex-col sm:flex-row`}>
      {isVideoCard && (
        <div className={`${css['play-button-box']} flex items-center justify-center`} onClick={() => openModal(item.videoUrl || '')}>
          <PlayCircleOutlineIcon />
        </div>
      )}
      <div
        className={`${css['side-image']} ${isVideoCard && css['video-card']} ${!isVideoCard ? 'sm:w-[48%]' : 'w-full'}`}
        style={{
          '--image-desktop': `url('${item.imagesUrls?.desktop}')`,
          '--image-mobile': `url('${item.imagesUrls?.mobile}')`
        } as React.CSSProperties}>

        {/* <video
          className="w-[90dvw] sm:w-[60dvw] h-auto"
          loop
          playsInline
          autoPlay
          muted={isMuted}
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          src={item.videoUrl} 
          poster={isMobile ? item.imagesUrls?.mobile : item.imagesUrls?.desktop}
          aria-label="Vídeo"
        >
            Seu navegador não suporta vídeos HTML5.
        </video> */}
      </div>
      <div className={`${css['side-text']} sm:w-[52%] flex flex-col items-center justify-center flex-grow ${(isVideoCard ? 'hidden' : '')}`}>
        <div dangerouslySetInnerHTML={{__html: item.text || ''}} className={'ml-2 gap-y-5 sm:gap-y-2 flex flex-col flex-grow'}></div>
        
        {item.linkUrl || 1 && (
          <div className={`text-right self-end`}>
            <Image src={item.iconeUrl || ''} alt={"Link do cartão"} width={22} height={22} className={`${css['icone-link']}`} />
          </div>
        )}
      </div>

      {isVideoCard && (
        <div className='action-buttons sm:hidden'>

          {/* {item.text && ((isMobile && isMuted) || (!isMobile && isPaused)) &&(
            <div
              className={`${css['transcription']} w-[70%] absolute z-[3] bottom-9 left-7 md:bottom-28 md:left-1/2 md:-translate-x-1/2 text-white`}
              dangerouslySetInnerHTML={{ __html: `<span>,,</span>${item.text}` }}
            />
          )} */}

        <LikeButton className="absolute top-5 right-4 z-[3]" />
        <MuteButton onClick={() => setIsMuted(!isMuted)} isMuted={isMuted} className={`absolute bottom-8 right-2.5 z-[3]`} />
        </div>
      )}
    </div>
  );
}

interface HorizontalVideoCardsSectionProps {
  sectionData: ISectionHorizontalCards
}

const HorizontalVideoCardsSection: React.FC<HorizontalVideoCardsSectionProps> = ({sectionData}) => {

  const [swiper, setSwiper] = useState<SwiperClass>({} as SwiperClass);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const moveSlide = (to: 'next' | 'prev') => {
    if (to === 'next') {
      swiper.slideNext();
      return;
    }

    swiper.slidePrev();
  };

  const onCloseModal = (e: any, reason: any) => {
    console.log('reason', reason)
    setModalOpen(false);
  }

  const openModal = (videoUrl: string) => {
    setVideoUrl(videoUrl);
    setModalOpen(true);
  }

  return (
    <div id='horizontal-video-cards' className={`${css['section-wrapper']} py-10`}>
      <div className="container p-6">
        <SectionsTitle title={sectionData.title} subtitle={sectionData.subtitle} />

        <div className={`${css['slider-wrapper']} flex items-center mt-5 sm:mt-10 ${typeof swiper.slideNext != 'function' ? 'hidden' : ''}`}>
          <button onClick={() => moveSlide('prev')} className={`${css['navigation-button']} ${css['prev']}`}>
            <NavigateBeforeIcon />
          </button>
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 20
              }
            }}
            onSlideChange={() => console.log('slide change')}
          >
            {sectionData.cardItems.map((item, index) => (
              <SwiperSlide key={index}>
                <CardItem item={item} openModal={openModal} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={() => moveSlide('next')} className={`${css['navigation-button']} ${css['next']}`}>
            <NavigateNextIcon />
          </button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center h-screen"
      >
        <video
          className="w-[90dvw] sm:w-[60dvw] h-auto"
          loop
          playsInline
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          src={videoUrl} 
          poster=""
          aria-label="Vídeo"
        >
            Seu navegador não suporta vídeos HTML5.
        </video>
      </Modal>
    </div>
  );
};

export default HorizontalVideoCardsSection;