"use client";
import React, { useState } from 'react';
import css from './style.module.scss';
import StepPersonalPart1 from './part1';
import StepPersonalPart2 from './part2';

interface StepPersonalDataProps {
  gotoNextStep: () => void;
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({gotoNextStep}) => {

  const [currentPart, setCurrentPart] = useState(1);

  const gotoPart = (step: 1 | 2) => {
    setCurrentPart(step);
  }
  
  return (
    <div className={`${css['form']}`}>
      {currentPart === 1 && <StepPersonalPart1 gotoPart={gotoPart} />}
      {currentPart === 2 && <StepPersonalPart2 gotoPart={gotoPart} gotoNextStep={gotoNextStep} />}
    </div>
  );
};

export default StepPersonalData;