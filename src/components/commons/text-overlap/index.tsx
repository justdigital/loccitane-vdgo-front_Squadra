'use client';
import React, { HTMLAttributes } from 'react';
// import css from './style.module.scss';

interface TextOverlapProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const TextOverlap: React.FC<TextOverlapProps> = ({ children, className }) => {

  return (
    <div className={`${className} text-overlap absolute h-full w-full top-0 left-0`}>
      {children}
    </div>
  );
};

export default TextOverlap;