'use client';
import React from 'react';
// import css from './style.module.scss';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface MuteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps?: any;
  isMuted?: boolean;
  onClick?: () => void;
}

const MuteButton: React.FC<MuteButtonProps> = ({ iconProps, isMuted, onClick, ...props }) => {

  return (
    <button
      {...props}
      onClick={onClick}
      className={`${props.className} bg-black/10 rounded-full p-2 text-white`}
      aria-label={isMuted ? "Ativar som" : "Desativar som"}
    >
      {isMuted ? (
        <VolumeOffIcon {...iconProps} className="w-8 h-8" />
      ) : (
        <VolumeUpIcon {...iconProps}  className="w-12 h-12" />
      )}
    </button>
  );
};

export default MuteButton;