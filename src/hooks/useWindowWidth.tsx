"use client";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Função para atualizar a largura da janela
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Adiciona o listener de resize
    window.addEventListener("resize", handleResize);

    // Define a largura inicial
    handleResize();

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;