export type Language = 'pt' | 'fr' | 'en' | 'es';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  countryName: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português',
    flag: 'GW',
    countryName: 'Guiné-Bissau / Portugal'
  },
  {
    code: 'fr',
    name: 'Francês',
    nativeName: 'Français',
    flag: 'FR',
    countryName: 'France / Francophonie'
  },
  {
    code: 'en',
    name: 'Inglês',
    nativeName: 'English',
    flag: 'US',
    countryName: 'USA / International English'
  },
  {
    code: 'es',
    name: 'Espanhol',
    nativeName: 'Español',
    flag: 'ES',
    countryName: 'España / Iberoamérica'
  }
];

export interface ProcedureItem {
  title: string;
  desc: string;
  fullWidth?: boolean;
}

export interface StatuteChapter {
  numero: string;
  titulo: string;
  artigos: string[];
}

export interface ManagementOrgan {
  name: string;
  role: string;
  description: string;
}

export interface PartnershipItem {
  name: string;
  desc: string;
}

export const translations = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre Nós',
      services: 'Serviços',
      requirements: 'Requisitos',
      process: 'Processo',
      forms: 'Formulários',
      faq: 'FAQ',
      news: 'Notícias',
      contact: 'Contactos',
      book: 'Agendar',
      admin: 'Painel Admin',
      login: 'Entrar',
      subtitle: 'NATURALIZAÇÃO · GUINÉ-BISSAU',
      scheduleOnline: 'Agendar Atendimento Online',
      adminAccess: 'Aceder à Área Administrativa',
      language: 'Idioma'
    },
    hero: {
      republicPrefix: 'República da',
      republicSuffix: 'Guiné-Bissau',
      titleLine1: 'A Sua Primeira e Segunda Pátria.',
      titleLine2: 'A sua cidadania é o nosso compromisso!',
      description: 'O EMDPN-GB é uma estrutura de consultoria e apoio técnico-administrativo, com sede no setor de Safim, região de Biombo, Guiné-Bissau, dedicada à orientação, assistência e acompanhamento de processos relacionados com a nacionalidade, cidadania, naturalização e regularização de documentação civil.',
      ctaBook: 'AGENDAR ATENDIMENTO / PEDIDO',
      ctaWhatsapp: 'ATENDIMENTO WHATSAPP',
      ctaProcess: 'CONHECER O PROCESSO',
      officialBadge: 'Gabinete Oficial de Registos e Naturalização · Bissau',
      photoCaption: 'Atendimento presencial e remoto de apoio documental em colaboração com Ministério da Justiça e dos Direitos Humanos da Guiné-Bissau.'
    },
    metrics: {
      completedTitle: 'Processos Concluídos',
      completedDesc: 'Com parecer favorável',
      timelineTitle: 'Tempo Médio de Espera',
      timelineValue: '1 a 12 Meses',
      timelineDesc: 'Prazo legal regulamentado',
      timelineLink: 'Ver Justificativa Completa de Prazos',
      satisfactionTitle: 'Taxa de Satisfação',
      satisfactionDesc: 'Transparência e rigor',
      diasporaTitle: 'Países Atendidos',
      diasporaDesc: 'Diáspora e cooperação global'
    },
    audience: {
      sectionTitle: 'A Quem se Destina o Nosso Serviço?',
      sectionSubtitle: 'Assessoria jurídica especializada adaptada a cada situação de nacionalidade guineense',
      card1Title: '1. Cidadãos no Território Nacional',
      card1Desc: 'Guineenses residentes que enfrentam dificuldades na obtenção de documentos (Cédula Pessoal, Bilhete de Identidade, Registo Criminal e Passaporte) para estudos, trabalho, tratamento de saúde no estrangeiro.',
      card2Title: '2. Diáspora Guineense',
      card2Desc: 'Guineenses nascidos no estrangeiro, filhos de pai ou mãe guineense, que necessitam obter a sua nacionalidade de origem e documentação.',
      card3Title: '3. Descendentes da Guiné-Bissau na Diáspora e Retorno',
      card3Desc: 'Os Descendentes com raiz Guineenses que decidem retornar à terra dos ancestrais e estabelecer laços jurídicos, culturais e com a História da Guiné-Bissau.',
      card4Title: '4. Cidadãos com Direito à Nacionalidade',
      card4Desc: 'Profissionais, investidores, cooperantes e requerentes que, nos termos da lei, têm direito a requerer, reconhecer ou adquirir a nacionalidade guineense.'
    },
    bookingSection: {
      title: 'Portal de Atendimento e Acompanhamento',
      subtitle: 'Agende a sua consulta presencial ou digital, ou consulte o estado do seu agendamento em tempo real.',
      tabBook: 'Agendar Novo Atendimento',
      tabTrack: 'Consultar Agendamento Existente',
      noticeTravel: 'Inclui modalidade de Agendamento por Viagem urgente com tratamento consular prioritário.'
    },
    partners: {
      title: 'Articulação Institucional do Estado',
      subtitle: 'Atuamos como Parceiro de Estado na facilitação e conformidade documental perante os órgãos de soberania',
      partner1: 'Ministério da Justiça',
      partner1Role: 'Direcção-Geral de Identificação Civil, Registos e Notariado',
      partner2: 'Ministério do Interior (DIC)',
      partner2Role: 'Direção de Migração e Fronteiras / Emissão de Passaportes',
      partner3: 'Ministério dos Negócios Estrangeiros',
      partner3Role: 'Cooperação Internacional, Apoio à Diáspora e Tradução de Documentos',
      partner4: 'Ministério da Cultura',
      partner4Role: 'Para obtenção de declaração de conformidade',
      partner5: 'Câmara Municipal de Bissau',
      partner5Role: 'Atesta residência por mais de 5 anos'
    },
    about: {
      title: 'Sobre o EMDPN-GB',
      subtitle: 'Estrutura institucional, missão jurídica e atuação oficial como Parceiro de Estado na Guiné-Bissau.',
      tabStatus: 'Estatuto Institucional',
      tabOrgans: 'Órgãos & Ministérios',
      tabPartnership: 'Parcerias de Estado',
      tabPrinciples: 'Princípios & Rigor',
      missionTitle: 'Missão & Vocação',
      missionDesc: 'Garantir a cada requerente um processo rigoroso, transparente e com estrita observância da Lei da Nacionalidade da República da Guiné-Bissau.',

      // Presentation
      introBadge: 'Apresentação Institucional · Safim / Biombo',
      introTitle: 'A Sua Primeira e Segunda Pátria.',
      introMotto: '"A sua cidadania é o nosso compromisso!"',
      introDesc: 'O EMDPN-GB é uma estrutura de consultoria e apoio técnico-administrativo, com sede no setor de Safim, região de Biombo, Guiné-Bissau, dedicada à orientação, assistência e acompanhamento de processos relacionados com a nacionalidade, cidadania, naturalização e regularização de documentação civil.',
      ourMissionTitle: 'A Nossa Missão',
      ourMissionDesc: 'Facilitar o acesso dos cidadãos aos seus direitos de identidade e cidadania, prestando serviços de orientação e apoio na organização, preparação, tramitação e acompanhamento de processos documentais junto das entidades e instituições públicas competentes.',
      scopeTitle: 'Âmbito e Destinatários',
      scopeDesc: 'O nosso trabalho destina-se aos cidadãos guineenses residentes no território nacional, aos membros da diáspora guineense espalhados pelo mundo e a todas as pessoas que, nos termos da legislação aplicável, tenham direito a requerer, reconhecer ou adquirir a nacionalidade guineense. O escritório atua em estreita articulação com juristas profissionais e consultores jurídicos especializados para garantir a conformidade legal e o direito à aquisição da nacionalidade.',
      btnBookOnline: 'Agendar Atendimento Online',
      btnContactDirector: 'Falar com a Direção',
      sealTitle: 'EMDPN-GB · Selo e Equipa Oficial',
      sealLocation: 'Safim Centro / Reino · Guiné-Bissau',
      photoAlt: 'Equipa Oficial do EMDPN-GB com Passaporte Guineense',

      // 7 Procedimentos de Apoio e Regularização
      procBadge: 'Âmbito de Atuação & Procedimentos',
      procTitle: 'Procedimentos de Apoio e Regularização',
      procSubtitle: 'Prestamos apoio de serviços em diferentes procedimentos, assegurando orientação técnica e administrativa:',
      procedures: [
        {
          title: '1. Processos de atribuição e reconhecimento da nacionalidade',
          desc: 'Instrução documental para cidadãos por origem, filiação e transcrição nos Registos Centrais.'
        },
        {
          title: '2. Processos de nacionalidade por casamento',
          desc: 'Acompanhamento do processo legal para cônjuges com mais de 3 anos de união legal com cidadão guineense, ao abrigo do artigo 8 da lei da nacionalidade.'
        },
        {
          title: '3. Processos de naturalização',
          desc: 'Assessoria para estrangeiros e membros da diáspora com base ao abrigo do artigo 9 da lei da nacionalidade.'
        },
        {
          title: '4. Processos de alteração e retificação dos nomes e apelidos nos assentos de registos de nascimentos, correção de erros materiais e uniformização ortográfica entre documentos.',
          desc: 'Retificação de certidões e assentos de registo civil para uniformização ortográfica de nomes e apelidos.'
        },
        {
          title: '5. Orientação para a organização e regularização de documentos civis',
          desc: 'Apoio na obtenção e renovação de Cédula Pessoal, Bilhete de Identidade (BI), Registo Criminal para a obtenção de Passaporte.'
        },
        {
          title: '6. Apoio administrativo na preparação de requerimentos e processos',
          desc: 'Elaboração técnica de minutas, verificação prévia de conformidade, cópias autenticadas e traduções oficiais.'
        },
        {
          title: '7. Orientação sobre os procedimentos legais e administrativos aplicáveis',
          desc: 'Esclarecimento sobre trâmites perante as instituições estatais.',
          fullWidth: true
        }
      ],

      // Bridge and Principles
      bridgeBadge: 'Ponte Institucional',
      bridgeTitle: 'Ponte entre Cidadãos, Diáspora e o Estado',
      bridgeDesc: 'O EMDPN-GB procura estabelecer uma ponte entre os cidadãos, a diáspora e as instituições responsáveis pela administração da justiça, identificação civil e gestão dos processos de nacionalidade, contribuindo para uma prestação de serviços mais acessível, organizada, transparente e eficiente.',
      bridgeHighlight: 'Acessibilidade · Organização · Eficiência Notarial',
      principlesBadge: 'Princípios de Atuação',
      principlesTitle: 'Ética, Confidencialidade e Rigor',
      principlesDesc: 'A nossa atuação assenta nos princípios da responsabilidade, confidencialidade, transparência, respeito pela legislação em vigor e compromisso com os direitos fundamentais dos cidadãos.',
      principlesQuote: '"Acreditamos que a nacionalidade representa muito mais do que um documento: é identidade, pertença, história, reconhecimento e oportunidade."',

      // Estatuto Tab
      statuteBadge: 'Transparência & Governação',
      statuteTitle: 'Estatuto Oficial e Estrutura do Gabinete',
      statuteChapters: [
        {
          numero: 'Capítulo I',
          titulo: 'Denominação, Natureza, Sede e Âmbito Territorial',
          artigos: [
            'Artigo 1.º (Denominação) - O Escritório de Movimentação de Documentos e Processos de Naturalização na Guiné-Bissau, abreviadamente designado por EMDPN-GB, é uma entidade jurídica e operacional vocacionada para a assessoria, instrução e tramitação de processos de nacionalidade e documentação oficial.',
            'Artigo 2.º (Sede Oficial) - O EMDPN-GB tem a sua sede central localizada em Safim Centro / Reino, Setor de Safim, Região de Biombo, República da Guiné-Bissau, podendo prestar atendimento em qualquer ponto do território e internacionalmente.',
            'Artigo 3.º (Âmbito Universal) - O EMDPN-GB atua em prol dos cidadãos no território nacional, da diáspora guineense espalhada pelo mundo e de todas as pessoas que, nos termos da legislação aplicável, tenham direito a requerer, reconhecer ou adquirir a nacionalidade guineense.'
          ]
        },
        {
          numero: 'Capítulo II',
          titulo: 'Objetivos Gerais, Específicos e Enquadramento Histórico',
          artigos: [
            'Artigo 4.º (Objetivo Principal) - Facilitar, de forma legal, transparente e célere, o acesso à cidadania guineense e à documentação oficial para todos os requerentes legítimos.',
            'Artigo 5.º (Enquadramento e Apoio à Diáspora) - Apoiar expressamente os membros da diáspora guineense e internacional que procuram restabelecer laços jurídicos permanentes com a Guiné-Bissau e regularizar a sua cidadania.',
            'Artigo 6.º (Objetivos Específicos) - Assegurar a triagem rigorosa, tradução juramentada, organização dos dossiês, pagamento das taxas oficiais nos cofres públicos e acompanhamento contínuo até à concessão do Despacho de Naturalização, Assento de Nascimento, Bilhete de Identidade e Passaporte.'
          ]
        },
        {
          numero: 'Capítulo III',
          titulo: 'Destinatários e Beneficiários Oficiais',
          artigos: [
            '1. Diáspora Guineense: Cidadãos nascidos no estrangeiro, filhos de pai ou mãe guineense, que necessitam regularizar e obter a sua nacionalidade de origem e transcrição de registos civis.',
            '2. Cidadãos no Território Nacional: Guineenses residentes que enfrentam entraves ou demoras na obtenção de documentos essenciais (BI, Cédula Pessoal, Registo Criminal e Passaporte) para trabalho ou estudos.',
            '3. Membros da Diáspora e Retornados: Irmãos da diáspora global com raízes comprovadas ou vocação de integração, que investem e se estabelecem no país.',
            '4. Cidadãos Estrangeiros: Profissionais, cooperantes e investidores que preenchem os requisitos de residência contínua ou prestação de serviços relevantes à Guiné-Bissau.'
          ]
        },
        {
          numero: 'Capítulo IV',
          titulo: 'Parcerias Institucionais com os Órgãos do Estado',
          artigos: [
            'Artigo 7.º (Articulação Governamental) - O EMDPN-GB atua em estreita articulação com os órgãos competentes da República da Guiné-Bissau:',
            'a) Ministério da Justiça e dos Direitos Humanos: Direção-Geral dos Registos, Notariado e Identificação Civil, Conservatórias Centrais de Bissau e Cofre Geral da Justiça.',
            'b) Ministério do Interior (DIC): Direção de Migração e Fronteiras para a emissão biométrica e controlo de Passaportes.',
            'c) Ministério dos Negócios Estrangeiros e Cooperação Internacional: Assessoria documental aos processos diplomáticos e da diáspora.',
            'd) Ministério da Cultura: Para obtenção de declaração de conformidade.',
            'e) Câmara Municipal de Bissau: Atesta residência por mais de 5 anos.',
            'f) Imprensa Nacional (INACEP): Publicação formal do Despacho Ministerial no Boletim Oficial da República da Guiné-Bissau.'
          ]
        },
        {
          numero: 'Capítulo V',
          titulo: 'Princípios Éticos, Jurídicos e Compromisso de Transparência',
          artigos: [
            'Artigo 8.º (Não Burla ao Estado nem ao Cidadão) - O EMDPN-GB rejeita categoricamente qualquer prática fraudulenta, intermediários informais ou corrupção. Todos os processos são instruídos exclusivamente com base em factos comprovados e documentos autênticos.',
            'Artigo 9.º (Taxas Públicas Tabeladas) - Todas as taxas do Estado são depositadas com guia oficial no Cofre Geral da Justiça / Tesouro Público (ex.: 770.482 FCFA para naturalização por residência; 155.097 FCFA para aquisição por casamento). O EMDPN-GB cobra apenas honorários de serviço justos e transparentes.',
            'Artigo 10.º (Atendimento Humanizado) - Tratar cada requerente com a máxima dignidade, respeito e empatia, reconhecendo o valor sagrado do direito à cidadania.'
          ]
        },
        {
          numero: 'Capítulo VI',
          titulo: 'Órgãos de Gestão e Direção Executiva',
          artigos: [
            'Artigo 11.º (Composição da Direção) - A governação do EMDPN-GB é assegurada por profissionais qualificados e registados:',
            '• Diretor Gerente: Cláudio Hortiz Altip (Coordenação Estratégica, Relações Institucionais e Representação Geral)',
            '• Auxiliar Administrativo: Valdano Amoná (Gestão Processual, Protocolos Físicos e Logística Notarial)',
            '• Secretária-Geral: Isabel Sambé (Secretariado Executivo, Agendamentos Universais, Triagem e Atendimento)',
            '• Assessoria Jurídica: Juristas profissionais especializados em Direito da Nacionalidade e Direito Administrativo Guineense.'
          ]
        },
        {
          numero: 'Capítulo VII',
          titulo: 'Atendimento Universal, Agendamento e Comunicação Oficial',
          artigos: [
            'Artigo 12.º (Canais Oficiais de Tramitação) - Toda a documentação e pedidos devem ser encaminhados obrigatoriamente através dos canais oficiais reconhecidos:',
            'E-mail Oficial: infor.ciesemdpngb@gmail.com',
            'Telefone e WhatsApp Institucional: +245 957000555',
            'Artigo 13.º (Agendamento Universal) - O sistema de agendamento online do EMDPN-GB é aberto a requerentes de qualquer país do mundo, com adaptação a fusos horários e canais digitais (Google Meet / WhatsApp Video).'
          ]
        },
        {
          numero: 'Capítulo VIII',
          titulo: 'Disposições Finais e Garantia de Confidencialidade',
          artigos: [
            'Artigo 14.º (Segurança de Dados) - Todos os documentos pessoais, certidões de nascimento, registos criminais e passaportes confiados ao EMDPN-GB gozam de sigilo profissional absoluto e proteção integral nos termos da legislação aplicável.',
            'Artigo 15.º (Vigência) - O presente Estatuto rege todas as intervenções do Escritório a partir da data da sua aprovação e depósito pelas instâncias competentes.'
          ]
        }
      ],

      // Organs tab
      organs: [
        {
          name: 'Cláudio Hortiz Altip',
          role: 'Diretor Gerente',
          description: 'Coordenação estratégica, articulação com ministérios de Estado e representação institucional do EMDPN-GB.'
        },
        {
          name: 'Valdano Amoná',
          role: 'Auxiliar Administrativo',
          description: 'Gestão processual em cartório, triagem documental, protocolos físicos e logística notarial em Bissau.'
        },
        {
          name: 'Isabel Sambé',
          role: 'Secretária-Geral',
          description: 'Secretariado executivo, atendimento ao público, triagem primária e gestão de agendamentos internacionais.'
        }
      ],

      // Partnerships tab
      partnershipsTitle: 'Articulação Institucional e Governamental',
      partnershipsDesc: 'O EMDPN-GB atua em estreita articulação com os órgãos de soberania da República da Guiné-Bissau para garantir que todos os processos de naturalização, registo civil, emissão de Bilhete de Identidade e Passaporte cumpram rigorosamente as leis da República.',
      partnershipsList: [
        {
          name: 'Ministério da Justiça',
          desc: 'Conservatórias dos Registos Centrais e Cofre Geral da Justiça.'
        },
        {
          name: 'Ministério do Interior (DIC)',
          desc: 'Direção de Migração e Fronteiras e Emissão de Passaportes.'
        },
        {
          name: 'Ministério dos Negócios Estrangeiros',
          desc: 'Apoio consular à Diáspora Guineense espalhada pelo mundo.'
        },
        {
          name: 'Ministério da Cultura',
          desc: 'Para obtenção de declaração de conformidade.'
        },
        {
          name: 'Câmara Municipal de Bissau',
          desc: 'Atesta residência por mais de 5 anos.'
        }
      ],

      // Principles tab
      principlesCommitmentTitle: 'Compromisso Ético & Jurídico',
      principlesCommitmentQuote: '"O nosso compromisso é não burlar o Estado Guineense nem o nosso cliente."',
      principlesCommitmentDesc: 'Rejeitamos intermediários informais ou esquemas paralelos. Todas as taxas públicas são depositadas diretamente nos cofres do Estado, garantindo total transparência, segurança jurídica e salvaguarda absoluta dos dados e documentos dos requerentes.',

      // Support Form
      supportSectionTitle: 'Canal de Apoio Solidário, Donativos & Feedback',
      supportSectionSubtitle: 'Espaço aberto para contributos voluntários, doações sem exigência de reciprocidade, e avaliação da nossa atuação.',
      supportFormTitle: 'Ficha de Apoio Voluntário e Feedback',
      supportFormDesc: 'A sua colaboração ajuda a manter a assistência jurídica acessível e os nossos canais operacionais com máxima segurança e transparência.',
      fieldName: 'Nome Completo',
      fieldEmail: 'E-mail Oficial',
      fieldPhone: 'Telefone / WhatsApp',
      fieldSupportType: 'Tipo de Apoio ou Mensagem',
      fieldAmount: 'Montante do Apoio Voluntário (Opcional)',
      fieldCustomAmount: 'Outro Montante (FCFA / EUR / USD)',
      fieldOfficeSupplies: 'Especificação do Material de Escritório *',
      fieldFeedback: 'Comentários, Sugestões ou Avaliação dos Serviços',
      placeholderFeedback: 'Escreva aqui o seu comentário, feedback ou notas sobre o seu apoio voluntário...',
      btnSubmitSupport: 'Submeter Apoio / Feedback com Confidencialidade',
      securityAssurance: 'Protocolo de Segurança Ativo: Dados protegidos contra acessos indevidos e tratados em sigilo notarial absoluto.',

      // Headquarter Location
      locationBadge: 'Sede Central do EMDPN-GB',
      locationTitle: 'Onde Nos Encontrar',
      locationAddressTitle: 'Endereço Físico:',
      locationAddressValue: 'Safim Centro / Reino, Setor de Safim, Região de Biombo, Guiné-Bissau',
      locationPhoneTitle: 'Telefone & WhatsApp:',
      locationEmailTitle: 'E-mail Oficial:',
      btnLocationSchedule: 'Agendar Atendimento',
      btnLocationContacts: 'Ver Mais Contactos'
    },
    services: {
      title: 'Nossos Serviços & Organização Documental',
      subtitle: 'Soluções ágeis, Agendamento de pedido de visto e cadeia documental organizada em ordem crescente rigorosa.',
      catalogBadge: 'Catálogo de Serviços Oficiais',
      catalogTitle: 'Atendimento Especializado',
      catalogDesc: 'Desde o atendimento expresso para quem tem viagem marcada até à tramitação completa de processos de nacionalidade.',
      ascendingTitle: 'Cadeia de Documentos em Ordem Crescente',
      ascendingSubtitle: 'A legislação guineense exige que cada documento seja emitido com base no anterior:',
      commitmentTitle: 'Compromisso com a Celeridade',
      commitmentDesc: 'Sabemos que o seu tempo é precioso. O nosso escritório utiliza canais diretos e legais para garantir que o seu processo não fique parado em gavetas administrativas.',
      btnBookAppointment: 'SOLICITAR AGENDAMENTO',
      serviceTravel: 'Agendamento de pedido de visto de Viagem/ consulta nas embaçadas',
      serviceTravelDesc: 'Atendimento prioritário de emergência para passageiros com bilhete emitido, compromissos internacionais e vistos inadiáveis.',
      serviceDiaspora: 'Naturalização para a Diáspora',
      serviceDiasporaDesc: 'Apoio completo a guineenses e à diáspora no estrangeiro que desejam obter a sua nacionalidade e regularizar a sua documentação.',
      serviceDocChain: 'Documentação Nacional em Sequência Legal',
      serviceDocChainDesc: 'Tratamos da obtenção e regularização dos documentos em ordem legal crescente para cidadãos residentes e no estrangeiro.',
      serviceTranslation: 'Tradução e Legalização Oficial',
      serviceTranslationDesc: 'Serviços de tradução juramentada para Português de documentos emitidos no estrangeiro e respetivas autenticações ministeriais.',
      serviceRepresentation: 'Representação Institucional em Bissau',
      serviceRepresentationDesc: 'A nossa equipa atua presencialmente como Parceiro de Estado junto do Ministério da Justiça e Interior, acompanhando o seu dossiê diariamente.'
    },
    process: {
      title: 'O Processo Oficial',
      subtitle: 'Conheça o caminho passo a passo até à sua cidadania e emissão de documentos.',
      step1Title: '1. Consulta e Diagnóstico',
      step1Desc: 'Analisamos o seu perfil e documentos. Se for viável, enviamos o orçamento e a lista personalizada de documentos em falta.',
      step2Title: '2. Preparação do Dossiê',
      step2Desc: 'Tratamos das traduções, autenticações e legalizações. O seu dossiê é montado seguindo rigorosamente os padrões oficiais.',
      step3Title: '3. Submissão e Tramitação',
      step3Desc: 'O processo é entregue no Ministério da Justiça. A nossa equipa em Bissau acompanha as várias fases de pareceres e despachos.',
      step4Title: '4. Registo e Documentação',
      step4Desc: 'Após a emissão do despacho favorável, proceder-se-á ao assento de nascimento. Orientaremos e acompanharemos a emissão oficial do Bilhete de Identidade (BI) e do Passaporte.',
      timelineBadge: 'Prazos & Tempo Estimado',
      timelineTitle: 'Tempo Médio: 1 a 12 Meses',
      timelineDesc: 'O prazo varia de acordo com as certidões necessárias e a carga de trabalho dos serviços do Estado guineense.',
      btnDelayJustification: 'Ver Justificativa Completa de Demora (Estado vs. Documentos) →',
      btnEstimateCase: 'Pedir Estimativa para o Meu Caso'
    },
    requirements: {
      title: 'Requisitos & Documentação Exigida',
      subtitle: 'Lista completa e oficial de documentos necessários por tipo de pedido e taxas do Cofre Geral.',
      catResidence: 'Naturalização por Residência',
      catMarriage: 'Nacionalidade por Casamento',
      catDescent: 'Nacionalidade por Descendência / Ancestralidade',
      catOrigin: 'Aquisição por Origem (Filhos de Guineenses)',
      officialFeeLabel: 'Taxa Oficial do Cofre Geral da Justiça',
      docsOriginLabel: 'Documentos do País de Origem',
      docsGuineaLabel: 'Documentos a Emitir na Guiné-Bissau',
      btnRequestGuide: 'Solicitar Guia Completo via WhatsApp'
    },
    faq: {
      title: 'Dúvidas Frequentes',
      subtitle: 'Informações essenciais sobre a nossa atuação e os processos legais na Guiné-Bissau.',
      helpTitle: 'Ainda tem dúvidas específicas?',
      helpDesc: 'A nossa equipa jurídica está pronta para analisar o seu caso particular.',
      btnSpeakTeam: 'Falar com a Equipa Jurídica'
    },
    contact: {
      title: 'Contacte-nos',
      subtitle: 'Estamos à sua disposição em Safim/Bissau e através dos canais digitais oficiais.',
      chatTitle: 'Atendimento WhatsApp Direto',
      chatDesc: 'Fale em tempo real com a nossa equipa de consultores.',
      btnOpenWhatsApp: 'Abrir WhatsApp (+245 957000555)',
      officeTitle: 'Sede Principal em Bissau',
      officeAddress: 'Safim Centro / Reino, Setor de Safim, Região de Biombo, Guiné-Bissau',
      hoursTitle: 'Horário de Atendimento',
      hoursDesc: 'Segunda a Sexta: 08h00 – 17h00 | Sábado: 09h00 – 13h00',
      emailTitle: 'E-mail Oficial Único',
      formTitle: 'Envie-nos uma Mensagem',
      formDesc: 'Preencha o formulário e entraremos em contacto no prazo de 24 horas úteis.',
      labelName: 'Nome Completo *',
      placeholderName: 'Nome e Apelido Completo',
      labelEmail: 'O Seu E-mail *',
      labelPhone: 'Telefone / WhatsApp *',
      labelService: 'Serviço Pretendido',
      labelMessage: 'Mensagem / Descrição da sua situação *',
      btnSend: 'Enviar Mensagem Oficial',
      btnSending: 'A processar envio...',
      sendSuccess: 'Mensagem registada com sucesso! A nossa equipa entrará em contacto brevemente.'
    },
    downloads: {
      title: 'Formulários & Modelos de Requerimento',
      subtitle: 'Consulte e descarregue os modelos oficiais antes de submeter o seu processo.',
      tabReading: 'Modo de Leitura Completo',
      tabOriginalDoc: 'Visualizador do Documento Original',
      tabTemplates: 'Modelos Oficiais & Pré-visualização',
      transcriptionBadge: 'Transcrição Fiel do Documento da Conservatória',
      btnCopyFull: 'Copiar Texto Integral',
      copiedToast: 'Transcrição copiada para a área de transferência!',
      originalDocTitle: 'Folha Oficial da Conservatória dos Registos Centrais',
      originalDocSubtitle: 'Fotografia do documento oficial com carimbo do Cofre Geral da Justiça.',
      btnOpenHD: 'Abrir em Alta Resolução',
      notePrefix: 'Nota do EMDPN-GB:',
      noteContent: 'O nosso escritório prepara todos estes atestados junto da Câmara Municipal de Bissau, Ministério da Cultura, Migração e Fronteiras, bem como as traduções juramentadas.',
      seqBadge: 'Sequência Legal Obrigatória',
      seqTitle: 'Modelos de Documentos em Ordem Crescente',
      seqSubtitle: 'Pré-visualize diretamente no navegador ou descarregue os formulários organizados na cadeia processual correta, da Cédula Pessoal ao Histórico Ancestral.',
      btnPreview: 'Pré-visualizar',
      btnDownload: 'Descarregar',
      helpTitle: 'Precisa de Ajuda no Preenchimento do Dossiê?',
      helpDesc: 'Caso tenha dúvidas sobre como preencher a Cédula, o Histórico Ancestral ou a Petição, a equipa do EMDPN-GB realiza o preenchimento assistido presencialmente ou por WhatsApp.',
      btnAssisted: 'Agendar Atendimento Assistido',
      btnWhatsApp: 'Falar no WhatsApp',
      modalTitle: 'Pré-visualização do Modelo Oficial',
      modalClose: 'Fechar',
      btnCopyText: 'Copiar Texto',
      btnDownloadFile: 'Descarregar Ficheiro',
      downloadSuccessToast: 'Modelo descarregado com sucesso!',
      republicTitle: 'REPÚBLICA DA GUINÉ-BISSAU',
      quickSearch: {
        title: 'Pesquisa Rápida de Agendamento',
        placeholder: 'Digite o nº de protocolo (ex: EMDPN-2026-...) ou nome...',
        btnSearch: 'Procurar Agendamento',
        notFound: 'Nenhum agendamento encontrado com este número ou nome. Por favor, verifique o número de protocolo ou consulte a página de Agendamentos.',
        resultsTitle: 'Resultados da Pesquisa:',
        close: 'Fechar',
        viewTracker: 'Ir para Consulta Completa'
      },
      templates: [
        {
          step: '01',
          title: 'Requerimento de Cédula Pessoal / Assento de Nascimento',
          tag: '1º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Formulário oficial de busca, transcrição e emissão de 1ª via ou certidão narrativa de nascimento na Conservatória dos Registos Centrais.'
        },
        {
          step: '02',
          title: 'Requerimento de Certificado de Registo Criminal',
          tag: '2º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Modelo de petição para emissão de registo criminal da Guiné-Bissau e comprovação de idoneidade cívica e judicial.'
        },
        {
          step: '03',
          title: 'Ficha de Pedido de Bilhete de Identidade (BI)',
          tag: '3º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Ficha de inscrição de identificação civil guineense para agendamento de recolha de dados e emissão de Bilhete de Identidade.'
        },
        {
          step: '04',
          title: 'Termo de Apresentação e Validação de Cópia de Passaporte',
          tag: '4º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Ficha de conferência, tradução e autenticação notarial de cópia de passaporte internacional, vistos e carimbos de entrada.'
        },
        {
          step: '05',
          title: 'Declaração de Apresentação de Certificado de DNA',
          tag: '5º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Termo de submissão de laudo genético de ancestralidade e vinculação biológica para processos de retorno da diáspora africana.'
        },
        {
          step: '06',
          title: 'Dossiê de Histórico Ancestral e Árvore Genealógica',
          tag: '6º Passo Crescente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Formulário completo de linhagem familiar, comprovação de ascendência guineense e fundamentação do pedido de nacionalidade.'
        },
        {
          step: '07',
          title: 'Formulário Oficial de Pedido de Naturalização',
          tag: 'Processo Geral',
          size: 'Microsoft Word (.docx)',
          desc: 'Formulário completo de identificação e requerimento do processo junto das autoridades guineenses.'
        },
        {
          step: '08',
          title: 'Modelo de Carta de Petição ao Ministério da Justiça',
          tag: 'Petição Formal',
          size: 'Microsoft Word (.docx)',
          desc: 'Petição formal com fundamentação jurídica ao Excelentíssimo Senhor Ministro da Justiça.'
        },
        {
          step: '09',
          title: 'Modelo de Procuração Forense e Administrativa',
          tag: 'Representação Legal',
          size: 'Microsoft Word (.docx)',
          desc: 'Instrumento de representação legal para que a nossa equipa em Bissau possa tramitar o seu dossiê.'
        }
      ]
    },
    news: {
      title: 'Notícias & Comunicados',
      subtitle: 'Mantenha-se informado sobre a lei da nacionalidade, decretos e novidades institucionais.',
      btnReadMore: 'Ler mais'
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      legalNote: 'EMDPN-GB — Atuação em estrita conformidade com a Lei da Nacionalidade da República da Guiné-Bissau.',
      officialEmailTitle: 'E-mail Oficial:',
      phoneTitle: 'Telefone / WhatsApp:',
      locationTitle: 'Localização:',
      hoursTitle: 'Horário Notarial:',
      hoursValue: 'Seg - Sex: 08:00 - 17:00 | Sáb: 09:00 - 13:00'
    },
    delayJustification: {
      title: 'Justificativa Oficial de Prazos e Demora Processual',
      subtitle: 'Esclarecimento profissional sobre o tempo de espera (1 a 12 meses) e os fatores determinantes na tramitação do Estado e dos documentos.',
      backLink: 'Voltar à Página do Processo',
      bannerBadge: 'Transparência Jurídica & Realidade Administrativa',
      bannerTitle: 'Tempo Estimado: Entre 1 a 12 Meses',
      bannerDesc: 'A aquisição de nacionalidade e a emissão de documentos oficiais na República da Guiné-Bissau é um ato solene de soberania estatal. Cada processo passa por rigorosas fases de conferência jurídica, investigações de registo e despachos ministeriais.',
      averageTitle: 'Média de Conclusão',
      averageValue: '1 a 12 Meses',
      averageDesc: 'Conforme modalidade e complexidade',
      factorsBadge: 'Fatores Determinantes',
      factorsTitle: 'As Duas Razões Fundamentais de Demora',
      factorsSubtitle: 'Compreenda as distinções entre os prazos dos órgãos do Estado e a conformidade do andamento dos documentos.',
      cause1Badge: 'Causa Administrativa 01',
      cause1Title: 'Demora por Parte do Estado & Ministérios',
      cause1Desc: 'Mesmo com o dossiê devidamente instruído, o processo depende exclusivamente de despachos do Poder Executivo e conferências nos livros físicos e digitais do Estado:',
      cause1Point1Title: 'Conservatória dos registros centrais:',
      cause1Point1Desc: 'Busca e confrontação minuciosa nos livros antigos de registo civil em Bissau para garantir a legitimidade dos assentos de nascimento.',
      cause1Point2Title: 'Pareceres da Segurança & Migração:',
      cause1Point2Desc: 'Emissão de atestados de conformidade e verificação pelo Serviço de Migração e Fronteiras (Secretaria de Estado da Ordem Pública).',
      cause1Point3Title: 'Despacho Ministerial & Assinaturas:',
      cause1Point3Desc: 'O Ministro da Justiça aprecia e assina formalmente os despachos de concessão ou reconhecimento de nacionalidade.',
      cause1Point4Title: 'A ser mudada após a publicação na Imprensa Nacional:',
      cause1Point4Desc: 'Em casos de naturalização, o ato e a alteração jurídica passa a ser mudada após a publicação formal na Imprensa Nacional (Boletim Oficial).',
      cause1ActionTitle: 'Como o EMDPN-GB atua:',
      cause1ActionDesc: 'A nossa equipa presencial em Safim e Bissau realiza vigilância semanal no Ministério da Justiça para evitar que o processo permaneça parado em secretarias.',
      cause2Badge: 'Causa Documental 02',
      cause2Title: 'Demora pelo Andamento & Provas Documentais',
      cause2Desc: 'O ritmo do processo depende diretamente da autenticidade, clareza e rapidez na emissão das certidões e certificados fornecidos pelo próprio requerente:',
      cause2Point1Title: 'Suprimir notarial prévia:',
      cause2Point1Desc: 'Divergências ortográficas entre a cédula pessoal, passaporte ou certidões dos pais exigem retificação e supressão notarial prévia.',
      cause2Point2Title: 'Legalizações Consulares e Apostilas:',
      cause2Point2Desc: 'Documentos emitidos no estrangeiro, Europa ou outros países precisam de carimbo consular ou legalização para terem validade legal na Guiné-Bissau.',
      cause2Point3Title: 'Certidões Negativas e Registo Criminal:',
      cause2Point3Desc: 'Obtenção de registos criminais dos países onde o requerente residiu nos últimos 5 anos com respetiva tradução juramentada para Português.',
      cause2Point4Title: 'Comprovações de Ascendência & ADN:',
      cause2Point4Desc: 'Nos casos da diáspora que recorrem à ancestralidade, laudos de ADN e estudos genealógicos passam por verificação prévia de conformidade.',
      cause2ActionTitle: 'Como o EMDPN-GB agiliza:',
      cause2ActionDesc: 'Auditamos todos os seus documentos antes da entrada formal, eliminando 98% dos riscos de notificação e atrasos por divergências de nomes.'
    },
    appointments: {
      title: 'Agendamento de Atendimento e Documentos',
      subtitle: 'Marque a sua consulta presencial ou remota com a equipa jurídica do EMDPN-GB.',
      tabNew: 'Novo Agendamento',
      tabTrack: 'Consultar por Protocolo',
      tabRates: 'Tabela de Serviços & Taxas',
      
      wizardBadge: 'Agendamento Universal & Diáspora',
      wizardTitle: 'Marcação de Atendimento & Documentação',
      stepOf: 'Passo {current} de {total}',
      steps: {
        service: '1. Serviço',
        modality: '2. Modalidade',
        details: '3. País & Dados',
        confirm: '4. Confirmação'
      },

      step1Title: 'Selecione o Serviço Legal Pretendido:',
      step1Subtitle: 'Processos de nacionalidade, naturalização e documentos oficiais da República da Guiné-Bissau.',
      
      services: {
        travel: {
          category: 'Viagem & Urgência',
          name: 'Agendamento por Viagem (Urgência & Voo)',
          fee: 'Taxa Notarial de Urgência',
          desc: 'Atendimento prioritário de emergência para passageiros com bilhete emitido, voos próximos, obtenção ou renovação expressa de passaportes e vistos.',
          estimate: 'Atendimento prioritário imediato (24h a 48h)'
        },
        naturalization: {
          category: 'Naturalização',
          name: 'Aquisição de Nacionalidade por Naturalização',
          fee: '770.482 FCFA',
          desc: 'Para estrangeiros residentes há mais de 5 anos no território guineense.',
          estimate: '45 min de atendimento inicial'
        },
        marriage: {
          category: 'Naturalização',
          name: 'Aquisição de Nacionalidade por Casamento',
          fee: '155.097 FCFA',
          desc: 'Para cônjuges casados há mais de 3 anos com cidadãos guineenses ao abrigo da lei.',
          estimate: '30 min de atendimento inicial'
        },
        descent: {
          category: 'Nacionalidade',
          name: 'Nacionalidade por Descendência (Membros da Diáspora)',
          fee: 'Taxa Notarial + Despacho',
          desc: 'Para membros da diáspora guineense e comunidade internacional de retorno.',
          estimate: '40 min de atendimento'
        },
        nameRectification: {
          category: 'Documentos',
          name: 'Processos de Alteração e Retificação de Nome',
          fee: 'Taxa Notarial dos Registos Centrais',
          desc: 'Retificação judicial e administrativa de certidões, uniformização ortográfica e correção de erros materiais.',
          estimate: '35 min de consulta'
        },
        passport: {
          category: 'Identificação',
          name: 'Emissão e Renovação de Passaporte Guineense',
          fee: 'Taxa Oficial da DIC',
          desc: 'Agendamento para recolha biométrica e acompanhamento célere do pedido.',
          estimate: '30 min de atendimento'
        },
        identityCard: {
          category: 'Identificação',
          name: 'Emissão de Bilhete de Identidade (BI)',
          fee: 'Taxa Oficial de Identificação Civil',
          desc: 'Emissão 1ª via ou renovação de BI para cidadãos residentes e no estrangeiro.',
          estimate: '25 min de atendimento'
        },
        criminalRecord: {
          category: 'Documentos',
          name: 'Certificado de Registo Criminal',
          fee: 'Taxa Oficial da Justiça',
          desc: 'Emissão célere do registo criminal guineense para fins de estudo, trabalho e vistos.',
          estimate: '20 min de atendimento'
        },
        birthCertificate: {
          category: 'Documentos',
          name: 'Cédula Pessoal / Assento de Nascimento',
          fee: 'Taxa da Conservatória',
          desc: 'Busca, transcrição e emissão de certidões nos Registos Centrais de Bissau.',
          estimate: '25 min de atendimento'
        }
      },

      step2Title: 'Modalidade e Horário de Atendimento:',
      step2Subtitle: 'Atendimento universal disponível presencialmente ou remoto para requerentes em qualquer país do mundo.',
      presencialTitle: 'Presencial no Escritório',
      presencialDesc: 'Safim Centro / Reino, Guiné-Bissau',
      onlineTitle: 'Atendimento Universal Online',
      onlineDesc: 'Para Diáspora na Europa, América e qualquer país',
      dateLabel: 'Data Desejada',
      dateNote: 'Atendimento de Segunda a Sábado',
      timeLabel: 'Horário Disponível (GMT Bissau)',
      timeNote: 'Para requerentes no estrangeiro adaptamos o fuso horário',

      step3Title: 'País de Residência & Dados do Requerente:',
      step3Subtitle: 'Agendamento de forma universal para cidadãos e interessados de qualquer país do mundo.',
      countryLabel: 'País Onde se Encontra Atualmente *',
      customCountryLabel: 'Especifique o seu País:',
      customCountryPlaceholder: 'Nome do seu país de residência...',
      fullNameLabel: 'Nome Completo do Solicitante *',
      fullNamePlaceholder: 'Nome e Apelido completo',
      phoneLabel: 'Telefone / WhatsApp com Indicativo *',
      phonePlaceholder: '+245 ...',
      emailLabel: 'O Seu E-mail',
      emailPlaceholder: 'seuemail@exemplo.com',
      docLabel: 'Nº do Passaporte ou BI Atual',
      docPlaceholder: 'Ex.: Passaporte / Documento',
      channelLabel: 'Canal Preferencial de Contacto:',
      channelOptions: {
        whatsapp: 'WhatsApp (Mensagens e Chamada)',
        meet: 'Google Meet / Videochamada',
        email: 'E-mail Oficial',
        office: 'Presencial na Sede em Bissau'
      },
      notesLabel: 'Observações ou Caso Específico (Opcional):',
      notesPlaceholder: 'Ex: filho da mãe ou pai guineense nascido no estrangeiro',
      officialEmailTitle: 'E-mails Oficiais para Encaminhamento de Documentos:',
      officialBadge: 'Oficiais EMDPN-GB',
      validationError: 'Por favor, preencha o seu Nome e Apelido completo e o Telefone / WhatsApp.',

      successTitle: 'Agendamento Universal Concluído!',
      successSubtitle: 'O seu atendimento foi agendado com sucesso e o protocolo oficial foi emitido.',
      protocolBadge: 'Protocolo Oficial EMDPN-GB',
      statusConfirmed: 'CONFIRMADO',
      statusPending: 'PENDENTE',
      statusCompleted: 'CONCLUÍDO',
      statusCancelled: 'CANCELADO',
      labelService: 'Serviço:',
      labelFee: 'Taxa Oficial:',
      labelDateTime: 'Data e Hora:',
      labelCountry: 'País de Residência:',
      labelApplicant: 'Requerente:',
      labelChannel: 'Canal:',
      labelOfficialEmail: 'E-mail Oficial de Receção:',
      emailConfirmationSent: 'E-mail de confirmação enviado automaticamente com sucesso para {email}!',
      emailOfficialCc: 'Cópia enviada para os serviços oficiais do EMDPN-GB.',
      btnResendEmail: 'Reenviar E-mail de Confirmação',
      btnSendWhatsApp: 'Enviar Comprovativo no WhatsApp',
      btnSendEmail: 'Encaminhar aos 2 E-mails Oficiais',
      btnDownload: 'Baixar Comprovativo (.TXT)',
      protocolSaveNote: 'Guarde este protocolo {protocol}. Pode consultá-lo a qualquer momento através do campo de rastreio no site.',
      toastSuccess: 'Agendamento confirmado com sucesso! Protocolo: ',

      btnBack: 'Voltar',
      btnContinue: 'Continuar',
      btnConfirm: 'Confirmar Agendamento Universal',

      trackerBadge: 'Rastreio Rápido',
      trackerTitle: 'Consultar Estado do Agendamento',
      trackerSubtitle: 'Insira o seu Nº de Protocolo (ex: EMDPN-2026-1042) ou o seu Telefone para verificar o status.',
      trackerPlaceholder: 'Ex.: EMDPN-2026-1042 ou +245...',
      btnSearch: 'Consultar',
      trackerNotFoundTitle: 'Nenhum agendamento encontrado com o protocolo ou contacto informado.',
      trackerNotFoundDesc: 'Verifique se digitou o protocolo corretamente ou entre em contacto com a nossa equipa pelo WhatsApp +245 957000555.',
      trackerConfirmedBadge: 'Protocolo Confirmado',
      trackerFeeLabel: 'Taxa do Cofre Geral:',
      trackerQuestions: 'Dúvidas sobre o agendamento?',
      trackerSpeakBtn: 'Falar com Atendente',

      ratesTitle: 'Serviços e Taxas Oficiais de Agendamento',
      ratesSubtitle: 'Valores oficiais fixados pelas autoridades competentes da Guiné-Bissau.',
      btnBookService: 'Agendar',

      infoLocationTitle: 'Localização',
      infoLocationDesc: 'Safim Centro / Reino, Setor de Safim, Guiné-Bissau.',
      infoHoursTitle: 'Horário Oficial',
      infoHoursDesc: 'Segunda a Sexta: 08:30 - 17:30 | Sábado: 09:00 - 13:00',
      infoSecurityTitle: 'Atendimento Seguro',
      infoSecurityDesc: 'Garantia de taxas do Estado sem despesas ilegais.'
    }
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      requirements: 'Conditions',
      process: 'Procédure',
      forms: 'Formulaires',
      faq: 'FAQ',
      news: 'Actualités',
      contact: 'Contacts',
      book: 'Prendre RDV',
      admin: 'Administration',
      login: 'Connexion',
      subtitle: 'NATURALISATION · GUINÉE-BISSAU',
      scheduleOnline: 'Prendre Rendez-vous en Ligne',
      adminAccess: 'Accéder à l’Espace Administratif',
      language: 'Langue'
    },
    hero: {
      republicPrefix: 'République de',
      republicSuffix: 'Guinée-Bissau',
      titleLine1: 'Votre première et seconde patrie.',
      titleLine2: 'Votre citoyenneté est notre engagement !',
      description: 'L’EMDPN-GB est une structure de conseil et d’appui technico-administratif basée à Safim, région de Biombo, Guinée-Bissau, dédiée à l’orientation, l’assistance et l’instruction des démarches de nationalité, citoyenneté, naturalisation et état civil.',
      ctaBook: 'PRENDRE RENDEZ-VOUS / DEMANDE',
      ctaWhatsapp: 'SERVICE WHATSAPP DIRECT',
      ctaProcess: 'DÉCOUVRIR LE PROCESSUS',
      officialBadge: 'Bureau Officiel des Registres et Naturalisations · Bissau',
      photoCaption: 'Accueil en présentiel et à distance d’assistance documentaire en collaboration avec le Ministère de la Justice et des Droits de l’Homme de la Guinée-Bissau.'
    },
    metrics: {
      completedTitle: 'Dossiers Clôturés',
      completedDesc: 'Avec avis favorable',
      timelineTitle: 'Délai Moyen d’Attente',
      timelineValue: '1 à 12 Mois',
      timelineDesc: 'Délai légal réglementé',
      timelineLink: 'Voir la Justification Complète des Délais',
      satisfactionTitle: 'Taux de Satisfaction',
      satisfactionDesc: 'Transparence et rigueur',
      diasporaTitle: 'Pays Desservis',
      diasporaDesc: 'Diaspora et coopération mondiale'
    },
    audience: {
      sectionTitle: 'À Qui S’adresse Notre Service ?',
      sectionSubtitle: 'Assistance juridique spécialisée adaptée à chaque statut de nationalité bissau-guinéenne',
      card1Title: '1. Citoyens sur le Territoire National',
      card1Desc: 'Résidents guinéens rencontrant des difficultés pour obtenir leurs documents (Extrait d’Acte, Carte d’Identité, Casier Judiciaire, Passeport) pour études, travail ou soins de santé à l’étranger.',
      card2Title: '2. Diaspora Bissau-Guinéenne',
      card2Desc: 'Bissau-Guinéens nés à l’étranger, enfants de père ou mère guinéen(ne), souhaitant obtenir leur nationalité d’origine et leurs pièces d’identité.',
      card3Title: '3. Descendants de Guinée-Bissau dans la Diaspora et Retour',
      card3Desc: 'Les descendants d’origine bissau-guinéenne qui décident de retourner sur la terre ancestrale et d’établir des liens juridiques, culturels et historiques avec la Guinée-Bissau.',
      card4Title: '4. Citoyens Éligibles à la Nationalité',
      card4Desc: 'Professionnels, investisseurs, coopérants et requérants qui, conformément à la loi, ont le droit de demander, faire reconnaître ou acquérir la nationalité.'
    },
    bookingSection: {
      title: 'Portail de Rendez-vous et Suivi de Dossier',
      subtitle: 'Planifiez votre consultation présentielle ou en visioconférence, ou consultez l’état d’avancement de votre dossier en direct.',
      tabBook: 'Nouveau Rendez-vous',
      tabTrack: 'Consulter un Rendez-vous',
      noticeTravel: 'Comprend l’option « Rendez-vous pour Demande de Visa de Voyage » urgent avec traitement consulaire prioritaire.'
    },
    partners: {
      title: 'Coordination Institutionnelle avec l’État',
      subtitle: 'Nous intervenons en tant que Partenaire d’État pour la conformité et l’accélération des formalités régaliennes',
      partner1: 'Ministère de la Justice',
      partner1Role: 'Direction Générale de l’Identification Civile, Registres et Notariat',
      partner2: 'Ministère de l’Intérieur (DIC)',
      partner2Role: 'Direction de la Migration et Frontières / Émission des Passeports',
      partner3: 'Ministère des Affaires Étrangères',
      partner3Role: 'Coopération Internationale, Soutien à la Diaspora et Traduction de Documents',
      partner4: 'Ministère de la Culture',
      partner4Role: 'Pour l’obtention de la déclaration de conformité',
      partner5: 'Mairie de Bissau (Câmara Municipal)',
      partner5Role: 'Atteste la résidence depuis plus de 5 ans'
    },
    about: {
      title: 'À Propos de l’EMDPN-GB',
      subtitle: 'Structure institutionnelle, mission juridique et action officielle en tant que Partenaire d’État en Guinée-Bissau.',
      tabStatus: 'Statut Institutionnel',
      tabOrgans: 'Organes & Ministères',
      tabPartnership: 'Partenariats d’État',
      tabPrinciples: 'Principes & Rigueur',
      missionTitle: 'Mission & Vocation',
      missionDesc: 'Garantir à chaque demandeur une procédure rigoureuse, transparente et en stricte conformité avec le Code de la Nationalité de la Guinée-Bissau.',

      // Presentation
      introBadge: 'Présentation Institutionnelle · Safim / Biombo',
      introTitle: 'Votre Première et Seconde Patrie.',
      introMotto: '"Votre citoyenneté est notre engagement !"',
      introDesc: 'L’EMDPN-GB est une structure de conseil et d’appui technico-administratif basée à Safim, région de Biombo, Guinée-Bissau, dédiée à l’orientation, l’assistance et l’instruction des démarches de nationalité, citoyenneté, naturalisation et état civil.',
      ourMissionTitle: 'Notre Mission',
      ourMissionDesc: 'Faciliter l’accès des citoyens à leurs droits d’identité et de citoyenneté, en fournissant des services d’orientation et de soutien pour l’organisation, la préparation, l’enregistrement et le suivi des dossiers auprès des institutions publiques compétentes.',
      scopeTitle: 'Champ d’Application et Destinataires',
      scopeDesc: 'Notre travail s’adresse aux citoyens guinéens résidant sur le territoire national, aux membres de la diaspora guinéenne à travers le monde et à toutes les personnes qui, selon la loi applicable, ont le droit de demander, faire reconnaître ou acquérir la nationalité guinéenne. Le cabinet agit en étroite articulation avec des juristes professionnels et consultants spécialisés pour garantir le droit à l’acquisition de la nationalité.',
      btnBookOnline: 'Prendre Rendez-vous en Ligne',
      btnContactDirector: 'Contacter la Direction',
      sealTitle: 'EMDPN-GB · Sceau et Équipe Officielle',
      sealLocation: 'Safim Centre / Royaume · Guinée-Bissau',
      photoAlt: 'Équipe Officielle de l’EMDPN-GB avec Passeport Guinéen',

      // 7 Procedures
      procBadge: 'Champ d’Action & Procédures',
      procTitle: 'Procédures d’Assistance et de Régularisation',
      procSubtitle: 'Nous apportons notre appui dans différentes procédures, assurant une orientation technique et administrative :',
      procedures: [
        {
          title: '1. Procédures d’attribution et de reconnaissance de la nationalité',
          desc: 'Instruction documentaire pour citoyens par origine, filiation et transcription aux Registres Centraux.'
        },
        {
          title: '2. Procédures de nationalité par mariage',
          desc: 'Suivi de la procédure légale pour conjoints ayant plus de 3 ans de mariage légal avec un citoyen guinéen, au titre de l’article 8 de la loi sur la nationalité.'
        },
        {
          title: '3. Procédures de naturalisation',
          desc: 'Conseil et constitution de dossier pour ressortissants étrangers et membres de la diaspora en vertu de l’article 9 de la loi sur la nationalité.'
        },
        {
          title: '4. Procédures de modification et rectification des noms et prénoms sur les registres d’état civil, correction d’erreurs matérielles et uniformisation orthographique entre documents.',
          desc: 'Rectification des actes d’état civil pour harmonisation orthographique des noms et prénoms.'
        },
        {
          title: '5. Orientation pour l’organisation et la régularisation des documents d’état civil',
          desc: 'Assistance pour l’obtention et le renouvellement de l’Acte de Naissance, Carte d’Identité (BI), Casier Judiciaire pour l’obtention du Passeport.'
        },
        {
          title: '6. Soutien administratif dans la préparation des requêtes et dossiers',
          desc: 'Élaboration technique de requêtes types, vérification préalable de conformité, copies certifiées conformes et traductions officielles.'
        },
        {
          title: '7. Orientation sur les démarches juridiques et administratives applicables',
          desc: 'Éclaircissements sur les procédures auprès des institutions étatiques compétentes.',
          fullWidth: true
        }
      ],

      // Bridge and Principles
      bridgeBadge: 'Passerelle Institutionnelle',
      bridgeTitle: 'Passerelle entre Citoyens, Diaspora et l’État',
      bridgeDesc: 'L’EMDPN-GB s’efforce d’établir une passerelle solide entre les citoyens, la diaspora et les institutions responsables de la justice, de l’état civil et de la nationalité, favorisant un service accessible, organisé, transparent et efficace.',
      bridgeHighlight: 'Accessibilité · Organisation · Efficacité Notariée',
      principlesBadge: 'Principes d’Action',
      principlesTitle: 'Éthique, Confidentialité et Rigueur',
      principlesDesc: 'Notre action repose sur les principes de responsabilité, de stricte confidentialité, de transparence, de respect absolu de la législation en vigueur et d’engagement envers les droits fondamentaux des citoyens.',
      principlesQuote: '"Nous croyons que la nationalité représente bien plus qu’un document : c’est une identité, une appartenance, une histoire, une reconnaissance et une opportunité."',

      // Statute Tab
      statuteBadge: 'Transparence & Gouvernance',
      statuteTitle: 'Statut Officiel et Structure du Cabinet',
      statuteChapters: [
        {
          numero: 'Chapitre I',
          titulo: 'Dénomination, Nature, Siège et Champ Territorial',
          artigos: [
            'Article 1er (Dénomination) - Le Bureau de Gestion des Documents et Procédures de Naturalisation en Guinée-Bissau, abrégé en EMDPN-GB, est une entité juridique dédiée au conseil, à l’instruction et au traitement des dossiers de nationalité et documents officiels.',
            'Article 2 (Siège Officiel) - L’EMDPN-GB a son siège central à Safim Centre / Royaume, Secteur de Safim, Région de Biombo, République de Guinée-Bissau, avec capacité d’intervention nationale et internationale.',
            'Article 3 (Portée Universelle) - L’EMDPN-GB œuvre en faveur des citoyens sur le territoire national, de la diaspora guinéenne à travers le monde et de toute personne éligible à demander, faire reconnaître ou acquérir la nationalité guinéenne.'
          ]
        },
        {
          numero: 'Chapitre II',
          titulo: 'Objectifs Généraux, Spécifiques et Cadre Historique',
          artigos: [
            'Article 4 (Objectif Principal) - Faciliter de manière légale, transparente et diligente l’accès à la citoyenneté guinéenne et aux documents officiels pour tous les requérants légitimes.',
            'Article 5 (Soutien à la Diaspora) - Soutenir expressément les membres de la diaspora souhaitant rétablir des liens juridiques permanents avec la Guinée-Bissau et régulariser leur nationalité.',
            'Article 6 (Objectifs Spécifiques) - Assurer le filtrage rigoureux, la traduction assermentée, l’organisation des dossiers, le règlement des taxes publiques et le suivi jusqu’à l’obtention du Décret, de l’Acte de Naissance, du BI et du Passeport.'
          ]
        },
        {
          numero: 'Chapitre III',
          titulo: 'Destinataires et Bénéficiaires Officiels',
          artigos: [
            '1. Diaspora Guinéenne : Enfants nés à l’étranger de père ou mère guinéen(ne) ayant besoin d’établir leur nationalité d’origine et de transcrire leurs actes d’état civil.',
            '2. Citoyens sur le Territoire National : Résidents guinéens rencontrant des retards dans l’obtention de pièces essentielles (BI, Acte de Naissance, Casier Judiciaire et Passeport) pour études ou travail.',
            '3. Membres de la Diaspora et Rapatriés : Descendants avec racines ancestrales attestées ou volonté d’intégration durable et d’investissement dans le pays.',
            '4. Ressortissants Étrangers : Professionnels, coopérants et investisseurs remplissant les conditions légales de résidence continue ou ayant rendu des services éminents à la Guinée-Bissau.'
          ]
        },
        {
          numero: 'Chapitre IV',
          titulo: 'Partenariats Institutionnels avec les Organes de l’État',
          artigos: [
            'Article 7 (Articulation Gouvernementale) - L’EMDPN-GB collabore en étroite conformité avec les institutions régaliennes compétentes de la Guinée-Bissau :',
            'a) Ministère de la Justice et des Droits de l’Homme : Direction Générale des Registres, Notariat et Identification Civile, Conservatoires Centraux et Trésor Public de la Justice.',
            'b) Ministère de l’Intérieur (DIC) : Direction de la Migration et Frontières pour l’émission biométrique et le contrôle des Passeports.',
            'c) Ministère des Affaires Étrangères et Coopération : Conseil documentaire pour les dossiers diplomatiques et consulaires.',
            'd) Ministère de la Culture : Pour l’obtention de la déclaration de conformité.',
            'e) Mairie de Bissau (Câmara Municipal) : Attestation de résidence depuis plus de 5 ans.',
            'f) Imprimerie Nationale (INACEP) : Publication légale du Décret Ministériel au Journal Officiel de la République de Guinée-Bissau.'
          ]
        },
        {
          numero: 'Chapitre V',
          titulo: 'Principes Éthiques, Juridiques et Engagement de Transparence',
          artigos: [
            'Article 8 (Rejet Total de la Fraude) - L’EMDPN-GB rejette catégoriquement toute pratique illégale, intermédiaire officieux ou corruption. Tous les dossiers sont constitués exclusivement sur la base de faits avérés et d’actes authentiques.',
            'Article 9 (Taxes Publiques Réglementées) - Toutes les taxes de l’État sont versées avec quittance officielle au Trésor Public de la Justice (ex. : 770.482 FCFA pour la naturalisation par résidence ; 155.097 FCFA pour le mariage). L’EMDPN-GB ne facture que des honoraires de service transparents.',
            'Article 10 (Accueil Humanisé) - Traiter chaque demandeur avec dignité, respect et écoute bienveillante, en reconnaissant la valeur fondamentale du droit à la citoyenneté.'
          ]
        },
        {
          numero: 'Chapitre VI',
          titulo: 'Organes de Gestion et Direction Exécutive',
          artigos: [
            'Article 11 (Composition de la Direction) - La gouvernance de l’EMDPN-GB est assurée par des professionnels qualifiés et assermentés :',
            '• Directeur Général : Cláudio Hortiz Altip (Coordination Stratégique, Relations Institutionnelles et Représentation Générale)',
            '• Auxiliaire Administratif : Valdano Amoná (Gestion Procédurale, Protocoles Physiques et Logistique Notariée)',
            '• Secrétaire Générale : Isabel Sambé (Secrétariat Exécutif, Rendez-vous Internationaux, Accueil et Filtrage)',
            '• Conseil Juridique : Juristes professionnels spécialisés en Droit de la Nationalité et Procédure Administrative Bissau-Guinéenne.'
          ]
        },
        {
          numero: 'Chapitre VII',
          titulo: 'Service Universel, Rendez-vous et Canaux Officiels',
          artigos: [
            'Article 12 (Canaux Officiels de Dépôt) - Toute la documentation et les demandes doivent obligatoirement être acheminées par les voies officielles reconnues :',
            'E-mail Officiel : infor.ciesemdpngb@gmail.com',
            'Téléphone et WhatsApp Institutionnel : +245 957000555',
            'Article 13 (Rendez-vous Universel) - La plateforme en ligne de l’EMDPN-GB est ouverte aux candidats du monde entier, avec adaptation aux fuseaux horaires et entretiens sécurisés par visioconférence.'
          ]
        },
        {
          numero: 'Chapitre VIII',
          titulo: 'Dispositions Finales et Confidentialité Absolue',
          artigos: [
            'Article 14 (Protection des Données) - Tous les actes d’état civil, casiers judiciaires et passeports confiés à l’EMDPN-GB bénéficient du secret professionnel absolu.',
            'Article 15 (Entrée en Vigueur) - Le présent Statut régit toutes les activités du Cabinet à compter de son dépôt auprès des instances compétentes.'
          ]
        }
      ],

      // Organs tab
      organs: [
        {
          name: 'Cláudio Hortiz Altip',
          role: 'Directeur Général',
          description: 'Coordination stratégique, liaison directe avec les ministères de l’État et représentation institutionnelle de l’EMDPN-GB.'
        },
        {
          name: 'Valdano Amoná',
          role: 'Auxiliaire Administratif',
          description: 'Gestion des procédures, instruction d’état civil, dépôts physiques et logistique notariée à Bissau.'
        },
        {
          name: 'Isabel Sambé',
          role: 'Secrétaire Générale',
          description: 'Secrétariat exécutif, accueil des requérants, tri initial des documents et gestion des rendez-vous internationaux.'
        }
      ],

      // Partnerships tab
      partnershipsTitle: 'Coordination Institutionnelle et Gouvernementale',
      partnershipsDesc: 'L’EMDPN-GB agit en étroite articulation avec les organes de souveraineté de la République de Guinée-Bissau pour garantir la parfaite légalité de toutes les procédures d’état civil, de nationalité et de passeport.',
      partnershipsList: [
        {
          name: 'Ministère de la Justice',
          desc: 'Conservatoires des Registres Centraux et Trésor Public de la Justice.'
        },
        {
          name: 'Ministère de l’Intérieur (DIC)',
          desc: 'Direction de la Migration et Frontières / Émission biométrique des Passeports.'
        },
        {
          name: 'Ministère des Affaires Étrangères',
          desc: 'Appui consulaire et diplomatique à la Diaspora Guinéenne.'
        },
        {
          name: 'Ministère de la Culture',
          desc: 'Pour l’obtention de la déclaration de conformité.'
        },
        {
          name: 'Mairie de Bissau (Câmara Municipal)',
          desc: 'Attestation de résidence de plus de 5 ans.'
        }
      ],

      // Principles tab
      principlesCommitmentTitle: 'Engagement Éthique & Juridique',
      principlesCommitmentQuote: '"Notre engagement est de ne jamais léser ni l’État guinéen ni notre client."',
      principlesCommitmentDesc: 'Nous rejetons catégoriquement les filières officieuses. Toutes les taxes publiques sont versées directement au Trésor Public, assurant transparence totale, sécurité juridique et protection intégrale des dossiers des requérants.',

      // Support Form
      supportSectionTitle: 'Canal de Soutien Solidaire, Dons & Commentaires',
      supportSectionSubtitle: 'Espace ouvert pour contributions bénévoles, dons sans obligation de réciprocité, et avis sur notre action.',
      supportFormTitle: 'Formulaire de Soutien Bénévole et Avis',
      supportFormDesc: 'Votre soutien contribue à maintenir notre assistance juridique accessible et nos canaux opérationnels avec une sécurité maximale.',
      fieldName: 'Nom et Prénom',
      fieldEmail: 'E-mail Officiel',
      fieldPhone: 'Téléphone / WhatsApp',
      fieldSupportType: 'Type de Soutien ou Message',
      fieldAmount: 'Montant de la Contribution Volontaire (Optionnel)',
      fieldCustomAmount: 'Autre Montant (FCFA / EUR / USD)',
      fieldOfficeSupplies: 'Spécification du Matériel de Bureau *',
      fieldFeedback: 'Commentaires, Suggestions ou Évaluation des Services',
      placeholderFeedback: 'Écrivez ici votre commentaire, avis ou précisions sur votre contribution bénévole...',
      btnSubmitSupport: 'Soumettre Soutien / Avis en Toute Confidentialité',
      securityAssurance: 'Protocole de Sécurité Actif : Données protégées contre tout accès non autorisé sous secret notarial.',

      // Headquarter Location
      locationBadge: 'Siège Central de l’EMDPN-GB',
      locationTitle: 'Où Nous Trouver',
      locationAddressTitle: 'Adresse Physique :',
      locationAddressValue: 'Safim Centre / Royaume, Secteur de Safim, Région de Biombo, Guinée-Bissau',
      locationPhoneTitle: 'Téléphone & WhatsApp :',
      locationEmailTitle: 'E-mail Officiel :',
      btnLocationSchedule: 'Prendre Rendez-vous',
      btnLocationContacts: 'Voir Plus de Contacts'
    },
    services: {
      title: 'Nos Services & Organisation Documentaire',
      subtitle: 'Solutions rapides, Prise de rendez-vous pour visa et chaîne documentaire en ordre légal strict.',
      catalogBadge: 'Catalogue des Services Officiels',
      catalogTitle: 'Assistance Spécialisée',
      catalogDesc: 'Du traitement d’urgence pour départs imminents jusqu’à la naturalisation complète.',
      ascendingTitle: 'Chaîne des Pièces en Ordre Croissant',
      ascendingSubtitle: 'La législation guinéenne impose que chaque pièce soit émise sur la base de la précédente :',
      commitmentTitle: 'Engagement de Diligence',
      commitmentDesc: 'Votre temps est précieux. Notre cabinet utilise des voies officielles directes pour éviter tout blocage administratif.',
      btnBookAppointment: 'DEMANDER UN RENDEZ-VOUS',
      serviceTravel: 'Prise de rendez-vous pour visa de voyage / démarches auprès des ambassades',
      serviceTravelDesc: 'Assistance prioritaire d’urgence pour voyageurs avec billet d’avion réservé, engagements internationaux et visas impératifs.',
      serviceDiaspora: 'Naturalisation pour la Diaspora',
      serviceDiasporaDesc: 'Accompagnement complet des membres de la diaspora souhaitant obtenir leur nationalité et régulariser leur état civil.',
      serviceDocChain: 'Documents Nationaux en Ordre Légal',
      serviceDocChainDesc: 'Obtention et régularisation ordonnée des pièces officielles pour résidents et non-résidents.',
      serviceTranslation: 'Traduction et Légalisation Officielle',
      serviceTranslationDesc: 'Traduction assermentée vers le portugais et authentifications ministérielles et consulaires.',
      serviceRepresentation: 'Représentation Institutionnelle à Bissau',
      serviceRepresentationDesc: 'Notre équipe intervient sur place auprès des ministères de la Justice et de l’Intérieur pour suivre chaque dossier.'
    },
    process: {
      title: 'La Procédure Officielle',
      subtitle: 'Découvrez le parcours étape par étape jusqu’à votre citoyenneté et vos documents.',
      step1Title: '1. Consultation et Diagnostic',
      step1Desc: 'Analyse approfondie de votre situation et pièces. Émission du devis et de la liste des documents requis.',
      step2Title: '2. Préparation du Dossier',
      step2Desc: 'Traductions, légalisations et confection du dossier notarié selon les normes souveraines.',
      step3Title: '3. Dépôt et Instruction',
      step3Desc: 'Dépôt au Ministère de la Justice. Suivi régulier des avis techniques et des signatures ministérielles.',
      step4Title: '4. Transcription et Passeport',
      step4Desc: 'Après décret favorable, inscription au registre civil et prise de rendez-vous pour la Carte d’Identité et le Passeport.',
      timelineBadge: 'Délais & Temps Moyen',
      timelineTitle: 'Délai Moyen : 1 à 12 Mois',
      timelineDesc: 'Ce délai dépend des actes d’état civil à réunir et du calendrier des institutions de l’État.',
      btnDelayJustification: 'Voir la Justification Complète des Délais (État vs. Documents) →',
      btnEstimateCase: 'Demander une Estimation pour Mon Dossier'
    },
    requirements: {
      title: 'Conditions & Pièces Requises',
      subtitle: 'Liste officielle des pièces requises par catégorie et tableau des taxes du Trésor Public.',
      catResidence: 'Naturalisation par Résidence',
      catMarriage: 'Nationalité par Mariage',
      catDescent: 'Nationalité par Filiation / Ascendance',
      catOrigin: 'Acquisition par Origine (Enfants de Guinéens)',
      officialFeeLabel: 'Taxe Légale du Trésor Public de la Justice',
      docsOriginLabel: 'Documents du Pays d’Origine',
      docsGuineaLabel: 'Documents à Obtenir en Guinée-Bissau',
      btnRequestGuide: 'Demander le Guide Complet sur WhatsApp'
    },
    faq: {
      title: 'Questions Fréquentes',
      subtitle: 'Toutes les réponses essentielles sur nos démarches et le cadre légal en Guinée-Bissau.',
      helpTitle: 'Vous avez une question spécifique ?',
      helpDesc: 'Notre équipe juridique se tient à votre entière disposition pour une étude personnalisée.',
      btnSpeakTeam: 'Échanger avec l’Équipe Juridique'
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'À votre disposition à Safim/Bissau et via nos canaux numériques officiels.',
      chatTitle: 'Service WhatsApp Direct',
      chatDesc: 'Contactez instantanément nos conseillers juridiques.',
      btnOpenWhatsApp: 'Ouvrir WhatsApp (+245 957000555)',
      officeTitle: 'Siège Principal à Bissau',
      officeAddress: 'Safim Centre / Royaume, Secteur de Safim, Région de Biombo, Guinée-Bissau',
      hoursTitle: 'Horaires d’Ouverture',
      hoursDesc: 'Du Lundi au Vendredi : 08h00 – 17h00 | Samedi : 09h00 – 13h00',
      emailTitle: 'E-mail Officiel Unique',
      formTitle: 'Envoyez-nous un Message',
      formDesc: 'Remplissez le formulaire ci-dessous. Réponse assurée sous 24h ouvrées.',
      labelName: 'Nom et Prénom *',
      placeholderName: 'Nom et Prénom Complet',
      labelEmail: 'Votre Adresse E-mail *',
      labelPhone: 'Téléphone / WhatsApp *',
      labelService: 'Prestation Demandée',
      labelMessage: 'Message / Description de votre demande *',
      btnSend: 'Envoyer le Message Officiel',
      btnSending: 'Envoi en cours...',
      sendSuccess: 'Message enregistré avec succès ! Notre équipe vous répondra très rapidement.'
    },
    downloads: {
      title: 'Formulaires & Modèles Officiels',
      subtitle: 'Consultez et téléchargez les modèles officiels avant d’engager vos démarches.',
      tabReading: 'Mode Lecture Complet',
      tabOriginalDoc: 'Document Réglementaire Original',
      tabTemplates: 'Modèles & Aperçu Direct',
      transcriptionBadge: 'Transcription Fidèle du Document de l’État Civil',
      btnCopyFull: 'Copier Tout le Texte',
      copiedToast: 'Transcription copiée dans le presse-papiers !',
      originalDocTitle: 'Document Officiel de la Conservation Centrale des Registres',
      originalDocSubtitle: 'Photographie du document officiel avec le sceau du Trésor de la Justice.',
      btnOpenHD: 'Ouvrir en Haute Résolution',
      notePrefix: 'Note de l’EMDPN-GB :',
      noteContent: 'Notre cabinet prépare l’ensemble de ces attestations auprès de la Mairie de Bissau, du Ministère de la Culture, de la Migration et des Frontières, ainsi que les traductions assermentées.',
      seqBadge: 'Séquence Légale Obligatoire',
      seqTitle: 'Modèles de Documents en Ordre Croissant',
      seqSubtitle: 'Prévisualisez directement dans le navigateur ou téléchargez les formulaires organisés selon l’ordre légal requis, de l’Acte de Naissance à l’Historique Ancestral.',
      btnPreview: 'Prévisualiser',
      btnDownload: 'Télécharger',
      helpTitle: 'Besoin d’Assistance pour Remplir Vos Documents ?',
      helpDesc: 'En cas d’hésitation sur le remplissage de la Cédula, de l’Historique Ancestral ou de la Pétition, l’équipe EMDPN-GB vous assiste au cabinet à Bissau ou à distance via WhatsApp.',
      btnAssisted: 'Prendre Rendez-vous Assisté',
      btnWhatsApp: 'Contacter sur WhatsApp',
      modalTitle: 'Aperçu du Modèle Réglementaire',
      modalClose: 'Fermer',
      btnCopyText: 'Copier le Texte',
      btnDownloadFile: 'Télécharger le Fichier',
      downloadSuccessToast: 'Modèle téléchargé avec succès !',
      republicTitle: 'RÉPUBLIQUE DE GUINÉE-BISSAU',
      quickSearch: {
        title: 'Recherche Rapide de Rendez-vous',
        placeholder: 'Entrez le numéro de protocole (ex: EMDPN-2026-...) ou nom...',
        btnSearch: 'Rechercher',
        notFound: 'Aucun rendez-vous trouvé avec ce numéro ou nom. Veuillez vérifier le numéro de protocole ou consulter la page de suivi.',
        resultsTitle: 'Résultats de la Recherche :',
        close: 'Fermer',
        viewTracker: 'Accéder au Suivi Complet'
      },
      templates: [
        {
          step: '01',
          title: 'Demande d’Extrait d’Acte de Naissance (Cédula Pessoal)',
          tag: '1ère Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Formulaire officiel de recherche, transcription et délivrance d’acte de naissance auprès de l’État Civil Central.'
        },
        {
          step: '02',
          title: 'Demande de Certificat de Casier Judiciaire',
          tag: '2ème Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Modèle de requête pour la délivrance du casier judiciaire de Guinée-Bissau et attestation de probité civique et judiciaire.'
        },
        {
          step: '03',
          title: 'Formulaire de Demande de Carte Nationale d’Identité (BI)',
          tag: '3ème Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Fiche d’enregistrement de l’identification civile guinéenne pour prise de rendez-vous biométrique et délivrance du BI.'
        },
        {
          step: '04',
          title: 'Acte de Dépôt et Validation de Copie de Passeport',
          tag: '4ème Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Fiche de conformité, traduction assermentée et authentification notariée du passeport international et visas d’entrée.'
        },
        {
          step: '05',
          title: 'Déclaration de Soumission de Certificat ADN',
          tag: '5ème Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Attestation de dépôt du rapport génétique d’ascendance et de filiation biologique pour le programme de retour de la diaspora.'
        },
        {
          step: '06',
          title: 'Dossier d’Historique Ancestral et Arbre Généalogique',
          tag: '6ème Étape Légale',
          size: 'Modèle Officiel (.TXT)',
          desc: 'Formulaire complet de lignée familiale, justification d’ascendance guinéenne et fondement légal de la requête en nationalité.'
        },
        {
          step: '07',
          title: 'Formulaire Officiel de Demande de Naturalisation',
          tag: 'Procédure Générale',
          size: 'Microsoft Word (.docx)',
          desc: 'Formulaire complet d’identification et de requête statutaire auprès des autorités de Guinée-Bissau.'
        },
        {
          step: '08',
          title: 'Modèle de Lettre de Pétition au Ministère de la Justice',
          tag: 'Requête Formelle',
          size: 'Microsoft Word (.docx)',
          desc: 'Requête formelle motivée en droit adressée à Son Excellence Monsieur le Ministre de la Justice.'
        },
        {
          step: '09',
          title: 'Modèle de Mandat et Procuration Notariée',
          tag: 'Représentation Légale',
          size: 'Microsoft Word (.docx)',
          desc: 'Mandat de représentation légale permettant à notre équipe à Bissau d’instruire et suivre votre dossier.'
        }
      ]
    },
    news: {
      title: 'Actualités & Communiqués',
      subtitle: 'Suivez les évolutions de la loi sur la nationalité, décrets et actualités consulaires.',
      btnReadMore: 'En savoir plus'
    },
    footer: {
      rights: 'Tous droits réservés.',
      legalNote: 'EMDPN-GB — Conforme au Code de la Nationalité de la République de Guinée-Bissau.',
      officialEmailTitle: 'E-mail Officiel :',
      phoneTitle: 'Téléphone / WhatsApp :',
      locationTitle: 'Emplacement :',
      hoursTitle: 'Horaires Notariaux :',
      hoursValue: 'Lun - Ven : 08h00 - 17h00 | Sam : 09h00 - 13h00'
    },
    delayJustification: {
      title: 'Justification Officielle des Délais et Retards Procéduraux',
      subtitle: 'Éclaircissement professionnel sur les temps d’attente (1 à 12 mois) et les facteurs déterminants auprès de l’État et des documents.',
      backLink: 'Retour à la Page de Procédure',
      bannerBadge: 'Transparence Juridique & Réalité Administrative',
      bannerTitle: 'Délai Estimé : Entre 1 et 12 Mois',
      bannerDesc: 'L’acquisition de la nationalité et la délivrance de pièces d’identité en République de Guinée-Bissau est un acte souverain d’État. Chaque dossier franchit des étapes rigoureuses de contrôle juridique, vérifications dans les registres et décrets ministériels.',
      averageTitle: 'Délai Moyen de Clôture',
      averageValue: '1 à 12 Mois',
      averageDesc: 'Selon la modalité et la complexité du dossier',
      factorsBadge: 'Facteurs Déterminants',
      factorsTitle: 'Les Deux Raisons Fondamentales de Délai',
      factorsSubtitle: 'Comprendre les distinctions entre les calendriers des organes de l’État et l’avancement des pièces justificatives.',
      cause1Badge: 'Cause Administrative 01',
      cause1Title: 'Délais Liés aux Services de l’État & Ministères',
      cause1Desc: 'Même avec un dossier parfaitement instruit, la procédure dépend exclusivement des décrets de l’Exécutif et des vérifications sur les registres républicains :',
      cause1Point1Title: 'Conservatoire des registres centraux :',
      cause1Point1Desc: 'Recherche et confrontation minutieuse dans les registres anciens d’état civil à Bissau pour certifier l’authenticité des actes de naissance.',
      cause1Point2Title: 'Avis de Sécurité & Migration :',
      cause1Point2Desc: 'Émission d’attestations de conformité et vérifications par la Direction de la Migration et des Frontières.',
      cause1Point3Title: 'Décret Ministériel & Signatures :',
      cause1Point3Desc: 'Le Ministre de la Justice examine et signe formellement les décrets d’attribution ou de reconnaissance de nationalité.',
      cause1Point4Title: 'À modifier après publication à l’Imprimerie Nationale :',
      cause1Point4Desc: 'En matière de naturalisation, le statut juridique du demandeur n’est modifié et ne prend plein effet qu’après sa publication officielle à l’Imprimerie Nationale (Journal Officiel).',
      cause1ActionTitle: 'Comment l’EMDPN-GB intervient :',
      cause1ActionDesc: 'Notre équipe sur place à Safim et Bissau assure une relance hebdomadaire auprès du Ministère pour éviter toute inertie administrative.',
      cause2Badge: 'Cause Documentaire 02',
      cause2Title: 'Délais Liés à la Réunion des Pièces Justificatives',
      cause2Desc: 'Le rythme de progression dépend directement de l’authenticité, de la conformité et de la rapidité de fourniture des actes par le requérant :',
      cause2Point1Title: 'Suppression notariale préalable (Suprimir notarial prévia) :',
      cause2Point1Desc: 'Les divergences orthographiques entre l’acte de naissance, le passeport ou les actes des parents exigent une rectification et suppression notariale préalable.',
      cause2Point2Title: 'Légalisations Consulaires et Apostilles :',
      cause2Point2Desc: 'Les documents émis à l’étranger, en Europe ou ailleurs doivent recevoir les visas consulaires nécessaires pour être valables en Guinée-Bissau.',
      cause2Point3Title: 'Casiers Judiciaires Internationaux :',
      cause2Point3Desc: 'Obtention des casiers judiciaires des pays de résidence des 5 dernières années avec traduction assermentée en portugais.',
      cause2Point4Title: 'Preuves d’Ascendance & Tests ADN :',
      cause2Point4Desc: 'Pour les membres de la diaspora invoquant l’ascendance, les rapports d’ADN et généalogiques sont soumis à une vérification préalable.',
      cause2ActionTitle: 'Comment l’EMDPN-GB accélère le dossier :',
      cause2ActionDesc: 'Nous auditons toutes vos pièces avant le dépôt officiel, éliminant 98% des risques de notification et de rejet.'
    },
    appointments: {
      title: 'Prise de Rendez-vous et Démarches Documentaires',
      subtitle: 'Planifiez votre consultation en présentiel ou à distance avec l’équipe juridique de l’EMDPN-GB.',
      tabNew: 'Nouveau Rendez-vous',
      tabTrack: 'Recherche par Numéro de Protocole',
      tabRates: 'Barème des Services & Frais',
      
      wizardBadge: 'Rendez-vous Universel & Diaspora',
      wizardTitle: 'Prise de Rendez-vous & Formalités',
      stepOf: 'Étape {current} sur {total}',
      steps: {
        service: '1. Service',
        modality: '2. Modalité',
        details: '3. Pays & Coordonnées',
        confirm: '4. Confirmation'
      },

      step1Title: 'Sélectionnez le Service Juridique Souhaité :',
      step1Subtitle: 'Procédures de nationalité, naturalisation et documents officiels de la République de Guinée-Bissau.',
      
      services: {
        travel: {
          category: 'Voyage & Urgence',
          name: 'Rendez-vous Voyage Urgent (Vol & Ambassade)',
          fee: 'Frais Notariés d’Urgence',
          desc: 'Prise en charge prioritaire pour passagers ayant un billet émis, engagements internationaux et visas consulaires immédiats.',
          estimate: 'Traitement prioritaire express (24h à 48h)'
        },
        naturalization: {
          category: 'Naturalisation',
          name: 'Acquisition de la Nationalité par Naturalisation',
          fee: '770.482 FCFA',
          desc: 'Pour les étrangers résidant régulièrement depuis plus de 5 ans en Guinée-Bissau.',
          estimate: '45 min d’entretien initial'
        },
        marriage: {
          category: 'Naturalisation',
          name: 'Acquisition de la Nationalité par Mariage',
          fee: '155.097 FCFA',
          desc: 'Pour les conjoints mariés depuis plus de 3 ans avec un(e) citoyen(ne) bissaoguinéen(ne).',
          estimate: '30 min d’entretien initial'
        },
        descent: {
          category: 'Nationalité',
          name: 'Nationalité par Filiation / Descendance (Diaspora)',
          fee: 'Frais Notariés + Décret',
          desc: 'Pour les membres de la diaspora et descendants souhaitant recouvrer leur citoyenneté d’origine.',
          estimate: '40 min d’entretien'
        },
        nameRectification: {
          category: 'Documents',
          name: 'Procédure de Rectification d’Identité et Noms',
          fee: 'Frais Notariés des Registres Centraux',
          desc: 'Rectification judiciaire ou administrative des actes, correction d’erreurs matérielles et harmonisation orthographique.',
          estimate: '35 min de consultation'
        },
        passport: {
          category: 'Identification',
          name: 'Délivrance et Renouvellement de Passeport Guinéen',
          fee: 'Frais Officiels de la DIC',
          desc: 'Prise de rendez-vous pour capture biométrique et suivi accéléré du dossier.',
          estimate: '30 min de prise en charge'
        },
        identityCard: {
          category: 'Identification',
          name: 'Carte Nationale d’Identité (BI)',
          fee: 'Tarif Légal d’Identification Civile',
          desc: 'Première délivrance ou renouvellement de BI pour résidents et membres de la diaspora.',
          estimate: '25 min d’accueil'
        },
        criminalRecord: {
          category: 'Documents',
          name: 'Extrait de Casier Judiciaire',
          fee: 'Taxe Judiciaire Officielle',
          desc: 'Délivrance rapide du casier judiciaire guinéen pour études, emploi et demandes de visa.',
          estimate: '20 min de formalités'
        },
        birthCertificate: {
          category: 'Documents',
          name: 'Acte de Naissance / Registre Central',
          fee: 'Frais de Conservatoire',
          desc: 'Recherche, transcription et délivrance d’actes aux Registres Centraux de Bissau.',
          estimate: '25 min de formalités'
        }
      },

      step2Title: 'Modalité et Créneau de Consultation :',
      step2Subtitle: 'Accueil universel disponible sur place à Bissau ou à distance pour les requérants du monde entier.',
      presencialTitle: 'Présentiel au Cabinet',
      presencialDesc: 'Safim Centre / Royaume, Guinée-Bissau',
      onlineTitle: 'Consultation Universelle en Ligne',
      onlineDesc: 'Pour la Diaspora en Europe, Amérique et partout dans le monde',
      dateLabel: 'Date Souhaitée',
      dateNote: 'Consultations du Lundi au Samedi',
      timeLabel: 'Heure Souhaitée (Heure de Bissau GMT)',
      timeNote: 'Nous adaptons les créneaux pour les requérants à l’étranger',

      step3Title: 'Pays de Résidence & Coordonnées du Requérant :',
      step3Subtitle: 'Système de rendez-vous universel pour les citoyens et demandeurs de tous les pays du monde.',
      countryLabel: 'Pays de Résidence Actuel *',
      customCountryLabel: 'Précisez votre Pays :',
      customCountryPlaceholder: 'Nom de votre pays de résidence...',
      fullNameLabel: 'Nom et Prénom du Demandeur *',
      fullNamePlaceholder: 'Nom et prénom complet',
      phoneLabel: 'Téléphone / WhatsApp avec Indicatif *',
      phonePlaceholder: '+33 ...',
      emailLabel: 'Votre E-mail',
      emailPlaceholder: 'votreemail@exemple.com',
      docLabel: 'Nº de Passeport ou Pièce d’Identité',
      docPlaceholder: 'Ex. : Passeport / Carte d’identité',
      channelLabel: 'Canal Préféré de Communication :',
      channelOptions: {
        whatsapp: 'WhatsApp (Messages et Appel)',
        meet: 'Google Meet / Visioconférence',
        email: 'E-mail Officiel',
        office: 'Sur place au Cabinet à Bissau'
      },
      notesLabel: 'Remarques ou Situation Particulière (Optionnel) :',
      notesPlaceholder: 'Ex. : enfant de père ou mère guinéen(ne) né(e) à l’étranger',
      officialEmailTitle: 'E-mails Officiels pour Transmission des Pièces :',
      officialBadge: 'Officiels EMDPN-GB',
      validationError: 'Veuillez renseigner votre Nom et Prénom complet ainsi que votre Téléphone / WhatsApp.',

      successTitle: 'Rendez-vous Universel Enregistré !',
      successSubtitle: 'Votre consultation est planifiée avec succès et votre numéro de protocole a été émis.',
      protocolBadge: 'Protocole Officiel EMDPN-GB',
      statusConfirmed: 'CONFIRMÉ',
      statusPending: 'EN ATTENTE',
      statusCompleted: 'CLÔTURÉ',
      statusCancelled: 'ANNULÉ',
      labelService: 'Prestation :',
      labelFee: 'Frais Officiels :',
      labelDateTime: 'Date & Heure :',
      labelCountry: 'Pays de Résidence :',
      labelApplicant: 'Demandeur :',
      labelChannel: 'Canal :',
      labelOfficialEmail: 'E-mail Officiel Récepteur :',
      emailConfirmationSent: 'E-mail de confirmation envoyé automatiquement avec succès à {email} !',
      emailOfficialCc: 'Copie officielle transmise au service des registres de l’EMDPN-GB.',
      btnResendEmail: 'Renvoyer l’E-mail de Confirmation',
      btnSendWhatsApp: 'Envoyer la Fiche sur WhatsApp',
      btnSendEmail: 'Transmettre aux 2 E-mails Officiels',
      btnDownload: 'Télécharger le Récépissé (.TXT)',
      protocolSaveNote: 'Conservez ce numéro de protocole {protocol}. Vous pourrez consulter son état à tout moment sur le site.',
      toastSuccess: 'Rendez-vous confirmé avec succès ! Protocole : ',

      btnBack: 'Retour',
      btnContinue: 'Continuer',
      btnConfirm: 'Confirmer le Rendez-vous Universel',

      trackerBadge: 'Suivi Express',
      trackerTitle: 'Consulter l’État du Rendez-vous',
      trackerSubtitle: 'Saisissez votre Numéro de Protocole (ex: EMDPN-2026-1042) ou votre Téléphone pour vérifier le statut.',
      trackerPlaceholder: 'Ex. : EMDPN-2026-1042 ou +33...',
      btnSearch: 'Rechercher',
      trackerNotFoundTitle: 'Aucun rendez-vous trouvé avec ces identifiants.',
      trackerNotFoundDesc: 'Vérifiez le numéro de protocole saisi ou contactez notre équipe sur WhatsApp au +245 957000555.',
      trackerConfirmedBadge: 'Protocole Confirmé',
      trackerFeeLabel: 'Frais Trésor Public :',
      trackerQuestions: 'Une question sur votre rendez-vous ?',
      trackerSpeakBtn: 'Contacter un Conseiller',

      ratesTitle: 'Catalogue des Services & Tarifs Officiels',
      ratesSubtitle: 'Montants légaux fixés par les institutions compétentes de la République de Guinée-Bissau.',
      btnBookService: 'Prendre RDV',

      infoLocationTitle: 'Emplacement',
      infoLocationDesc: 'Safim Centre / Royaume, Secteur de Safim, Guinée-Bissau.',
      infoHoursTitle: 'Horaires Officiels',
      infoHoursDesc: 'Lundi au Vendredi : 08h30 - 17h30 | Samedi : 09h00 - 13h00',
      infoSecurityTitle: 'Démarches Sécurisées',
      infoSecurityDesc: 'Garantie de conformité aux tarifs légaux sans frais dissimulés.'
    }
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      requirements: 'Requirements',
      process: 'Process',
      forms: 'Forms',
      faq: 'FAQ',
      news: 'News',
      contact: 'Contacts',
      book: 'Book Now',
      admin: 'Admin Portal',
      login: 'Sign In',
      subtitle: 'NATURALIZATION · GUINEA-BISSAU',
      scheduleOnline: 'Book Online Appointment',
      adminAccess: 'Access Administrative Portal',
      language: 'Language'
    },
    hero: {
      republicPrefix: 'Republic of',
      republicSuffix: 'Guinea-Bissau',
      titleLine1: 'Your first and second homeland.',
      titleLine2: 'Your citizenship is our commitment!',
      description: 'EMDPN-GB is a specialized technical and legal advisory bureau based in Safim, Biombo Region, Guinea-Bissau, dedicated to guiding, assisting, and processing nationality, citizenship, naturalization, and civil documentation.',
      ctaBook: 'BOOK APPOINTMENT / START FILE',
      ctaWhatsapp: 'DIRECT WHATSAPP SERVICE',
      ctaProcess: 'EXPLORE THE PROCESS',
      officialBadge: 'Official Civil Registry and Naturalization Office · Bissau',
      photoCaption: 'In-person and remote documentary assistance in collaboration with the Ministry of Justice and Human Rights of Guinea-Bissau.'
    },
    metrics: {
      completedTitle: 'Completed Applications',
      completedDesc: 'With favorable state decree',
      timelineTitle: 'Average Waiting Timeline',
      timelineValue: '1 to 12 Months',
      timelineDesc: 'Statutory regulated timeframe',
      timelineLink: 'View Full Timeline Justification Notice',
      satisfactionTitle: 'Applicant Satisfaction',
      satisfactionDesc: 'Integrity and legal rigor',
      diasporaTitle: 'Countries Served',
      diasporaDesc: 'Diaspora and global partners'
    },
    audience: {
      sectionTitle: 'Who Can Benefit From Our Services?',
      sectionSubtitle: 'Specialized legal guidance tailored to every Guinea-Bissau nationality situation',
      card1Title: '1. Domestic Resident Citizens',
      card1Desc: 'Residents facing difficulties obtaining documents (Birth Certificate, National ID Card, Criminal Record, and Passport) for studies, employment, or medical treatment abroad.',
      card2Title: '2. Guinea-Bissau Diaspora',
      card2Desc: 'Citizens born abroad to a Guinea-Bissau mother or father seeking origin nationality, civil registry, and consular identity documents.',
      card3Title: '3. Guinea-Bissau Descendants in the Diaspora & Return',
      card3Desc: 'Descendants of Guinea-Bissau lineage who decide to return to their ancestral land and establish legal, cultural, and historical ties with Guinea-Bissau.',
      card4Title: '4. Citizens Qualifying for Nationality',
      card4Desc: 'Professionals, investors, humanitarians, and applicants who under the law are entitled to apply for, recognize, or acquire Guinea-Bissau nationality.'
    },
    bookingSection: {
      title: 'Appointment and Application Tracking Portal',
      subtitle: 'Schedule an in-person or digital legal consultation, or verify your booking status in real time.',
      tabBook: 'Book New Appointment',
      tabTrack: 'Check Existing Booking',
      noticeTravel: 'Includes expedited Travel Visa Appointment Booking for applicants with immediate departure deadlines.'
    },
    partners: {
      title: 'Official State Institutional Synergy',
      subtitle: 'Serving as a trusted State Partner for legal documentary compliance with sovereign ministries',
      partner1: 'Ministry of Justice',
      partner1Role: 'General Directorate of Civil Identification, Registries and Notary',
      partner2: 'Ministry of Interior (DIC)',
      partner2Role: 'Direction of Migration and Borders / Passport Issuance',
      partner3: 'Ministry of Foreign Affairs',
      partner3Role: 'International Cooperation, Diaspora Support, and Document Translation',
      partner4: 'Ministry of Culture',
      partner4Role: 'For obtaining declaration of compliance',
      partner5: 'City Council of Bissau (Câmara Municipal)',
      partner5Role: 'Certifies residency for over 5 years'
    },
    about: {
      title: 'About EMDPN-GB',
      subtitle: 'Institutional structure, legal mandate, and official role as State Partner in Guinea-Bissau.',
      tabStatus: 'Institutional Status',
      tabOrgans: 'Organs & Ministries',
      tabPartnership: 'State Partnerships',
      tabPrinciples: 'Principles & Integrity',
      missionTitle: 'Mission & Purpose',
      missionDesc: 'To ensure every applicant receives rigorous, transparent assistance under the Nationality Law of the Republic of Guinea-Bissau.',

      // Presentation
      introBadge: 'Institutional Presentation · Safim / Biombo',
      introTitle: 'Your First and Second Homeland.',
      introMotto: '"Your citizenship is our commitment!"',
      introDesc: 'EMDPN-GB is a specialized technical and legal advisory bureau based in Safim, Biombo Region, Guinea-Bissau, dedicated to guiding, assisting, and processing nationality, citizenship, naturalization, and civil documentation.',
      ourMissionTitle: 'Our Mission',
      ourMissionDesc: 'Facilitate citizens’ access to their identity and citizenship rights by providing guidance and support in the organization, preparation, filing, and monitoring of documentary cases with the competent public authorities.',
      scopeTitle: 'Scope and Beneficiaries',
      scopeDesc: 'Our work is dedicated to Guinea-Bissau citizens residing within the national territory, members of the Guinea-Bissau diaspora worldwide, and all individuals who, under applicable legislation, are entitled to request, recognize, or acquire Guinea-Bissau nationality. The bureau operates in close collaboration with professional jurists and specialized legal advisors to safeguard the lawful right to nationality acquisition and recognition.',
      btnBookOnline: 'Book Online Appointment',
      btnContactDirector: 'Contact Directorate',
      sealTitle: 'EMDPN-GB · Seal and Official Team',
      sealLocation: 'Safim Center / Kingdom · Guinea-Bissau',
      photoAlt: 'Official EMDPN-GB Team with Guinea-Bissau Passport',

      // 7 Procedures
      procBadge: 'Scope of Action & Procedures',
      procTitle: 'Support and Regularization Procedures',
      procSubtitle: 'We provide specialized service support across various procedures, ensuring rigorous technical and administrative guidance:',
      procedures: [
        {
          title: '1. Nationality attribution and recognition procedures',
          desc: 'Documentary preparation for citizens by origin, descent, and transcription in the Central Registries.'
        },
        {
          title: '2. Nationality by marriage procedures',
          desc: 'Legal case handling for spouses with over 3 years of lawful marriage to a Guinea-Bissau citizen, under Article 8 of the Nationality Act.'
        },
        {
          title: '3. Naturalization procedures',
          desc: 'Advisory for foreign nationals and diaspora members pursuant to Article 9 of the Nationality Act.'
        },
        {
          title: '4. Procedures for name and surname changes and corrections in birth records, rectification of material errors, and orthographic harmonization across documents.',
          desc: 'Rectification of birth entries and civil registers for uniform orthographic spelling of names and surnames.'
        },
        {
          title: '5. Guidance for the organization and regularization of civil documents',
          desc: 'Assistance in securing and renewing Birth Records (Cédula), National ID Cards (BI), and Criminal Clearances for Passport issuance.'
        },
        {
          title: '6. Administrative assistance in drafting petitions and application files',
          desc: 'Technical drafting of petition briefs, prior statutory compliance audit, certified true copies, and official sworn translations.'
        },
        {
          title: '7. Guidance on applicable statutory and administrative procedures',
          desc: 'Detailed clarification of sovereign legal workflows before state institutions.',
          fullWidth: true
        }
      ],

      // Bridge and Principles
      bridgeBadge: 'Institutional Bridge',
      bridgeTitle: 'Bridge between Citizens, Diaspora, and the State',
      bridgeDesc: 'EMDPN-GB establishes an essential bridge connecting citizens, the global diaspora, and sovereign state institutions administering justice, civil identification, and nationality records, ensuring accessible, organized, transparent, and efficient service.',
      bridgeHighlight: 'Accessibility · Organization · Notarial Efficiency',
      principlesBadge: 'Operating Principles',
      principlesTitle: 'Ethics, Confidentiality, and Rigor',
      principlesDesc: 'Our operations are grounded in the principles of responsibility, strict confidentiality, transparency, statutory compliance, and dedicated defense of fundamental citizen rights.',
      principlesQuote: '"We believe nationality represents far more than a document: it is identity, belonging, history, recognition, and opportunity."',

      // Statute Tab
      statuteBadge: 'Transparency & Governance',
      statuteTitle: 'Official Statutes & Bureau Governance',
      statuteChapters: [
        {
          numero: 'Chapter I',
          titulo: 'Denomination, Nature, Headquarters, and Territorial Scope',
          artigos: [
            'Article 1 (Denomination) - The Bureau of Document Processing and Naturalization in Guinea-Bissau, abbreviated as EMDPN-GB, is a legal and operational entity dedicated to legal advisory, filing, and processing of nationality matters and sovereign documentation.',
            'Article 2 (Official Headquarters) - EMDPN-GB maintains its primary headquarters in Safim Center / Kingdom, Safim Sector, Biombo Region, Republic of Guinea-Bissau, serving clients domestically and across the globe.',
            'Article 3 (Universal Scope) - EMDPN-GB acts on behalf of citizens in Guinea-Bissau, members of the diaspora worldwide, and all individuals entitled under the law to apply for, recognize, or acquire Guinea-Bissau citizenship.'
          ]
        },
        {
          numero: 'Chapter II',
          titulo: 'General and Specific Objectives & Historical Framework',
          artigos: [
            'Article 4 (Primary Mission) - To facilitate, in a lawful, transparent, and expedited manner, access to Guinea-Bissau citizenship and official documentation for all legitimate applicants.',
            'Article 5 (Diaspora Support) - Expressly assist diaspora members seeking to establish permanent legal bonds with Guinea-Bissau and regularize their sovereign citizenship.',
            'Article 6 (Specific Objectives) - Ensure rigorous verification, sworn translations, dossier compilation, statutory fee payment into state treasuries, and daily follow-up through the issuance of Ministerial Decrees, Birth Certificates, National IDs, and Passports.'
          ]
        },
        {
          numero: 'Chapter III',
          titulo: 'Official Beneficiaries and Target Audience',
          artigos: [
            '1. Guinea-Bissau Diaspora: Citizens born abroad to a Guinean parent requiring origin nationality regularization and civil registry transcription.',
            '2. Resident Domestic Citizens: Citizens facing bureaucratic bottlenecks obtaining vital identity records (BI, Birth Record, Criminal Clearance, Passport) for education or employment.',
            '3. Diaspora Members and Returnees: Brethren of ancestral African heritage seeking integration, citizenship, and sustainable investments in the country.',
            '4. Foreign Nationals: Professionals, cooperators, and investors fulfilling statutory residency or distinguished service requirements in Guinea-Bissau.'
          ]
        },
        {
          numero: 'Chapter IV',
          titulo: 'Institutional Synergy with Sovereign State Organs',
          artigos: [
            'Article 7 (Government Synergy) - EMDPN-GB works in close coordination with sovereign organs of the Republic of Guinea-Bissau:',
            'a) Ministry of Justice and Human Rights: General Directorate of Civil Identification, Notary, Central Registries, and General Justice Treasury.',
            'b) Ministry of Interior (DIC): Migration and Borders Directorate for biometric capture and Passport issuance.',
            'c) Ministry of Foreign Affairs and International Cooperation: Consular guidance for diaspora and diplomatic procedures.',
            'd) Ministry of Culture: For obtaining declaration of compliance.',
            'e) City Council of Bissau (Câmara Municipal): Proof of residence over 5 years.',
            'f) National Press (INACEP): Official publication of Ministerial Decrees in the Sovereign Official Gazette of Guinea-Bissau.'
          ]
        },
        {
          numero: 'Chapter V',
          titulo: 'Ethical and Legal Principles & Commitment to Transparency',
          artigos: [
            'Article 8 (No Defrauding of State or Citizens) - EMDPN-GB strictly prohibits informal brokers, corruption, or forged paperwork. All cases are filed solely upon proven legal facts and authentic documents.',
            'Article 9 (Statutory Regulated Fees) - All government levies are paid via official treasury voucher directly into the General Justice Treasury (e.g., 770,482 FCFA for residency naturalization; 155,097 FCFA for marriage). EMDPN-GB charges only clear, fair service fees.',
            'Article 10 (Humane Service) - Treating every applicant with maximum dignity, respect, and empathy, recognizing the sacred right to citizenship.'
          ]
        },
        {
          numero: 'Chapter VI',
          titulo: 'Management Organs and Executive Leadership',
          artigos: [
            'Article 11 (Leadership Structure) - Governance is maintained by registered, qualified professionals:',
            '• Managing Director: Cláudio Hortiz Altip (Strategic Coordination, Ministerial Liaison, and Institutional Representation)',
            '• Administrative Assistant: Valdano Amoná (Case Administration, Physical Registry Filings, and Notarial Logistics)',
            '• Secretary-General: Isabel Sambé (Executive Secretariat, International Appointments, Triage, and Applicant Care)',
            '• Legal Advisory: Professional jurists specialized in Guinea-Bissau Nationality Law and Administrative Law.'
          ]
        },
        {
          numero: 'Chapter VII',
          titulo: 'Universal Service, Booking, and Official Channels',
          artigos: [
            'Article 12 (Official Communication Channels) - All files and petitions must be submitted through verified statutory channels:',
            'Official Email: infor.ciesemdpngb@gmail.com',
            'Institutional Phone & WhatsApp: +245 957000555',
            'Article 13 (Universal Booking) - The online booking portal is open to applicants from all countries, adjusting to international time zones and virtual consultations.'
          ]
        },
        {
          numero: 'Chapter VIII',
          titulo: 'Final Provisions and Absolute Confidentiality',
          artigos: [
            'Article 14 (Data Protection) - All civil certificates, criminal clearances, and passports entrusted to EMDPN-GB are protected under strict notary privilege.',
            'Article 15 (Effective Date) - These Statutes govern all bureau operations from the date of statutory approval.'
          ]
        }
      ],

      // Organs tab
      organs: [
        {
          name: 'Cláudio Hortiz Altip',
          role: 'Managing Director',
          description: 'Strategic leadership, ministerial partnerships, and sovereign representation of EMDPN-GB.'
        },
        {
          name: 'Valdano Amoná',
          role: 'Administrative Assistant',
          description: 'Case management, notarial protocol filings, document vetting, and Bissau physical logistics.'
        },
        {
          name: 'Isabel Sambé',
          role: 'Secretary-General',
          description: 'Executive secretariat, applicant service, primary document intake, and international scheduling.'
        }
      ],

      // Partnerships tab
      partnershipsTitle: 'Institutional and Sovereign Synergy',
      partnershipsDesc: 'EMDPN-GB operates in direct partnership with Guinea-Bissau sovereign ministries to ensure every naturalization, civil registration, ID card, and passport case strictly conforms to the laws of the Republic.',
      partnershipsList: [
        {
          name: 'Ministry of Justice',
          desc: 'Central Civil Registries and General Justice Treasury.'
        },
        {
          name: 'Ministry of Interior (DIC)',
          desc: 'Direction of Migration and Borders / Passport Issuance.'
        },
        {
          name: 'Ministry of Foreign Affairs',
          desc: 'Consular and diplomatic support for the Guinea-Bissau diaspora.'
        },
        {
          name: 'Ministry of Culture',
          desc: 'For obtaining declaration of compliance.'
        },
        {
          name: 'City Council of Bissau (Câmara Municipal)',
          desc: 'Certifies residency for over 5 years.'
        }
      ],

      // Principles tab
      principlesCommitmentTitle: 'Ethical and Legal Commitment',
      principlesCommitmentQuote: '"Our sacred commitment is never to defraud either the State of Guinea-Bissau or our client."',
      principlesCommitmentDesc: 'We reject unregulated intermediaries and backdoor operations. All statutory taxes are deposited directly into state coffers, guaranteeing legal certainty and complete data protection for all applicants.',

      // Support Form
      supportSectionTitle: 'Solidarity Support, Voluntary Contributions & Feedback',
      supportSectionSubtitle: 'Open channel for voluntary donations without reciprocity requirements, plus public feedback.',
      supportFormTitle: 'Voluntary Contribution & Feedback Portal',
      supportFormDesc: 'Your support helps maintain accessible legal assistance and state-of-the-art secure infrastructure for all applicants.',
      fieldName: 'Full Legal Name',
      fieldEmail: 'Official Email',
      fieldPhone: 'Phone / WhatsApp',
      fieldSupportType: 'Contribution or Message Type',
      fieldAmount: 'Voluntary Amount (Optional)',
      fieldCustomAmount: 'Custom Amount (FCFA / EUR / USD)',
      fieldOfficeSupplies: 'Office Supplies Specification *',
      fieldFeedback: 'Comments, Feedback, or Service Evaluation',
      placeholderFeedback: 'Write your comments, feedback, or voluntary support notes here...',
      btnSubmitSupport: 'Submit Support / Feedback Securely',
      securityAssurance: 'Active Security Protocol: Confidential data protected against unauthorized access under notary privilege.',

      // Headquarter Location
      locationBadge: 'EMDPN-GB Central Headquarters',
      locationTitle: 'Where to Find Us',
      locationAddressTitle: 'Physical Address:',
      locationAddressValue: 'Safim Centre / Kingdom, Sector of Safim, Biombo Region, Guinea-Bissau',
      locationPhoneTitle: 'Phone & WhatsApp:',
      locationEmailTitle: 'Official Email:',
      btnLocationSchedule: 'Schedule Consultation',
      btnLocationContacts: 'More Contact Info'
    },
    services: {
      title: 'Our Services & Document Chain',
      subtitle: 'Agile legal solutions, Travel Visa Appointment Booking, and documentation organized in strict ascending order.',
      catalogBadge: 'Official Services Catalog',
      catalogTitle: 'Specialized Legal Services',
      catalogDesc: 'From express bookings for travelers with imminent flights to full nationality processing.',
      ascendingTitle: 'Ascending Legal Document Hierarchy',
      ascendingSubtitle: 'Guinea-Bissau law strictly mandates that each primary document is issued based on the preceding one:',
      commitmentTitle: 'Commitment to Speed & Rigor',
      commitmentDesc: 'Your time is invaluable. Our bureau relies on direct, lawful government liaisons to ensure files never get stuck in bureaucratic drawers.',
      btnBookAppointment: 'REQUEST APPOINTMENT',
      serviceTravel: 'Agendamento de pedido de visto de Viagem/ consulta nas embaçadas',
      serviceTravelDesc: 'Emergency priority service for passengers with issued tickets, international commitments, and urgent visa deadlines.',
      serviceDiaspora: 'Naturalization for the Diaspora',
      serviceDiasporaDesc: 'Complete guidance for Guinea-Bissau diaspora abroad seeking origin nationality, civil registry, and consular identity documents.',
      serviceDocChain: 'National Documents in Lawful Hierarchy',
      serviceDocChainDesc: 'Sequential handling of mandatory identity documents in compliance with state regulations.',
      serviceTranslation: 'Official Sworn Translation & Legalization',
      serviceTranslationDesc: 'Certified Portuguese sworn translations for foreign documents along with ministerial consular stamps.',
      serviceRepresentation: 'Institutional Representation in Bissau',
      serviceRepresentationDesc: 'Our physical team in Bissau acts as State Partner with the Ministry of Justice and Interior to advance your file daily.'
    },
    process: {
      title: 'The Official Legal Process',
      subtitle: 'Understand the step-by-step roadmap to lawful citizenship and official state documentation.',
      step1Title: '1. Consultation & Assessment',
      step1Desc: 'We evaluate your legal profile and evidence. If viable, we issue the statutory fee breakdown and requirements checklist.',
      step2Title: '2. Dossier Preparation',
      step2Desc: 'We handle sworn translations, verifications, and notary certifications strictly meeting sovereign guidelines.',
      step3Title: '3. Submission & Ministry Filings',
      step3Desc: 'The file is formally submitted to the Ministry of Justice. Our Bissau staff tracks technical approvals and official decrees.',
      step4Title: '4. Civil Registry & Passport Issuance',
      step4Desc: 'Following official ministerial decree, your birth is recorded in the central registry and identity documents are booked.',
      timelineBadge: 'Estimated Processing Timeline',
      timelineTitle: 'Average Timeline: 1 to 12 Months',
      timelineDesc: 'Duration is governed by sovereign archive verification and state ministerial gazette scheduling.',
      btnDelayJustification: 'Read Complete Government vs. Document Delay Justification →',
      btnEstimateCase: 'Request Assessment for My Case'
    },
    requirements: {
      title: 'Requirements & Mandatory Documents',
      subtitle: 'Complete official checklists by category and General Justice Treasury statutory fee schedules.',
      catResidence: 'Naturalization by Residence',
      catMarriage: 'Nationality by Marriage',
      catDescent: 'Nationality by Ancestry / Lineage',
      catOrigin: 'Acquisition by Origin (Children of Guinean Citizens)',
      officialFeeLabel: 'Statutory Fee (General Justice Treasury)',
      docsOriginLabel: 'Documents from Country of Origin',
      docsGuineaLabel: 'Documents Issued in Guinea-Bissau',
      btnRequestGuide: 'Request Full Guide via WhatsApp'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Essential information regarding our role, legal guarantees, and Guinea-Bissau nationality procedures.',
      helpTitle: 'Still have specific questions?',
      helpDesc: 'Our legal team is ready to analyze your individual background and requirements.',
      btnSpeakTeam: 'Speak with the Legal Bureau'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Available at our Safim/Bissau offices and through official global digital channels.',
      chatTitle: 'Direct WhatsApp Service',
      chatDesc: 'Connect instantly with our legal consultation team.',
      btnOpenWhatsApp: 'Open WhatsApp (+245 957000555)',
      officeTitle: 'Main Headquarters in Bissau',
      officeAddress: 'Safim Centre / Kingdom, Sector of Safim, Biombo Region, Guinea-Bissau',
      hoursTitle: 'Operating Hours',
      hoursDesc: 'Monday to Friday: 08:00 – 17:00 | Saturday: 09:00 – 13:00',
      emailTitle: 'Single Official Email Address',
      formTitle: 'Send an Official Inquiry',
      formDesc: 'Submit your message below. Our staff responds within 24 business hours.',
      labelName: 'Full Legal Name *',
      placeholderName: 'Full Name and Surname',
      labelEmail: 'Your Email Address *',
      labelPhone: 'Phone / WhatsApp *',
      labelService: 'Requested Service',
      labelMessage: 'Message / Detailed Case Overview *',
      btnSend: 'Submit Official Message',
      btnSending: 'Processing message...',
      sendSuccess: 'Your message has been registered! Our team will contact you promptly.'
    },
    downloads: {
      title: 'Official Forms & Petition Templates',
      subtitle: 'Preview and download official request templates before initiating your file.',
      tabReading: 'Full Reading Mode',
      tabOriginalDoc: 'Original Regulatory Document',
      tabTemplates: 'Official Templates & Preview',
      transcriptionBadge: 'Verbatim Transcription of Central Registry Document',
      btnCopyFull: 'Copy Full Text',
      copiedToast: 'Transcription copied to clipboard!',
      originalDocTitle: 'Official Central Civil Registry Document',
      originalDocSubtitle: 'Photograph of the official statutory document stamped by the General Justice Treasury.',
      btnOpenHD: 'Open in High Resolution',
      notePrefix: 'EMDPN-GB Note:',
      noteContent: 'Our bureau handles and prepares all required certificates before the Municipality of Bissau, Ministry of Culture, Migration and Borders, alongside certified sworn translations.',
      seqBadge: 'Mandatory Statutory Sequence',
      seqTitle: 'Document Templates in Ascending Order',
      seqSubtitle: 'Preview directly in the browser or download forms organized in the mandatory statutory sequence, from the Birth Record to Ancestral Lineage.',
      btnPreview: 'Preview',
      btnDownload: 'Download',
      helpTitle: 'Need Assistance Completing Your Dossier?',
      helpDesc: 'If you have questions about completing the Birth Record, Ancestral History, or Petition, the EMDPN-GB team provides guided document preparation at our offices or via WhatsApp.',
      btnAssisted: 'Book Assisted Consultation',
      btnWhatsApp: 'Contact on WhatsApp',
      modalTitle: 'Official Template Preview',
      modalClose: 'Close',
      btnCopyText: 'Copy Text',
      btnDownloadFile: 'Download File',
      downloadSuccessToast: 'Template downloaded successfully!',
      republicTitle: 'REPUBLIC OF GUINEA-BISSAU',
      quickSearch: {
        title: 'Quick Appointment Search',
        placeholder: 'Enter protocol number (e.g. EMDPN-2026-...) or name...',
        btnSearch: 'Search Appointment',
        notFound: 'No appointment found with this number or name. Please check your protocol number or visit the Appointments tracker page.',
        resultsTitle: 'Search Results:',
        close: 'Close',
        viewTracker: 'Go to Full Tracker'
      },
      templates: [
        {
          step: '01',
          title: 'Application for Birth Record / Cédula Pessoal',
          tag: 'Statutory Step 1',
          size: 'Official Template (.TXT)',
          desc: 'Official statutory application for archival search, transcription, and issuance of primary birth certificate from Central Civil Registries.'
        },
        {
          step: '02',
          title: 'Application for Criminal Record Clearance Certificate',
          tag: 'Statutory Step 2',
          size: 'Official Template (.TXT)',
          desc: 'Statutory petition template for obtaining the Guinea-Bissau criminal record certificate confirming civic and judicial clearance.'
        },
        {
          step: '03',
          title: 'National Identity Card (BI) Application Form',
          tag: 'Statutory Step 3',
          size: 'Official Template (.TXT)',
          desc: 'Civil registration enrollment form for biometric appointment capture and issuance of sovereign National Identity Card.'
        },
        {
          step: '04',
          title: 'Passport Copy Presentation & Statutory Validation Affidavit',
          tag: 'Statutory Step 4',
          size: 'Official Template (.TXT)',
          desc: 'Verification affidavit, certified translation, and notarial authentication sheet for international passport copy, visas, and border entry stamps.'
        },
        {
          step: '05',
          title: 'Ancestral DNA Certificate Submission Affidavit',
          tag: 'Statutory Step 5',
          size: 'Official Template (.TXT)',
          desc: 'Submission affidavit of genetic ancestry lineage test and biological heritage for African diaspora citizenship repatriation.'
        },
        {
          step: '06',
          title: 'Ancestral Lineage History & Family Tree Dossier',
          tag: 'Statutory Step 6',
          size: 'Official Template (.TXT)',
          desc: 'Complete family lineage petition form establishing historical descent from Guinea-Bissau under jus sanguinis statutory framework.'
        },
        {
          step: '07',
          title: 'Statutory Naturalization Petition Application Form',
          tag: 'General Procedure',
          size: 'Microsoft Word (.docx)',
          desc: 'Comprehensive identification and statutory petition form submitted before Guinea-Bissau national authorities.'
        },
        {
          step: '08',
          title: 'Statutory Petition Letter to the Ministry of Justice',
          tag: 'Formal Petition',
          size: 'Microsoft Word (.docx)',
          desc: 'Formal statutory petition with comprehensive legal grounds submitted to His Excellency the Minister of Justice.'
        },
        {
          step: '09',
          title: 'Statutory Power of Attorney & Administrative Mandate',
          tag: 'Legal Representation',
          size: 'Microsoft Word (.docx)',
          desc: 'Statutory power of attorney granting full legal mandate to our bureau in Bissau to process and represent your file.'
        }
      ]
    },
    news: {
      title: 'News & Official Announcements',
      subtitle: 'Stay updated on nationality decrees, institutional developments, and legal gazettes.',
      btnReadMore: 'Read more'
    },
    footer: {
      rights: 'All rights reserved.',
      legalNote: 'EMDPN-GB — Operating in strict accordance with the Nationality Law of Guinea-Bissau.',
      officialEmailTitle: 'Official Email:',
      phoneTitle: 'Phone / WhatsApp:',
      locationTitle: 'Location:',
      hoursTitle: 'Notary Bureau Hours:',
      hoursValue: 'Mon - Fri: 08:00 - 17:00 | Sat: 09:00 - 13:00'
    },
    delayJustification: {
      title: 'Official Justification of Timelines and Procedural Delays',
      subtitle: 'Professional clarification on waiting periods (1 to 12 months) and decisive factors across State organs and applicant documents.',
      backLink: 'Back to Process Page',
      bannerBadge: 'Legal Transparency & Administrative Reality',
      bannerTitle: 'Estimated Timeline: 1 to 12 Months',
      bannerDesc: 'Acquisition of nationality and official identity document issuance in the Republic of Guinea-Bissau is a solemn sovereign act. Every file undergoes meticulous legal checks, archival verifications, and ministerial decrees.',
      averageTitle: 'Average Completion',
      averageValue: '1 to 12 Months',
      averageDesc: 'Depending on category and complexity',
      factorsBadge: 'Decisive Factors',
      factorsTitle: 'The Two Fundamental Reasons for Delays',
      factorsSubtitle: 'Understand the distinct factors between State ministerial scheduling and applicant document compliance.',
      cause1Badge: 'Administrative Cause 01',
      cause1Title: 'Delays on the Part of State Organs & Ministries',
      cause1Desc: 'Even with a fully prepared dossier, processing strictly depends on Executive Branch decrees and archival verification in sovereign registry records:',
      cause1Point1Title: 'Conservatória dos registros centrais (Central Registry):',
      cause1Point1Desc: 'Thorough search and cross-checking in historical civil registry books in Bissau to guarantee the legitimacy of birth entries.',
      cause1Point2Title: 'Security & Migration Clearances:',
      cause1Point2Desc: 'Issuance of compliance certificates and background vetting by the Migration and Borders Directorate.',
      cause1Point3Title: 'Ministerial Decree & Signatures:',
      cause1Point3Desc: 'The Minister of Justice personally reviews and formally executes nationality concession or recognition decrees.',
      cause1Point4Title: 'A ser mudada após a publicação na Imprensa Nacional (Updated after National Press Publication):',
      cause1Point4Desc: 'In naturalization cases, the applicant’s legal status is updated and takes full legal effect only after official publication in the Imprensa Nacional (Official Gazette).',
      cause1ActionTitle: 'How EMDPN-GB acts:',
      cause1ActionDesc: 'Our physical team in Safim and Bissau maintains weekly monitoring at the Ministry of Justice to ensure dossiers are continuously processed.',
      cause2Badge: 'Documentary Cause 02',
      cause2Title: 'Delays from Document Gathering & Evidence',
      cause2Desc: 'Processing pace directly relies on the authenticity, clarity, and rapid procurement of certificates provided by the applicant:',
      cause2Point1Title: 'Suprimir notarial prévia (Prior Notarial Rectification):',
      cause2Point1Desc: 'Orthographic discrepancies between birth certificates, passports, or parents’ documents mandate prior notarial rectification and regularization.',
      cause2Point2Title: 'Consular Legalizations and Apostilles:',
      cause2Point2Desc: 'Documents issued abroad, in Europe, or third countries require consular seals or legalizations to be valid in Guinea-Bissau.',
      cause2Point3Title: 'Criminal Clearances and Police Records:',
      cause2Point3Desc: 'Procuring police clearance certificates from countries of residence over the last 5 years with certified Portuguese sworn translation.',
      cause2Point4Title: 'Ancestry & DNA Proofs:',
      cause2Point4Desc: 'For diaspora applicants claiming lineage, DNA reports and genealogical records undergo statutory authenticity audits.',
      cause2ActionTitle: 'How EMDPN-GB expedites:',
      cause2ActionDesc: 'We audit every single page before formal submission, preventing 98% of potential delays and name discrepancy notices.'
    },
    appointments: {
      title: 'Appointment Booking & Legal Documentation',
      subtitle: 'Schedule your in-person or remote consultation with the legal team of EMDPN-GB.',
      tabNew: 'New Appointment',
      tabTrack: 'Check by Protocol Number',
      tabRates: 'Services & Official Fees',
      
      wizardBadge: 'Universal & Diaspora Booking',
      wizardTitle: 'Appointment Scheduling & Processing',
      stepOf: 'Step {current} of {total}',
      steps: {
        service: '1. Service',
        modality: '2. Modality',
        details: '3. Country & Info',
        confirm: '4. Confirmation'
      },

      step1Title: 'Select the Required Legal Service:',
      step1Subtitle: 'Nationality proceedings, naturalization, and official documentation of the Republic of Guinea-Bissau.',
      
      services: {
        travel: {
          category: 'Travel & Urgency',
          name: 'Urgent Travel Appointment (Flight & Visa)',
          fee: 'Urgent Notarial Fee',
          desc: 'Emergency priority consultation for passengers with issued tickets, urgent flights, and embassy visa appointments.',
          estimate: 'Immediate priority triage (24h to 48h)'
        },
        naturalization: {
          category: 'Naturalization',
          name: 'Acquisition of Nationality by Naturalization',
          fee: '770,482 FCFA',
          desc: 'For foreign residents residing legally for over 5 continuous years in Guinea-Bissau.',
          estimate: '45 min initial assessment'
        },
        marriage: {
          category: 'Naturalization',
          name: 'Acquisition of Nationality by Marriage',
          fee: '155,097 FCFA',
          desc: 'For spouses legally married for over 3 years to a Guinea-Bissau citizen.',
          estimate: '30 min initial intake'
        },
        descent: {
          category: 'Nationality',
          name: 'Nationality by Descent (Diaspora Members)',
          fee: 'Notarial Fee + Decree',
          desc: 'For diaspora members and returning international families seeking original citizenship.',
          estimate: '40 min intake consultation'
        },
        nameRectification: {
          category: 'Documents',
          name: 'Legal Name Rectification & Amendment',
          fee: 'Central Registry Notary Fee',
          desc: 'Judicial and administrative correction of civil records, orthographic alignment, and clerical errors.',
          estimate: '35 min consultation'
        },
        passport: {
          category: 'Identification',
          name: 'Guinea-Bissau Passport Issuance & Renewal',
          fee: 'Official DIC Fee',
          desc: 'Biometric capture appointment and accelerated status tracking at Border Directorate.',
          estimate: '30 min intake'
        },
        identityCard: {
          category: 'Identification',
          name: 'National Identity Card (BI)',
          fee: 'Civil Identification Official Fee',
          desc: 'First-time issuance or renewal of BI card for domestic and international residents.',
          estimate: '25 min intake'
        },
        criminalRecord: {
          category: 'Documents',
          name: 'Police Clearance Certificate',
          fee: 'Official Ministry of Justice Fee',
          desc: 'Expedited Guinea-Bissau criminal record clearance for employment, studies, and visa processing.',
          estimate: '20 min intake'
        },
        birthCertificate: {
          category: 'Documents',
          name: 'Civil Birth Certificate / Registration',
          fee: 'Central Archive Fee',
          desc: 'Search, transcription, and issuance of certified birth records from Central Archives in Bissau.',
          estimate: '25 min intake'
        }
      },

      step2Title: 'Consultation Modality and Time Slot:',
      step2Subtitle: 'Universal appointment system available in person or remotely for applicants located anywhere in the world.',
      presencialTitle: 'In-Person at Central Office',
      presencialDesc: 'Safim Centro / Reino, Guinea-Bissau',
      onlineTitle: 'Universal Remote / Online Consultation',
      onlineDesc: 'For Diaspora in Europe, the Americas, and all countries',
      dateLabel: 'Preferred Date',
      dateNote: 'Appointments available Monday through Saturday',
      timeLabel: 'Available Time Slot (Bissau GMT)',
      timeNote: 'Time slots are adjusted to accommodate international time zones',

      step3Title: 'Country of Residence & Applicant Information:',
      step3Subtitle: 'Universal appointment booking for citizens and applicants worldwide.',
      countryLabel: 'Current Country of Residence *',
      customCountryLabel: 'Specify Your Country:',
      customCountryPlaceholder: 'Name of your country of residence...',
      fullNameLabel: 'Applicant Full Name *',
      fullNamePlaceholder: 'Full first and last name',
      phoneLabel: 'Phone / WhatsApp with Country Code *',
      phonePlaceholder: '+1 ...',
      emailLabel: 'Your Email Address',
      emailPlaceholder: 'youremail@example.com',
      docLabel: 'Current Passport or ID Number',
      docPlaceholder: 'e.g. Passport / ID number',
      channelLabel: 'Preferred Communication Channel:',
      channelOptions: {
        whatsapp: 'WhatsApp (Messages and Call)',
        meet: 'Google Meet / Video Call',
        email: 'Official Email',
        office: 'In Person at Bissau Headquarters'
      },
      notesLabel: 'Case Notes or Specific Details (Optional):',
      notesPlaceholder: 'e.g., child of Guinea-Bissau parent born abroad',
      officialEmailTitle: 'Official Inboxes for Document Transmission:',
      officialBadge: 'Official EMDPN-GB',
      validationError: 'Please enter your full name and phone / WhatsApp number.',

      successTitle: 'Universal Appointment Completed!',
      successSubtitle: 'Your appointment has been successfully scheduled and your official protocol has been issued.',
      protocolBadge: 'Official EMDPN-GB Protocol',
      statusConfirmed: 'CONFIRMED',
      statusPending: 'PENDING',
      statusCompleted: 'COMPLETED',
      statusCancelled: 'CANCELLED',
      labelService: 'Service:',
      labelFee: 'Official Fee:',
      labelDateTime: 'Date & Time:',
      labelCountry: 'Country of Residence:',
      labelApplicant: 'Applicant:',
      labelChannel: 'Channel:',
      labelOfficialEmail: 'Official Receipt Email:',
      emailConfirmationSent: 'Confirmation email automatically sent to {email} successfully!',
      emailOfficialCc: 'Official copy archived to the EMDPN-GB Registry.',
      btnResendEmail: 'Resend Confirmation Email',
      btnSendWhatsApp: 'Send Confirmation via WhatsApp',
      btnSendEmail: 'Forward to Official Inboxes',
      btnDownload: 'Download Receipt (.TXT)',
      protocolSaveNote: 'Please keep this protocol number {protocol}. You can verify its progress at any time using the online tracker.',
      toastSuccess: 'Appointment successfully confirmed! Protocol: ',

      btnBack: 'Back',
      btnContinue: 'Continue',
      btnConfirm: 'Confirm Universal Appointment',

      trackerBadge: 'Fast Tracking',
      trackerTitle: 'Check Appointment Status',
      trackerSubtitle: 'Enter your Protocol Number (e.g., EMDPN-2026-1042) or your Phone number to verify your status.',
      trackerPlaceholder: 'e.g., EMDPN-2026-1042 or +1...',
      btnSearch: 'Check Status',
      trackerNotFoundTitle: 'No appointment found with the provided details.',
      trackerNotFoundDesc: 'Please verify the protocol number or reach our legal desk via WhatsApp at +245 957000555.',
      trackerConfirmedBadge: 'Confirmed Protocol',
      trackerFeeLabel: 'Public Treasury Fee:',
      trackerQuestions: 'Have questions regarding your appointment?',
      trackerSpeakBtn: 'Speak with an Officer',

      ratesTitle: 'Official Services & Schedule of Fees',
      ratesSubtitle: 'Statutory fees determined by the competent authorities of the Republic of Guinea-Bissau.',
      btnBookService: 'Book Now',

      infoLocationTitle: 'Location',
      infoLocationDesc: 'Safim Centro / Reino, Safim Sector, Guinea-Bissau.',
      infoHoursTitle: 'Official Working Hours',
      infoHoursDesc: 'Monday to Friday: 08:30 - 17:30 | Saturday: 09:00 - 13:00',
      infoSecurityTitle: 'Secure Processing',
      infoSecurityDesc: 'Guaranteed compliance with statutory State fees and transparent handling.'
    }
  },

  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      services: 'Servicios',
      requirements: 'Requisitos',
      process: 'Proceso',
      forms: 'Formularios',
      faq: 'FAQ',
      news: 'Noticias',
      contact: 'Contactos',
      book: 'Agendar',
      admin: 'Panel Admin',
      login: 'Entrar',
      subtitle: 'NATURALIZACIÓN · GUINEA-BISSAU',
      scheduleOnline: 'Agendar Cita en Línea',
      adminAccess: 'Acceder al Área Administrativa',
      language: 'Idioma'
    },
    hero: {
      republicPrefix: 'República de',
      republicSuffix: 'Guinea-Bissau',
      titleLine1: 'Su primera y segunda patria.',
      titleLine2: '¡Su ciudadanía es nuestro compromiso!',
      description: 'El EMDPN-GB es una estructura de consultoría y apoyo técnico-administrativo con sede en Safim, región de Biombo, Guinea-Bissau, dedicada a la orientación, asistencia y tramitación de expedientes de nacionalidad, ciudadanía, naturalización y documentación civil.',
      ctaBook: 'AGENDAR CITA / SOLICITUD',
      ctaWhatsapp: 'ATENCIÓN DIRECTA WHATSAPP',
      ctaProcess: 'CONOCER EL PROCESO',
      officialBadge: 'Gabinete Oficial de Registros y Naturalización · Bissau',
      photoCaption: 'Atención presencial y remota de apoyo documental en colaboración con el Ministerio de Justicia y Derechos Humanos de Guinea-Bissau.'
    },
    metrics: {
      completedTitle: 'Expedientes Concluidos',
      completedDesc: 'Con dictamen favorable',
      timelineTitle: 'Tiempo Medio de Espera',
      timelineValue: '1 a 12 Meses',
      timelineDesc: 'Plazo legal reglamentado',
      timelineLink: 'Ver Justificación Completa de Plazos',
      satisfactionTitle: 'Tasa de Satisfacción',
      satisfactionDesc: 'Transparencia y rigor',
      diasporaTitle: 'Países Atendidos',
      diasporaDesc: 'Diáspora y cooperación global'
    },
    audience: {
      sectionTitle: '¿A Quién se Dirige Nuestro Servicio?',
      sectionSubtitle: 'Asesoría jurídica especializada adaptada a cada situación de nacionalidad guineana',
      card1Title: '1. Ciudadanos en el Territorio Nacional',
      card1Desc: 'Residentes guineanos que enfrentan dificultades para obtener documentos (Cédula Personal, Carnet de Identidad, Antecedentes Penales y Pasaporte) para estudios, trabajo o tratamiento médico en el extranjero.',
      card2Title: '2. Diáspora Guineana',
      card2Desc: 'Nacidos en el extranjero, hijos de padre o madre guineana, que desean obtener su nacionalidad de origen y documentación legal.',
      card3Title: '3. Descendientes de Guinea-Bissau en la Diáspora y Retorno',
      card3Desc: 'Descendientes con raíces guineanas que deciden retornar a la tierra de sus ancestros y establecer vínculos jurídicos, culturales e históricos con Guinea-Bissau.',
      card4Title: '4. Ciudadanos con Derecho a la Nacionalidad',
      card4Desc: 'Profesionales, inversores, cooperantes y solicitantes que conforme a la ley tienen derecho a solicitar, reconocer o adquirir la nacionalidad.'
    },
    bookingSection: {
      title: 'Portal de Citas y Seguimiento de Expedientes',
      subtitle: 'Programe su consulta presencial o por videollamada, o consulte el estado de su cita en tiempo real.',
      tabBook: 'Agendar Nueva Cita',
      tabTrack: 'Consultar Cita Existente',
      noticeTravel: 'Incluye la modalidad urgente de solicitud de visado de viaje con tramitación consular prioritaria.'
    },
    partners: {
      title: 'Coordinación Institucional con el Estado',
      subtitle: 'Actuamos como Socio de Estado en la facilitación y conformidad documental ante los ministerios soberanos',
      partner1: 'Ministerio de Justicia',
      partner1Role: 'Dirección General de Identificación Civil, Registros y Notariado',
      partner2: 'Ministerio del Interior (DIC)',
      partner2Role: 'Dirección de Migración y Fronteras / Emisión de Pasaportes',
      partner3: 'Ministerio de Asuntos Exteriores',
      partner3Role: 'Cooperación Internacional, Apoyo a la Diáspora y Traducción de Documentos',
      partner4: 'Ministerio de Cultura',
      partner4Role: 'Para obtención de declaración de conformidad',
      partner5: 'Ayuntamiento de Bissau (Câmara Municipal)',
      partner5Role: 'Atestigua residencia por más de 5 años'
    },
    about: {
      title: 'Sobre el EMDPN-GB',
      subtitle: 'Estructura institucional, misión jurídica y actuación oficial como Socio de Estado en Guinea-Bissau.',
      tabStatus: 'Estatuto Institucional',
      tabOrgans: 'Órganos y Ministerios',
      tabPartnership: 'Alianzas de Estado',
      tabPrinciples: 'Principios y Transparencia',
      missionTitle: 'Misión y Vocación',
      missionDesc: 'Garantizar a cada solicitante un proceso riguroso, transparente y en estricto cumplimiento de la Ley de Nacionalidad de Guinea-Bissau.',

      // Presentation
      introBadge: 'Presentación Institucional · Safim / Biombo',
      introTitle: 'Su Primera y Segunda Patria.',
      introMotto: '"¡Su ciudadanía es nuestro compromiso!"',
      introDesc: 'El EMDPN-GB es una estructura de consultoría y apoyo técnico-administrativo con sede en Safim, región de Biombo, Guinea-Bissau, dedicada a la orientación, asistencia y tramitación de expedientes de nacionalidad, ciudadanía, naturalización y documentación civil.',
      ourMissionTitle: 'Nuestra Misión',
      ourMissionDesc: 'Facilitar el acceso de los ciudadanos a sus derechos de identidad y ciudadanía, prestando servicios de orientación y apoyo en la organización, preparación, tramitación y seguimiento de expedientes ante las instituciones públicas competentes.',
      scopeTitle: 'Ámbito y Destinatarios',
      scopeDesc: 'Nuestro trabajo está dirigido a los ciudadanos guineanos residentes en el territorio nacional, a los miembros de la diáspora guineana en todo el mundo y a todas las personas que, según la legislación aplicable, tengan derecho a solicitar, reconocer o adquirir la nacionalidad guineana. El gabinete actúa en estrecha colaboración con juristas profesionales y consultores especializados para garantizar el derecho a la adquisición de la nacionalidad.',
      btnBookOnline: 'Agendar Cita en Línea',
      btnContactDirector: 'Hablar con la Dirección',
      sealTitle: 'EMDPN-GB · Sello y Equipo Oficial',
      sealLocation: 'Safim Centro / Reino · Guinea-Bissau',
      photoAlt: 'Equipo Oficial de EMDPN-GB con Pasaporte de Guinea-Bissau',

      // 7 Procedures
      procBadge: 'Ámbito de Actuación y Procedimientos',
      procTitle: 'Procedimientos de Apoyo y Regularización',
      procSubtitle: 'Prestamos apoyo en diferentes procedimientos, garantizando orientación técnica y administrativa:',
      procedures: [
        {
          title: '1. Procesos de atribución y reconocimiento de la nacionalidad',
          desc: 'Instrucción documental para ciudadanos por origen, filiación y transcripción en los Registros Centrales.'
        },
        {
          title: '2. Procesos de nacionalidad por matrimonio',
          desc: 'Acompañamiento del proceso legal para cónyuges con más de 3 años de unión legal con ciudadano guineano, al amparo del artículo 8 de la ley de nacionalidad.'
        },
        {
          title: '3. Procesos de naturalización',
          desc: 'Asesoría para extranjeros y miembros de la diáspora con base al amparo del artículo 9 de la ley de nacionalidad.'
        },
        {
          title: '4. Procesos de modificación y rectificación de nombres y apellidos en las partidas de nacimiento, corrección de errores materiales y armonización ortográfica entre documentos.',
          desc: 'Rectificación de partidas y asientos de registro civil para uniformizar la ortografía de nombres y apellidos.'
        },
        {
          title: '5. Orientación para la organización y regularización de documentos civiles',
          desc: 'Apoyo en la obtención y renovación de Cédula Personal, Carnet de Identidad (BI), Antecedentes Penales para la obtención de Pasaporte.'
        },
        {
          title: '6. Apoyo administrativo en la preparación de solicitudes y expedientes',
          desc: 'Elaboración técnica de minutas, verificación previa de conformidad, copias autenticadas y traducciones oficiales.'
        },
        {
          title: '7. Orientación sobre los procedimientos legales y administrativos aplicables',
          desc: 'Aclaración sobre los trámites ante las instituciones estatales competentes.',
          fullWidth: true
        }
      ],

      // Bridge and Principles
      bridgeBadge: 'Puente Institucional',
      bridgeTitle: 'Puente entre Ciudadanos, Diáspora y el Estado',
      bridgeDesc: 'El EMDPN-GB busca tender un puente sólido entre los ciudadanos, la diáspora y las instituciones de justicia, identificación civil y nacionalidad, facilitando un servicio accesible, organizado, transparente y eficaz.',
      bridgeHighlight: 'Accesibilidad · Organización · Eficiencia Notarial',
      principlesBadge: 'Principios de Actuación',
      principlesTitle: 'Ética, Confidencialidad y Rigor',
      principlesDesc: 'Nuestra actuación se fundamenta en la responsabilidad, la estricta confidencialidad, la transparencia, el respeto a la legislación vigente y el compromiso con los derechos fundamentales.',
      principlesQuote: '"Creemos que la nacionalidad representa mucho más que un documento: es identidad, pertenencia, historia, reconocimiento y oportunidad."',

      // Statute Tab
      statuteBadge: 'Transparencia y Gobernanza',
      statuteTitle: 'Estatuto Oficial y Estructura del Gabinete',
      statuteChapters: [
        {
          numero: 'Capítulo I',
          titulo: 'Denominación, Naturaleza, Sede y Ámbito Territorial',
          artigos: [
            'Artículo 1.º (Denominación) - El Gabinete de Movilización de Documentos y Procesos de Naturalización en Guinea-Bissau, abreviado como EMDPN-GB, es una entidad jurídica dedicada a la asesoría, instrucción y tramitación de nacionalidad y documentos oficiales.',
            'Artículo 2.º (Sede Oficial) - El EMDPN-GB tiene su sede central en Safim Centro / Reino, Sector de Safim, Región de Biombo, República de Guinea-Bissau, atendiendo a nivel nacional e internacional.',
            'Artículo 3.º (Ámbito Universal) - El EMDPN-GB actúa en favor de los ciudadanos en el territorio nacional, la diáspora guineana en el mundo y toda persona con derecho a solicitar, reconocer o adquirir la nacionalidad guineana.'
          ]
        },
        {
          numero: 'Capítulo II',
          titulo: 'Objetivos Generales, Específicos y Marco Histórico',
          artigos: [
            'Artículo 4.º (Objetivo Principal) - Facilitar de forma legal, transparente y ágil el acceso a la ciudadanía guineana y a la documentación oficial para todos los solicitantes legítimos.',
            'Artículo 5.º (Apoyo a la Diáspora) - Apoyar expresamente a los miembros de la diáspora que buscan restablecer vínculos jurídicos permanentes con Guinea-Bissau y regularizar su ciudadanía.',
            'Artículo 6.º (Objetivos Específicos) - Asegurar el cotejo riguroso, traducción jurada, organización de expedientes, pago de tasas oficiales y acompañamiento hasta la concesión del Decreto, Acta de Nacimiento, Carnet y Pasaporte.'
          ]
        },
        {
          numero: 'Capítulo III',
          titulo: 'Destinatarios y Beneficiarios Oficiales',
          artigos: [
            '1. Diáspora Guineana: Nacidos en el exterior de padre o madre guineana que requieren regularizar y obtener su nacionalidad de origen y transcripción de registros civiles.',
            '2. Ciudadanos en el Territorio Nacional: Residentes guineanos con dificultades en la obtención de documentos vitales (BI, Cédula Personal, Antecedentes y Pasaporte) para estudios o empleo.',
            '3. Miembros de la Diáspora y Retornados: Descendientes con raíces acreditadas o vocación de integración e inversión en el país.',
            '4. Ciudadanos Extranjeros: Profesionales, cooperantes e inversores que cumplen con los requisitos legales de residencia continua o servicios destacados a Guinea-Bissau.'
          ]
        },
        {
          numero: 'Capítulo IV',
          titulo: 'Alianzas Institucionales con Órganos del Estado',
          artigos: [
            'Artículo 7.º (Articulación Gubernamental) - El EMDPN-GB actúa en estrecha colaboración con los órganos soberanos de la República de Guinea-Bissau:',
            'a) Ministerio de Justicia y Derechos Humanos: Dirección General de Registros, Notariado e Identificación Civil, Conservadurías Centrales y Tesoro de Justicia.',
            'b) Ministerio del Interior (DIC): Dirección de Migración y Fronteras para emisión biométrica y control de Pasaportes.',
            'c) Ministerio de Asuntos Exteriores y Cooperación: Asesoría consular y diplomática para la diáspora.',
            'd) Ministerio de Cultura: Para obtención de declaración de conformidad.',
            'e) Ayuntamiento de Bissau (Câmara Municipal): Atestigua residencia por más de 5 años.',
            'f) Imprenta Nacional (INACEP): Publicación oficial del Decreto Ministerial en el Boletín Oficial de Guinea-Bissau.'
          ]
        },
        {
          numero: 'Capítulo V',
          titulo: 'Principios Éticos, Jurídicos y Compromiso de Transparencia',
          artigos: [
            'Artículo 8.º (Cero Fraude al Estado y al Ciudadano) - El EMDPN-GB rechaza categóricamente intermediarios informales, sobornos o corrupción. Todos los expedientes se tramitan con base en hechos comprobados y documentos auténticos.',
            'Artículo 9.º (Tasas Públicas Tabuladas) - Todas las tasas estatales se depositan con comprobante oficial en el Tesoro General de Justicia (ej.: 770.482 FCFA para naturalización por residencia; 155.097 FCFA para matrimonio). El EMDPN-GB solo percibe honorarios transparentes.',
            'Artículo 10.º (Atención Humanizada) - Brindar a cada solicitante un trato digno, empático y respetuoso, reconociendo el valor sagrado del derecho a la ciudadanía.'
          ]
        },
        {
          numero: 'Capítulo VI',
          titulo: 'Órganos de Gestión y Dirección Ejecutiva',
          artigos: [
            'Artículo 11.º (Composición de la Dirección) - La gestión del EMDPN-GB está a cargo de profesionales acreditados:',
            '• Director Gerente: Cláudio Hortiz Altip (Coordinación Estratégica, Relaciones Institucionales y Representación General)',
            '• Auxiliar Administrativo: Valdano Amoná (Gestión Procesal, Protocolos Físicos y Logística Notarial)',
            '• Secretaria General: Isabel Sambé (Secretariado Ejecutivo, Citas Internacionales, Triaje y Atención al Público)',
            '• Asesoría Jurídica: Juristas profesionales especializados en Derecho de Nacionalidad y Procedimiento Administrativo.'
          ]
        },
        {
          numero: 'Capítulo VII',
          titulo: 'Atención Universal, Citas y Comunicación Oficial',
          artigos: [
            'Artículo 12.º (Canales Oficiales de Trámite) - Toda la documentación y solicitudes deben remitirse exclusivamente por los canales oficiales autorizados:',
            'Correo Oficial: infor.ciesemdpngb@gmail.com',
            'Teléfono y WhatsApp Institucional: +245 957000555',
            'Artículo 13.º (Cita Universal) - La plataforma de citas en línea de EMDPN-GB está abierta a interesados de cualquier país, con adaptación a zonas horarias y videollamadas seguras.'
          ]
        },
        {
          numero: 'Capítulo VIII',
          titulo: 'Disposiciones Finales y Confidencialidad Absoluta',
          artigos: [
            'Artículo 14.º (Seguridad de Datos) - Todos los documentos civiles, antecedentes y pasaportes gozan de secreto profesional estricto y salvaguarda integral.',
            'Artículo 15.º (Vigencia) - El presente Estatuto rige las actividades del despacho a partir de su protocolización formal.'
          ]
        }
      ],

      // Organs tab
      organs: [
        {
          name: 'Cláudio Hortiz Altip',
          role: 'Director Gerente',
          description: 'Coordinación estratégica, articulación directa con ministerios y representación institucional del EMDPN-GB.'
        },
        {
          name: 'Valdano Amoná',
          role: 'Auxiliar Administrativo',
          description: 'Gestión procesal, revisión documental, protocolos físicos y logística notarial en Bissau.'
        },
        {
          name: 'Isabel Sambé',
          role: 'Secretaria General',
          description: 'Secretariado ejecutivo, atención al solicitante, triaje inicial y gestión de citas internacionales.'
        }
      ],

      // Partnerships tab
      partnershipsTitle: 'Coordinación Institucional y Gubernamental',
      partnershipsDesc: 'El EMDPN-GB actúa en estrecha colaboración con los órganos de soberanía de Guinea-Bissau para asegurar que todos los expedientes de naturalización, registro civil, carnet y pasaporte cumplan rigurosamente la ley.',
      partnershipsList: [
        {
          name: 'Ministerio de Justicia',
          desc: 'Conservadurías de los Registros Centrales y Tesoro General de Justicia.'
        },
        {
          name: 'Ministerio del Interior (DIC)',
          desc: 'Dirección de Migración y Fronteras / Emisión de Pasaportes.'
        },
        {
          name: 'Ministerio de Asuntos Exteriores',
          desc: 'Apoyo consular a la Diáspora Guineana en el mundo.'
        },
        {
          name: 'Ministerio de Cultura',
          desc: 'Para obtención de declaración de conformidad.'
        },
        {
          name: 'Ayuntamiento de Bissau (Câmara Municipal)',
          desc: 'Atestigua residencia por más de 5 años.'
        }
      ],

      // Principles tab
      principlesCommitmentTitle: 'Compromiso Ético & Jurídico',
      principlesCommitmentQuote: '"Nuestro compromiso sagrado es no defraudar al Estado Guineano ni a nuestro cliente."',
      principlesCommitmentDesc: 'Rechazamos intermediarios informales. Todas las tasas públicas se ingresan directamente en los cofres del Estado, asegurando transparencia, seguridad jurídica y resguardo total de la documentación.',

      // Support Form
      supportSectionTitle: 'Canal de Apoyo Solidario, Donaciones y Comentarios',
      supportSectionSubtitle: 'Espacio abierto para aportes voluntarios, donaciones sin exigencia de reciprocidad y evaluación de servicios.',
      supportFormTitle: 'Formulario de Apoyo Voluntario y Feedback',
      supportFormDesc: 'Su colaboración ayuda a mantener la asistencia jurídica accesible y nuestros canales operativos con la máxima seguridad y rigor.',
      fieldName: 'Nombre y Apellidos',
      fieldEmail: 'Correo Electrónico Oficial',
      fieldPhone: 'Teléfono / WhatsApp',
      fieldSupportType: 'Tipo de Apoyo o Mensaje',
      fieldAmount: 'Monto de la Aportación Voluntaria (Opcional)',
      fieldCustomAmount: 'Otro Monto (FCFA / EUR / USD)',
      fieldOfficeSupplies: 'Especificación del Material de Oficina *',
      fieldFeedback: 'Comentarios, Sugerencias o Valoración',
      placeholderFeedback: 'Escriba aquí sus comentarios, valoraciones o detalles sobre su aportación voluntaria...',
      btnSubmitSupport: 'Enviar Apoyo / Comentarios con Confidencialidad',
      securityAssurance: 'Protocolo de Seguridad Activo: Datos protegidos contra accesos no autorizados bajo secreto notarial.',

      // Headquarter Location
      locationBadge: 'Sede Central del EMDPN-GB',
      locationTitle: 'Dónde Encontrarnos',
      locationAddressTitle: 'Dirección Física:',
      locationAddressValue: 'Safim Centro / Reino, Sector de Safim, Región de Biombo, Guinea-Bissau',
      locationPhoneTitle: 'Teléfono & WhatsApp:',
      locationEmailTitle: 'Correo Oficial:',
      btnLocationSchedule: 'Agendar Atención',
      btnLocationContacts: 'Ver Más Contactos'
    },
    services: {
      title: 'Nuestros Servicios y Organización Documental',
      subtitle: 'Soluciones ágiles, Citas para solicitud de visado de viaje y cadena documental en estricto orden legal ascendente.',
      catalogBadge: 'Catálogo de Servicios Oficiales',
      catalogTitle: 'Atención Especializada',
      catalogDesc: 'Desde la atención urgente para viajeros hasta la tramitación completa de expedientes de nacionalidad.',
      ascendingTitle: 'Cadena de Documentos en Orden Ascendente',
      ascendingSubtitle: 'La legislación de Guinea-Bissau exige que cada documento sea emitido en base al anterior:',
      commitmentTitle: 'Compromiso de Celeridad',
      commitmentDesc: 'Su tiempo es valioso. Nuestro gabinete utiliza canales oficiales directos para evitar que su trámite se detenga en gavetas burocráticas.',
      btnBookAppointment: 'SOLICITAR CITA',
      serviceTravel: 'Agendamento de pedido de visto de Viagem/ consulta nas embaçadas',
      serviceTravelDesc: 'Atención prioritaria de emergencia para pasajeros con billete emitido, compromisos internacionales y visados inaplazables.',
      serviceDiaspora: 'Naturalización para la Diáspora',
      serviceDiasporaDesc: 'Apoyo integral a guineanos y a la diáspora en el exterior que desean obtener su nacionalidad legal y regularizar sus documentos.',
      serviceDocChain: 'Documentos Nacionales en Orden Legal',
      serviceDocChainDesc: 'Obtención y tramitación ordenada de documentos oficiales para residentes y no residentes.',
      serviceTranslation: 'Traducción y Legalización Oficial',
      serviceTranslationDesc: 'Traducción jurada al portugués de documentos extranjeros y legalizaciones ministeriales.',
      serviceRepresentation: 'Representación Institucional en Bissau',
      serviceRepresentationDesc: 'Nuestro equipo actúa presencialmente ante los ministerios de Justicia e Interior supervisando cada caso.'
    },
    process: {
      title: 'El Proceso Oficial',
      subtitle: 'Conozca el camino paso a paso hasta su ciudadanía y emisión de documentos.',
      step1Title: '1. Consulta y Diagnóstico',
      step1Desc: 'Evaluamos su situación y documentos. Si es viable, enviamos el presupuesto y la lista de recaudos faltantes.',
      step2Title: '2. Preparación del Expediente',
      step2Desc: 'Gestionamos traducciones, legalizaciones y la conformación del expediente según los estándares oficiales.',
      step3Title: '3. Presentación y Tramitación',
      step3Desc: 'El expediente se presenta ante el Ministerio de Justicia. Nuestro equipo en Bissau acompaña dictámenes y firmas.',
      step4Title: '4. Registro Civil y Documentos',
      step4Desc: 'Tras la aprobación, se inscribe el acta de nacimiento y se agenda la toma de datos para Carnet y Pasaporte.',
      timelineBadge: 'Plazos y Tiempos Estimados',
      timelineTitle: 'Tiempo Medio: 1 a 12 Meses',
      timelineDesc: 'El plazo varía según los certificados a emitir y la carga de los servicios soberanos del Estado.',
      btnDelayJustification: 'Ver Justificación Completa de Plazos (Estado vs. Documentos) →',
      btnEstimateCase: 'Pedir Estimación para Mi Caso'
    },
    requirements: {
      title: 'Requisitos y Documentación Exigida',
      subtitle: 'Listado oficial de recaudos por tipo de solicitud y tasas legales del Tesoro General de Justicia.',
      catResidence: 'Naturalización por Residencia',
      catMarriage: 'Nacionalidade por Matrimonio',
      catDescent: 'Nacionalidad por Descendencia / Ancestralidad',
      catOrigin: 'Adquisición por Origen (Hijos de Guineanos)',
      officialFeeLabel: 'Tasa Oficial del Tesoro de Justicia',
      docsOriginLabel: 'Documentos del País de Origen',
      docsGuineaLabel: 'Documentos a Emitir en Guinea-Bissau',
      btnRequestGuide: 'Solicitar Guía Completa por WhatsApp'
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Información fundamental sobre nuestros servicios y el marco legal en Guinea-Bissau.',
      helpTitle: '¿Tiene preguntas específicas sobre su caso?',
      helpDesc: 'Nuestro equipo legal está listo para analizar su situación de forma personalizada.',
      btnSpeakTeam: 'Hablar con el Equipo Jurídico'
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'A su disposición en Safim/Bissau y a través de los canales digitales oficiales.',
      chatTitle: 'Atención Directa por WhatsApp',
      chatDesc: 'Comuníquese en tiempo real con nuestros consultores legales.',
      btnOpenWhatsApp: 'Abrir WhatsApp (+245 957000555)',
      officeTitle: 'Sede Principal en Bissau',
      officeAddress: 'Safim Centro / Reino, Sector de Safim, Región de Biombo, Guinea-Bissau',
      hoursTitle: 'Horario de Atención',
      hoursDesc: 'Lunes a Viernes: 08:00 – 17:00 | Sábados: 09:00 – 13:00',
      emailTitle: 'Único Correo Oficial',
      formTitle: 'Envíenos un Mensaje',
      formDesc: 'Complete el formulario y le responderemos en un plazo máximo de 24 horas hábiles.',
      labelName: 'Nombre Completo *',
      placeholderName: 'Nombre y Apellidos',
      labelEmail: 'Su Correo Electrónico *',
      labelPhone: 'Teléfono / WhatsApp *',
      labelService: 'Servicio Solicitado',
      labelMessage: 'Mensaje / Detalle de su caso *',
      btnSend: 'Enviar Mensaje Oficial',
      btnSending: 'Enviando mensaje...',
      sendSuccess: '¡Mensaje enviado con éxito! Nuestro equipo se comunicará con usted a la brevedad.'
    },
    downloads: {
      title: 'Formularios y Modelos de Solicitud',
      subtitle: 'Consulte y descargue los modelos oficiales antes de presentar su expediente.',
      tabReading: 'Modo de Lectura Completo',
      tabOriginalDoc: 'Documento Oficial Original',
      tabTemplates: 'Modelos Oficiales y Vista Previa',
      transcriptionBadge: 'Transcripción Fiel del Documento de la Conservaduría',
      btnCopyFull: 'Copiar Texto Completo',
      copiedToast: '¡Transcripción copiada al portapapeles!',
      originalDocTitle: 'Documento Oficial de la Conservaduría General de Registros',
      originalDocSubtitle: 'Fotografía del documento oficial con sello del Tesoro General de Justicia.',
      btnOpenHD: 'Abrir en Alta Resolución',
      notePrefix: 'Nota de EMDPN-GB:',
      noteContent: 'Nuestra oficina tramita todos estos certificados ante la Alcaldía de Bissau, Ministerio de Cultura, Migración y Fronteras, así como las traducciones juradas.',
      seqBadge: 'Secuencia Legal Obligatoria',
      seqTitle: 'Modelos de Documentos en Orden Creciente',
      seqSubtitle: 'Previsualice directamente en el navegador o descargue los formularios organizados en la secuencia procesal obligatoria, desde la Cédula Personal hasta el Historial Ancestral.',
      btnPreview: 'Previsualizar',
      btnDownload: 'Descargar',
      helpTitle: '¿Necesita Ayuda para Llenar sus Documentos?',
      helpDesc: 'En caso de dudas sobre cómo completar la Cédula, el Historial Ancestral o la Petición, el equipo de EMDPN-GB le asiste presencialmente en Bissau o a través de WhatsApp.',
      btnAssisted: 'Agendar Atención Asistida',
      btnWhatsApp: 'Hablar por WhatsApp',
      modalTitle: 'Vista Previa del Modelo Oficial',
      modalClose: 'Cerrar',
      btnCopyText: 'Copiar Texto',
      btnDownloadFile: 'Descargar Archivo',
      downloadSuccessToast: '¡Modelo descargado con éxito!',
      republicTitle: 'REPÚBLICA DE GUINEA-BISSAU',
      quickSearch: {
        title: 'Búsqueda Rápida de Cita',
        placeholder: 'Ingrese el número de protocolo (ej: EMDPN-2026-...) o nombre...',
        btnSearch: 'Buscar Cita',
        notFound: 'No se encontró ninguna cita con este número o nombre. Por favor verifique el número de protocolo o consulte la página de citas.',
        resultsTitle: 'Resultados de Búsqueda:',
        close: 'Cerrar',
        viewTracker: 'Ir al Rastreador Completo'
      },
      templates: [
        {
          step: '01',
          title: 'Solicitud de Cédula Personal / Acta de Nacimiento',
          tag: '1º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Formulario oficial de búsqueda, transcripción y expedición de partida o certificado narrativo de nacimiento en la Conservaduría de Registros Centrales.'
        },
        {
          step: '02',
          title: 'Solicitud de Certificado de Antecedentes Penales',
          tag: '2º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Modelo de petición para la expedición de antecedentes penales de Guinea-Bissau y comprobación de solvencia cívica y judicial.'
        },
        {
          step: '03',
          title: 'Ficha de Solicitud de Carnet de Identidad (BI)',
          tag: '3º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Ficha de inscripción de identificación civil guineana para cita de captura biométrica y expedición del Carnet de Identidad.'
        },
        {
          step: '04',
          title: 'Acta de Presentación y Validación de Copia de Pasaporte',
          tag: '4º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Ficha de cotejo, traducción y autenticación notarial de copia de pasaporte internacional, visados y sellos de entrada.'
        },
        {
          step: '05',
          title: 'Declaración de Presentación de Certificado de ADN',
          tag: '5º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Acta de entrega de dictamen genético de ascendencia y vinculación biológica para procesos de retorno de la diáspora africana.'
        },
        {
          step: '06',
          title: 'Expediente de Historial Ancestral y Árbol Genealógico',
          tag: '6º Paso Creciente',
          size: 'Modelo Oficial (.TXT)',
          desc: 'Formulario exhaustivo de linaje familiar, comprobación de ascendencia guineana y fundamentación de la solicitud de nacionalidad.'
        },
        {
          step: '07',
          title: 'Formulario Oficial de Solicitud de Naturalización',
          tag: 'Proceso General',
          size: 'Microsoft Word (.docx)',
          desc: 'Formulario completo de identificación y solicitud de expediente ante las autoridades de Guinea-Bissau.'
        },
        {
          step: '08',
          title: 'Modelo de Carta de Petición al Ministerio de Justicia',
          tag: 'Petición Formal',
          size: 'Microsoft Word (.docx)',
          desc: 'Petición formal con fundamentación jurídica dirigida al Excelentísimo Señor Ministro de Justicia.'
        },
        {
          step: '09',
          title: 'Modelo de Poder Notarial y Representación Legal',
          tag: 'Representación Legal',
          size: 'Microsoft Word (.docx)',
          desc: 'Instrumento de poder notarial que autoriza a nuestro despacho en Bissau a tramitar e impulsar su expediente.'
        }
      ]
    },
    news: {
      title: 'Noticias y Comunicados',
      subtitle: 'Manténgase informado sobre la ley de nacionalidad, decretos y novedades institucionales.',
      btnReadMore: 'Leer más'
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      legalNote: 'EMDPN-GB — Conforme a la Ley de Nacionalidad de la República de Guinea-Bissau.',
      officialEmailTitle: 'Correo Oficial:',
      phoneTitle: 'Teléfono / WhatsApp:',
      locationTitle: 'Ubicación:',
      hoursTitle: 'Horario Notarial:',
      hoursValue: 'Lun - Vie: 08:00 - 17:00 | Sáb: 09:00 - 13:00'
    },
    delayJustification: {
      title: 'Justificación Oficial de Plazos y Demoras Procesales',
      subtitle: 'Aclaración profesional sobre los tiempos de espera (1 a 12 meses) y los factores determinantes en los órganos del Estado y la documentación.',
      backLink: 'Volver a la Página del Proceso',
      bannerBadge: 'Transparencia Jurídica & Realidad Administrativa',
      bannerTitle: 'Tiempo Estimado: Entre 1 a 12 Meses',
      bannerDesc: 'La adquisición de nacionalidad y la expedición de documentos oficiales en Guinea-Bissau es un acto solemne de soberanía estatal. Cada expediente pasa por rigurosas fases de verificación jurídica, cotejo en registros y decretos ministeriales.',
      averageTitle: 'Promedio de Conclusión',
      averageValue: '1 a 12 Meses',
      averageDesc: 'Según la modalidad y complejidad',
      factorsBadge: 'Factores Determinantes',
      factorsTitle: 'Las Dos Razones Fundamentales de Demora',
      factorsSubtitle: 'Comprenda las diferencias entre los plazos de los órganos estatales y el avance de las pruebas documentales.',
      cause1Badge: 'Causa Administrativa 01',
      cause1Title: 'Demora por Parte del Estado y Ministerios',
      cause1Desc: 'Incluso con el expediente debidamente preparado, el proceso depende exclusivamente de decretos del Poder Ejecutivo y cotejo en los libros estatales:',
      cause1Point1Title: 'Conservatória dos registros centrais (Conservatoria de los Registros Centrales):',
      cause1Point1Desc: 'Búsqueda y cotejo minucioso en los libros antiguos de registro civil en Bissau para certificar la legitimidad de las partidas de nacimiento.',
      cause1Point2Title: 'Dictámenes de Seguridad y Migración:',
      cause1Point2Desc: 'Emisión de certificados de idoneidad y verificación por parte de la Dirección de Migración y Fronteras.',
      cause1Point3Title: 'Decreto Ministerial y Firmas:',
      cause1Point3Desc: 'El Ministro de Justicia examina y firma formalmente los decretos de concesión o reconocimiento de nacionalidad.',
      cause1Point4Title: 'A ser mudada após a publicação na Imprensa Nacional (Modificada tras publicación oficial):',
      cause1Point4Desc: 'En casos de naturalización, el estado legal del solicitante solo pasa a ser modificado y adquiere plena validez tras la publicación en la Imprensa Nacional (Boletín Oficial).',
      cause1ActionTitle: 'Cómo actúa el EMDPN-GB:',
      cause1ActionDesc: 'Nuestro equipo presencial en Safim y Bissau realiza seguimiento semanal ante el Ministerio para evitar retrasos burocráticos.',
      cause2Badge: 'Causa Documental 02',
      cause2Title: 'Demora por el Andamiento y Pruebas Documentales',
      cause2Desc: 'El ritmo del expediente depende directamente de la autenticidad, claridad y rapidez en la obtención de certificados por el propio solicitante:',
      cause2Point1Title: 'Suprimir notarial previa:',
      cause2Point1Desc: 'Divergencias ortográficas entre la cédula personal, pasaporte o actas de los padres exigen rectificación y supresión notarial previa.',
      cause2Point2Title: 'Legalizaciones Consulares y Apostillas:',
      cause2Point2Desc: 'Los documentos extranjeros requieren legalización consular o apostilla para tener validez jurídica plena en Guinea-Bissau.',
      cause2Point3Title: 'Antecedentes Penales Internacionales:',
      cause2Point3Desc: 'Obtención de registros penales de los países de residencia de los últimos 5 años con traducción jurada al portugués.',
      cause2Point4Title: 'Pruebas de Ascendencia y ADN:',
      cause2Point4Desc: 'En casos de la diáspora por ascendencia, los dictámenes de ADN y árboles genealógicos pasan por auditoría previa.',
      cause2ActionTitle: 'Cómo agiliza el EMDPN-GB:',
      cause2ActionDesc: 'Auditamos todos sus documentos antes del registro formal, eliminando el 98% de notificaciones y demoras por nombres dispares.'
    },
    appointments: {
      title: 'Agendamiento de Citas y Documentos',
      subtitle: 'Reserve su consulta presencial o remota con el equipo jurídico del EMDPN-GB.',
      tabNew: 'Nueva Cita',
      tabTrack: 'Consultar por Protocolo',
      tabRates: 'Tabla de Servicios y Tasas',
      
      wizardBadge: 'Cita Universal y Diáspora',
      wizardTitle: 'Reserva de Atención y Documentación',
      stepOf: 'Paso {current} de {total}',
      steps: {
        service: '1. Servicio',
        modality: '2. Modalidad',
        details: '3. País y Datos',
        confirm: '4. Confirmación'
      },

      step1Title: 'Seleccione el Servicio Legal Requerido:',
      step1Subtitle: 'Procesos de nacionalidad, naturalización y documentos oficiales de la República de Guinea-Bissau.',
      
      services: {
        travel: {
          category: 'Viaje y Urgencia',
          name: 'Cita por Viaje Urgente (Vuelo y Embajada)',
          fee: 'Tasa Notarial de Urgencia',
          desc: 'Atención prioritaria de emergencia para pasajeros con billete emitido, vuelos inminentes y citas de visado consular.',
          estimate: 'Triaje prioritario urgente (24h a 48h)'
        },
        naturalization: {
          category: 'Naturalización',
          name: 'Adquisición de Nacionalidad por Naturalización',
          fee: '770.482 FCFA',
          desc: 'Para extranjeros residentes durante más de 5 años continuos en territorio guineano.',
          estimate: '45 min de evaluación inicial'
        },
        marriage: {
          category: 'Naturalización',
          name: 'Adquisición de Nacionalidad por Matrimonio',
          fee: '155.097 FCFA',
          desc: 'Para cónyuges legalmente casados durante más de 3 años con ciudadano(a) guineano(a).',
          estimate: '30 min de consulta inicial'
        },
        descent: {
          category: 'Nacionalidad',
          name: 'Nacionalidad por Descendencia (Diáspora)',
          fee: 'Tasa Notarial + Decreto',
          desc: 'Para miembros de la diáspora guineana y familias internacionales que retornan a sus orígenes.',
          estimate: '40 min de consulta'
        },
        nameRectification: {
          category: 'Documentos',
          name: 'Procedimientos de Rectificación y Cambio de Nombre',
          fee: 'Tasa Notarial de Registros Centrales',
          desc: 'Subsanación judicial y administrativa de partidas, armonización ortográfica y corrección de errores materiales.',
          estimate: '35 min de consulta'
        },
        passport: {
          category: 'Identificación',
          name: 'Expedición y Renovación de Pasaporte Guineano',
          fee: 'Tasa Oficial de la DIC',
          desc: 'Cita para captura biométrica y seguimiento ágil ante la Dirección de Migración.',
          estimate: '30 min de atención'
        },
        identityCard: {
          category: 'Identificación',
          name: 'Expedición de Cédula de Identidad (BI)',
          fee: 'Tasa Oficial de Identificación Civil',
          desc: 'Expedición de primera vez o renovación de BI para residentes y ciudadanos en el exterior.',
          estimate: '25 min de atención'
        },
        criminalRecord: {
          category: 'Documentos',
          name: 'Certificado de Antecedentes Penales',
          fee: 'Tasa Oficial de Justicia',
          desc: 'Emisión rápida de antecedentes penales guineanos para fines de estudio, empleo y visados.',
          estimate: '20 min de atención'
        },
        birthCertificate: {
          category: 'Documentos',
          name: 'Partida de Nacimiento / Asiento Civil',
          fee: 'Tasa del Conservatorio Central',
          desc: 'Búsqueda, transcripción y expedición de partidas en los Registros Centrales de Bissau.',
          estimate: '25 min de atención'
        }
      },

      step2Title: 'Modalidad y Horario de Atención:',
      step2Subtitle: 'Atención universal disponible de forma presencial o remota para solicitantes en cualquier país del mundo.',
      presencialTitle: 'Presencial en el Despacho',
      presencialDesc: 'Safim Centro / Reino, Guinea-Bissau',
      onlineTitle: 'Atención Universal en Línea',
      onlineDesc: 'Para Diáspora en Europa, América y cualquier país',
      dateLabel: 'Fecha Deseada',
      dateNote: 'Atención de Lunes a Sábado',
      timeLabel: 'Horario Disponible (GMT Bissau)',
      timeNote: 'Adaptamos los horarios para solicitantes en distintas zonas horarias',

      step3Title: 'País de Residencia y Datos del Solicitante:',
      step3Subtitle: 'Agendamiento universal para ciudadanos e interesados de cualquier parte del mundo.',
      countryLabel: 'País Donde se Encuentra Actualmente *',
      customCountryLabel: 'Especifique su País:',
      customCountryPlaceholder: 'Nombre de su país de residencia...',
      fullNameLabel: 'Nombre Completo del Solicitante *',
      fullNamePlaceholder: 'Nombre y apellidos completos',
      phoneLabel: 'Teléfono / WhatsApp con Prefijo *',
      phonePlaceholder: '+34 ...',
      emailLabel: 'Su Correo Electrónico',
      emailPlaceholder: 'sucorreo@ejemplo.com',
      docLabel: 'Nº de Pasaporte o Documento de Identidad',
      docPlaceholder: 'Ej.: Pasaporte / DNI / Cédula',
      channelLabel: 'Canal Preferente de Contacto:',
      channelOptions: {
        whatsapp: 'WhatsApp (Mensajes y Llamada)',
        meet: 'Google Meet / Videollamada',
        email: 'Correo Electrónico Oficial',
        office: 'Presencial en la Sede en Bissau'
      },
      notesLabel: 'Observaciones o Caso Particular (Opcional):',
      notesPlaceholder: 'Ej.: hijo de madre o padre guineano nacido en el extranjero',
      officialEmailTitle: 'Correos Oficiales para Envío de Documentación:',
      officialBadge: 'Oficiales EMDPN-GB',
      validationError: 'Por favor, complete su Nombre y Apellidos completos y su Teléfono / WhatsApp.',

      successTitle: '¡Cita Universal Confirmada!',
      successSubtitle: 'Su cita ha sido registrada con éxito y se ha emitido el protocolo oficial.',
      protocolBadge: 'Protocolo Oficial EMDPN-GB',
      statusConfirmed: 'CONFIRMADO',
      statusPending: 'PENDIENTE',
      statusCompleted: 'CONCLUIDO',
      statusCancelled: 'CANCELADO',
      labelService: 'Servicio:',
      labelFee: 'Tasa Oficial:',
      labelDateTime: 'Fecha y Hora:',
      labelCountry: 'País de Residencia:',
      labelApplicant: 'Solicitante:',
      labelChannel: 'Canal:',
      labelOfficialEmail: 'Correo Oficial de Recepción:',
      emailConfirmationSent: '¡Correo de confirmación enviado automáticamente con éxito a {email}!',
      emailOfficialCc: 'Copia oficial archivada en los registros de EMDPN-GB.',
      btnResendEmail: 'Reenviar Correo de Confirmación',
      btnSendWhatsApp: 'Enviar Comprobante por WhatsApp',
      btnSendEmail: 'Reenviar a los 2 Correos Oficiales',
      btnDownload: 'Descargar Comprobante (.TXT)',
      protocolSaveNote: 'Guarde este número de protocolo {protocol}. Puede consultarlo en cualquier momento a través del rastreador del sitio.',
      toastSuccess: '¡Cita confirmada con éxito! Protocolo: ',

      btnBack: 'Volver',
      btnContinue: 'Continuar',
      btnConfirm: 'Confirmar Cita Universal',

      trackerBadge: 'Rastreo Rápido',
      trackerTitle: 'Consultar Estado de la Cita',
      trackerSubtitle: 'Ingrese su Nº de Protocolo (ej: EMDPN-2026-1042) o su Teléfono para verificar el estado.',
      trackerPlaceholder: 'Ej.: EMDPN-2026-1042 o +34...',
      btnSearch: 'Consultar',
      trackerNotFoundTitle: 'No se encontró ninguna cita con el protocolo o contacto indicado.',
      trackerNotFoundDesc: 'Verifique si ingresó el protocolo correctamente o comuníquese con nuestro equipo por WhatsApp al +245 957000555.',
      trackerConfirmedBadge: 'Protocolo Confirmado',
      trackerFeeLabel: 'Tasa del Tesoro Público:',
      trackerQuestions: '¿Dudas sobre su cita?',
      trackerSpeakBtn: 'Hablar con un Asesor',

      ratesTitle: 'Servicios y Tasas Oficiales de Agendamiento',
      ratesSubtitle: 'Valores oficiales fijados por las autoridades competentes de Guinea-Bissau.',
      btnBookService: 'Agendar',

      infoLocationTitle: 'Ubicación',
      infoLocationDesc: 'Safim Centro / Reino, Sector de Safim, Guinea-Bissau.',
      infoHoursTitle: 'Horario Oficial',
      infoHoursDesc: 'Lunes a Viernes: 08:30 - 17:30 | Sábados: 09:00 - 13:00',
      infoSecurityTitle: 'Atención Segura',
      infoSecurityDesc: 'Garantía de tasas estatales reguladas sin sobrecostes indebidos.'
    }
  }
};
