import React from 'react';
import css from './style.module.scss';


interface HorizontalVideoCardsSectionProps {

}

const HorizontalVideoCardsSection: React.FC<HorizontalVideoCardsSectionProps> = ({}) => {
  return (
    <div className={`${css['cards-wrapper']} container p-6`}>
      <div className={`${css['title']}`}>Título</div>
      <div className={`${css['subtitle']}`}>Subtítulo</div>
      
      <div className={`flex space-x-4`}>
        <div className={`flex-1 bg-gray-200 p-4`}>
          <p>Conteúdo da Coluna 1</p>
        </div>
        <div className={`flex-1 bg-gray-200 p-4`}>
          <p>Conteúdo da Coluna 2</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideoCardsSection;