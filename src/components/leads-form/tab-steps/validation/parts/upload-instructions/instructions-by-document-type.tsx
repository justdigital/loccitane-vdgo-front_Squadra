export interface Intructions {
  title: string;
  subtitle: string;
  imageName: string;
  instructions: React.ReactNode[];
}
export interface InstructionsByDocumentType {
  [key: string]: {
      desktop: Intructions,
      mobile: Intructions
  }
};

export const InstructionsByDocumentType: InstructionsByDocumentType = {
  'CNH': {
    desktop: {
      title: 'Instruções para Upload da CNH',
      subtitle: 'Siga as orientações abaixo para garantir um envio correto do documento:',
      imageName: 'cnh.png',
      instructions: [
        <>O <strong>documento deve estar aberto</strong>, exibindo todas as informações necessárias, conforme ilustração ao lado.</>,
        <>A imagem precisa estar <strong>bem iluminada, sem sombras ou reflexos</strong> que dificultem a leitura.</>,
        <>Os <strong>dados devem estar legíveis</strong> e sem cortes.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ]
    },
    mobile: {
      title: 'Instruções para CNH',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'cnh.png',
      instructions: [
        <>Mantenha o <strong>documento aberto</strong> e posicione-o corretamente dentro dos limites, seguindo a imagem ao lado</>,
        <>Procure uma <strong>boa iluminação</strong></>,
        <>Utilize um <strong>fundo branco</strong></>,
        <>Certifique-se de que os <strong>dados estejam visíveis</strong></>
      ]
    }
  },

  'RG': {
    desktop: {
      title: 'Instruções para Upload do RG',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'rg-desktop.png',
      instructions: [
        <><strong>Envie dois arquivos:</strong> frente e verso do documento.</>,
        <>O documento deve estar totalmente visível para melhor qualidade da imagem.</>,
        <>Certifique-se de que os <strong>dados estejam legíveis,</strong> sem cortes, sombras ou reflexos.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ]
    },
    mobile: {
      title: 'Instruções para RG',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'rg.png',
      instructions: [
        <><strong>Precisamos de 2 fotos:</strong> frente e verso do seu documento</>,
        <><strong>Remova o RG do envelope,</strong> pois o documento precisa estar totalmente visível para garantir a melhor qualidade da imagem</>,
        <>Procure uma <strong>boa iluminação</strong></>,
        <>Utilize um <strong>fundo branco</strong></>,
        <>Certifique-se de que os <strong>dados estejam visíveis</strong></>
      ]
    }
  },

  'RG_NOVO': {
    desktop: {
      title: 'Instruções para Upload do Novo RG (CIN - Carteira de Identidade Nacional)',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'new-rg.png',
      instructions: [
        <><strong>Envie dois arquivos:</strong> frente e verso do documento.</>,
        <>O documento deve estar totalmente visível para melhor qualidade da imagem.</>,
        <>Certifique-se de que os <strong>dados estejam legíveis,</strong> sem cortes, sombras ou reflexos.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ]
    },
    mobile: {
      title: 'Instruções para novo modelo do RG',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'new-rg.png',
      instructions: [
        <><strong>Precisamos de 2 fotos:</strong> frente e verso do seu documento</>,
        <>Procure uma <strong>boa iluminação</strong></>,
        <>Utilize um <strong>fundo branco</strong></>,
        <>Certifique-se de que os <strong>dados estejam visíveis</strong></>
      ]
    }
  },

  'CNH_DIGITAL': {
    desktop: {
      title: 'Instruções para Upload da CNH Digital',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'cnh-digital.png',
      instructions: [
        <>O documento deve ser baixado diretamente do aplicativo Carteira Digital de Trânsito (CDT) do Gov.br.</>,
        <>Certifique-se de que o <strong>arquivo está sem modificações e dentro da validade.</strong></>,
        <>Para continuar, faça o upload do <strong>arquivo PDF da sua CNH Digital.</strong></>
      ]
    },
    mobile: {
      title: 'Instruções para CNH Digital',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'cnh-digital.png',
      instructions: [
        <>O documento deve ser baixado diretamente do aplicativo Carteira Digital de Trânsito (CDT) do Gov.br.</>,
        <>Certifique-se de que o <strong>arquivo está sem modificações e dentro da validade.</strong></>,
        <>Para continuar, faça o upload do <strong>arquivo PDF da sua CNH Digital.</strong></>
      ]
    }
  }
};