'use client';
import React from 'react';
import css from './style.module.scss';

interface ButtonDefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  //styleType?: 'primary' | 'secondary';
  //buttonDefaultClasses?: string;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ label, ...props }) => {
  //const buttonStyle = styleType ? css[styleType] : css['primary'];

  return (
    <button {...props} className={`${props.className} ${css['button']}`}>
      {label}
    </button>
  );
};

export default ButtonDefault;