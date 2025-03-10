import React from 'react';
import css from './style.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary';
  buttonClasses?: string;
}

const Button: React.FC<ButtonProps> = ({ label, styleType, buttonClasses, ...props }) => {
  const buttonStyle = styleType ? css[styleType] : css['primary'];

  return (
    <button className={`${css['button']} ${buttonStyle} ${buttonClasses}`} {...props}>
      {label}
    </button>
  );
};

export default Button;