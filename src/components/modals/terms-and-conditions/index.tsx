"use client";
import css from './style.module.scss';
//import * as React from 'react';
//import { useState } from 'react';
import { Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import ISectionTermsAndConditions from '@/interfaces/section-terms-and-conditions';
import Footer from '@/components/footer';
import ISectionFooter from '@/interfaces/section-footer';
import Header from '@/components/header';
import ISectionHeader from '@/interfaces/section-header';

interface TermsAndConditionsProps {
  sectionData: {
    terms: ISectionTermsAndConditions, 
    header: ISectionHeader, 
    footer: ISectionFooter
  };
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ 
  sectionData, 
  isOpen, 
  onClose,
}) => {

  return (
    <div 
      id='terms'
      className={`${css.bannerWrapper} container`}
    >
     
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-titulo-termos"
        aria-describedby="modal-descricao-termos"
        className={`${css.modalContainer} flex items-center justify-center h-screen`}
      >
        <div className={`${css.modalContent} mx-auto`}>
          {/* Fechar */}
          <button 
            onClick={onClose}
            className={`${css.CloseButton} hover:scale-110 transition-transform duration-200`}
            aria-label="Fechar modal"
          >
            <Close />
          </button>

          <div className={`${css.headerWrapper}`}>
            <Header sectionData={sectionData.header} />
          </div>
          {/* Texto */}    
          {sectionData?.terms?.text && (
          <div className={`${css.text}`}
            dangerouslySetInnerHTML={{ __html: sectionData?.terms?.text }} />
          )}
          <Footer sectionData={sectionData.footer} />
        </div>

      </Modal>
    </div>
  );
};

export default TermsAndConditions;