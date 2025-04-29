'use client';
import React, { useEffect } from 'react';
import ButtonDefault from "@/components/commons/button-default";
import { sendDataLayerEvent } from '@/utils/general.util';

export default function Custom500({...props}) {

  useEffect(() => {
    sendDataLayerEvent({
      'event': 'erro500Homologacao',
    });
  }, []);

  return (
    <div className='bg-[#F7E4D2] w-full h-screen flex flex-col items-center justify-center gap-2.5'> 
      <h1 className='text-xl sm:text-2xl font-bold text-[#552E0D]'>500 - Erro no servidor</h1>
      <p className='text-xs sm:text-sm text-[#552E0D]'>Desculpe, mas a página que você acessou apresentou um erro.</p>
      <div className='pt-5'>
        {props.footerSectionData && (
          <ButtonDefault 
            className="w-60 sm:w-72 "
            label='Reporte o erro'
            href={props.footerSectionData.cardItems[0].buttonLink}
          />
        )}
      </div>
    </div>
  )
}