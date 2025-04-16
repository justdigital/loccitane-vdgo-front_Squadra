'use client';
import React from 'react';
import css from './style.module.scss';
import { sendDataLayerEvent } from '@/utils/general.util';

interface ButtonDefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  scrollBehavior?: 'smooth' | 'auto';
  eventData?: {
    eventName: string;
    sectionName: string;
    ctaName?: string;
    customData?: Record<string, any>;
  };
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ 
  label, 
  href, 
  onClick, 
  scrollBehavior = 'smooth',
  eventData,
  ...props 
}) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    // Disparar evento do dataLayer se eventData estiver definido
    if (eventData) {
      sendDataLayerEvent({
        'event': eventData.eventName,
        'section_name': eventData.sectionName,
        'cta_name': eventData.ctaName || label,
        ...(eventData.customData || {})
      });
    }

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
      //window.scrollTo({ top: 0, behavior: 'smooth' });
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