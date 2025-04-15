'use client';
import React from 'react';
import ButtonDefault from "@/components/commons/button-default";
import { useAppContext } from '@/contexts/app.context';

export default function Custom404() {
  const { pagesUrls } = useAppContext();
  return (
    <div className='bg-[#F7E4D2] w-full h-screen flex flex-col items-center justify-center gap-2.5'> 
      <h1 className='text-xl sm:text-2xl font-bold text-[#552E0D]'>404 - Página Não Encontrada</h1>
      <p className='text-xs sm:text-sm text-[#552E0D]'>Desculpe, a página que você está procurando não existe.</p>
      <div className='pt-5'>
        <ButtonDefault 
          className="w-60 sm:w-72 "
          label='Página inicial'
          href={pagesUrls?.lp1 ?? 'https://reve.loccitaneaubresil.com/'}
        /> 
      </div>
    </div>
  )
}