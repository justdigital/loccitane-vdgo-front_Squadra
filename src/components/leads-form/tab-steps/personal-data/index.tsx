"use client";
import React from 'react';
import css from './style.module.scss';
import StepPersonalPart1 from './part1';
import StepPersonalPart2 from './part2';

const StepPersonalData = () => {

  
  
  return (
    <div className={`${css['form']}`}>
      <StepPersonalPart2 />
    </div>
  );
};

export default StepPersonalData;