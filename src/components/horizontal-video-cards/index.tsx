import React from 'react';
import css from './style.module.scss';


interface HorizontalVideoCardsSectionProps {

}

const HorizontalVideoCardsSection: React.FC<HorizontalVideoCardsSectionProps> = ({}) => {

  const mocks = {
    title: '<p>Título 1</p>',
    subtitle: '<p>Título 2</p>'
  }
  return (
    <div className={`${css['cards-wrapper']} container p-6`}>
      <div className={`${css['title']}`} dangerouslySetInnerHTML={{__html: mocks.title}}></div>
      <div className={`${css['subtitle']}`} dangerouslySetInnerHTML={{__html: mocks.subtitle}}></div>

      <div className={`flex space-x-4`}>
        <div className={`flex-1`}></div>
        <div className={`flex-1`}></div>
      </div>
    </div>
  );
};

export default HorizontalVideoCardsSection;