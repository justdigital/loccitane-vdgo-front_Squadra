'use client';
import React from 'react';
import css from './style.module.scss';

interface ButtonDefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  scrollBehavior?: 'smooth' | 'auto';
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ 
  label, 
  href, 
  onClick, 
  scrollBehavior = 'smooth',
  ...props 
}) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (href) {
      handleHrefAction(href, scrollBehavior);
    }
  };

  const handleHrefAction = (url: string, behavior: string) => {
    if (url.startsWith('#')) {
      scrollToElement(url, behavior);
    } else {
      window.open(url, '_self', 'noopener,noreferrer');
    }
  };

  const scrollToElement = (hash: string, behavior: string) => {
    const element = document.getElementById(hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: behavior as ScrollBehavior });
    } else {
      window.scrollTo({ top: 0, behavior: behavior as ScrollBehavior });
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`${css.button} ${props.className || ''}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default ButtonDefault;