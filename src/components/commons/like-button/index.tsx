'use client';
import React, { useState } from 'react';
import css from './style.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { sendDataLayerEvent } from '@/utils/general.util';

interface LikeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps?: any;
  videoUrl: string;
  videoTitle: string;
  sectionName: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ iconProps, videoUrl, videoTitle, sectionName, ...props }) => {

  const [liked, setLiked] = useState(false); //Controlar like

  const toggleLike = () => {
    setLiked(!liked);
    sendDataLayerEvent({
      'event': 'select_content',
      'section_name': sectionName,
      'content_type': `video`,
      'content_text': !liked ? 'Curtiu o vídeo: ' : 'Descurtiu o vídeo: ' +videoTitle,
      'video_url': videoUrl,
    });
  }

  return (
    <button
      {...props}
      className={`${css['like-button']} ${props.className} ${liked && css['liked']} bg-black/30 rounded-[100%] p-2 backdrop-blur-sm`}
      aria-label={liked ? "Descurtir vídeo" : "Curtir vídeo"}
      onClick={() => toggleLike()}
    >
      <FavoriteIcon
        {...iconProps}
        style={{
          width: "20px",
          height: "20px",
          fill: liked ? "#C02031" : "#FFFFFF",
          color: liked ? "#C02031" : "#FFFFFF"
        }}
      />
    </button>
  );
};

export default LikeButton;