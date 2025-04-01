'use client';
import React from 'react';
import css from './style.module.scss';
//import { CircularProgress } from '@mui/material';

interface ButtonDefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary';
  buttonDefaultClasses?: string;
  isLoading?: boolean;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ label, styleType, buttonDefaultClasses, ...props }) => {
  const buttonStyle = styleType ? css[styleType] : css['primary'];

  return (
    <button className={`${css['button']} flex justify-center gap-3 ${buttonStyle} ${buttonDefaultClasses}`} {...props}>
      {label}
    </button>
  );
};

export default ButtonDefault;