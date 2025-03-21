"use client";
import React, { useEffect, useState } from 'react';
import css from './style.module.scss';
import StepPersonalPart1 from './part1';
import StepPersonalPart2 from './part2';

interface StepPersonalDataProps {
  gotoNextStep: () => void;
  isTabActive: boolean;
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({gotoNextStep, isTabActive}) => {

  // const {} = useFormContext<IFormInputs>();

  const [currentPart, setCurrentPart] = useState(1);

  const gotoPart = (step: 1 | 2) => {
    setCurrentPart(step);
  }

  useEffect(() => {
    if (!isTabActive) {
      setCurrentPart(1);
      return;
    }
  }, [isTabActive]);
  
  return (
    <div className={`${css['form']}`}>
      {currentPart === 1 && <StepPersonalPart1 gotoPart={gotoPart} isTabActive={isTabActive} />}
      {currentPart === 2 && <StepPersonalPart2 gotoPart={gotoPart} gotoNextStep={gotoNextStep} isTabActive={isTabActive} />}
    </div>
  );
};

export default StepPersonalData;