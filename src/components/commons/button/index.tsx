'use client';
import React from 'react';
import css from './style.module.scss';
import { CircularProgress } from '@mui/material';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary';
  buttonClasses?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, styleType, buttonClasses, isLoading, ...props }) => {
  const buttonStyle = styleType ? css[styleType] : css['primary'];

  return (
    <button disabled={isLoading} className={`${css['button']} flex justify-center gap-3 ${buttonStyle} ${buttonClasses}`} {...props}>
      {isLoading ? (<CircularProgress
        size="20px"
        sx={{
          color: 'white'
        }}
      />)
        : label}
    </button>
  );
};

export default Button;