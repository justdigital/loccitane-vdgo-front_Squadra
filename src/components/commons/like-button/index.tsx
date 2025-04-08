'use client';
import React, { useState } from 'react';
import css from './style.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LikeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps?: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ iconProps, ...props }) => {

  const [liked, setLiked] = useState(false); //Controlar like

  return (
    <button
      {...props}
      className={`${css['like-button']} ${props.className} ${liked && css['liked']} bg-black/30 rounded-[100%] p-2 backdrop-blur-sm`}
      aria-label={liked ? "Descurtir vídeo" : "Curtir vídeo"}
      onClick={() => setLiked(!liked)}
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