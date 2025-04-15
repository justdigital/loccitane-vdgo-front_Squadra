export interface Intructions {
  title: string;
  subtitle: string;
  imageName: string;
  imageClassName?: string
  instructions: React.ReactNode[];
  confirmationInstructions: React.ReactNode[];
}

export interface InstructionsByDocumentType {
  [key: string]: {
    hasDocumentBack: boolean,
    acceptedFileTypes: string,
    crediLinkDocumentTypes: string[];
    subDocuments?: {value: string, label: string}[];
    desktop: Intructions,
    mobile: Intructions
  }
};

const instructions: InstructionsByDocumentType = {
  'CNH': {
    hasDocumentBack: false,
    acceptedFileTypes: '.jpg, .jpeg, .pdf',
    crediLinkDocumentTypes: ['CNH'],
    desktop: {
      title: 'Instruções para Upload da CNH',
      subtitle: 'Siga as orientações abaixo para garantir um envio correto do documento:',
      imageName: 'cnh.png',
      instructions: [
        <>O <strong>documento deve estar aberto</strong>, exibindo todas as informações necessárias, conforme ilustração ao lado.</>,
        <>A imagem precisa estar <strong>bem iluminada, sem sombras ou reflexos</strong> que dificultem a leitura.</>,
        <>Os <strong>dados devem estar legíveis</strong> e sem cortes.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, envie o arquivo. Caso contrário, clique no ícone da lixeira para remover o arquivo e fazer um novo upload.</>
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
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, envie o arquivo. Caso contrário, clique no ícone da lixeira para remover o arquivo e fazer um novo upload.</>
      ]
    }
  },

  'RG': {
    hasDocumentBack: true,
    acceptedFileTypes: '.jpg, .jpeg, .pdf',
    crediLinkDocumentTypes: [ "RG_FRENTE", "RG_VERSO" ],
    desktop: {
      title: 'Instruções para Upload do RG',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'rg-desktop.png',
      instructions: [
        <><strong>Envie dois arquivos:</strong> frente e verso do documento.</>,
        <>O documento deve estar totalmente visível para melhor qualidade da imagem.</>,
        <>Certifique-se de que os <strong>dados estejam legíveis,</strong> sem cortes, sombras ou reflexos.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>fotografe o verso do documento.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>,
        <>Se estiver tudo certo, <strong>conclua o envio.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>
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
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>fotografe o verso do documento.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>,
        <>Se estiver tudo certo, <strong>clique em concluir.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>
      ]
    }
  },

  'RG_NOVO': {
    hasDocumentBack: true,
    acceptedFileTypes: '.jpg, .jpeg, .pdf',
    crediLinkDocumentTypes: [ "RG_FRENTE_NOVO", "RG_VERSO_NOVO" ],
    desktop: {
      title: 'Instruções para Upload do Novo RG (CIN - Carteira de Identidade Nacional)',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'new-rg.png',
      instructions: [
        <><strong>Envie dois arquivos:</strong> frente e verso do documento.</>,
        <>O documento deve estar totalmente visível para melhor qualidade da imagem.</>,
        <>Certifique-se de que os <strong>dados estejam legíveis,</strong> sem cortes, sombras ou reflexos.</>,
        <>Você pode fazer o upload do arquivo nos formatos <strong>JPG, PNG ou PDF.</strong></>
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>fotografe o verso do documento.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>,
        <>Se estiver tudo certo, <strong>conclua o envio.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>
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
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>fotografe o verso do documento.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>,
        <>Se estiver tudo certo, <strong>clique em concluir.</strong> Caso contrário, clique na lixeira e tire uma nova foto!</>
      ]
    }
  },

  'CNH_DIGITAL': {
    hasDocumentBack: false,
    acceptedFileTypes: '.pdf',
    crediLinkDocumentTypes: [],
    subDocuments: [
      { value: 'CNH_DIGITAL', label: 'CNH Digital' },
      { value: 'RG_DIGITAL', label: 'RG Digital' }
    ],
    desktop: {
      title: 'Instruções para RG ou CNH Digital',
      subtitle: 'Para garantir a validação correta, escolha o tipo de documento que deseja enviar e  siga as orientações:',
      imageName: 'rg-cnh-digital.png',
      imageClassName: 'w-2/5',
      instructions: [
        <>Envie versões digitais oficiais, emitidas por aplicativos como Gov.br ou Carteira Digital.</>,
        <>Certifique-se de que o <strong>arquivo está sem modificações e dentro da validade.</strong></>,
        <>Envie o <strong>arquivo em PDF.</strong></>
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>conclua o envio.</strong> Caso queira enviar outro documento, clique no ícone da lixeira para remover o arquivo e fazer um novo upload.</>,
      ]
    },
    mobile: {
      title: 'Instruções para RG ou CNH Digital',
      subtitle: 'Para garantir a melhor qualidade, siga as nossas dicas:',
      imageName: 'rg-cnh-digital.png',
      imageClassName: 'w-2/5',
      instructions: [
        <>Envie versões digitais oficiais, emitidas por aplicativos como Gov.br ou Carteira Digital.</>,
        <>Certifique-se de que o <strong>arquivo está sem modificações e dentro da validade.</strong></>,
        <>Envie o <strong>arquivo em PDF.</strong></>
      ],
      confirmationInstructions: [
        <>Se estiver tudo certo, <strong>conclua o envio.</strong> Caso queira enviar outro documento, clique no ícone da lixeira para remover o arquivo e fazer um novo upload.</>,
      ]
    }
  }
};

instructions['RG_DIGITAL'] = instructions['CNH_DIGITAL'];

export const InstructionsByDocumentType = instructions;