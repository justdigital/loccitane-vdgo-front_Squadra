'use client';
import React, { useState } from 'react';
import css from './style.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import ISectionHorizontalCards from '@/interfaces/section-horizontal-cards';
import SectionsTitle from '../commons/sections-title';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Modal } from '@mui/material';
import CardItem from './card-item';
import VideoComponent from '../commons/video';

interface HorizontalCardsSectionProps {
  sectionData: ISectionHorizontalCards
}

const HorizontalCardsSection: React.FC<HorizontalCardsSectionProps> = ({sectionData}) => {

  const [swiper, setSwiper] = useState<SwiperClass>({} as SwiperClass);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

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

  const openModal = (videoUrl: string, title: string) => {
    setVideoUrl(videoUrl);
    setVideoTitle(title);
    setModalOpen(true);
  }

  return (
    <div id='horizontal-cards' className={`${css['section-wrapper']} py-10`}>
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
            loop
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 20
              }
            }}
            // onSlideChange={() => console.log('slide change')}
          >
            {sectionData.cardItems.map((item, index) => (
              <SwiperSlide key={index}>
                <CardItem item={item} openModal={() => openModal(item.videosUrls?.urlDesktop as string, item.videosUrls?.altText as string)} />
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
        <>
          <VideoComponent
            videoText={videoTitle}
            className={`${css['video-modal']} w-[90dvw] sm:w-[60dvw] h-auto`}
            loop
            playsInline
            autoPlay
            controls={true}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            src={videoUrl} 
            poster=""
            aria-label="Vídeo"
          />
        </>
        {/* <video
          className={`${css['video-modal']} w-[90dvw] sm:w-[60dvw] h-auto`}
          loop
          playsInline
          autoPlay
          controls={true}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          src={videoUrl} 
          poster=""
          aria-label="Vídeo"
        >
            Seu navegador não suporta vídeos HTML5.
        </video> */}
      </Modal>
    </div>
  );
};

export default HorizontalCardsSection;