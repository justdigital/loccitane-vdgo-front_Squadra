'use client';
import React from 'react';
// import css from './style.module.scss';

interface TextOverlapProps {
  children?: React.ReactNode;
}

const TextOverlap: React.FC<TextOverlapProps> = ({ children }) => {

  return (
    <div className="text-overlap absolute h-full w-full top-0 left-0">
      {children}
    </div>
  );
};

export default TextOverlap;