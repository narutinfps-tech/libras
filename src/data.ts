// Marketing copy data for the "Atividades Prontas para Ensinar Libras" sales page.

export interface PainCard {
  id: string;
  title: string;
  description: string;
}

export interface BenefitHighlight {
  id: string;
  title: string;
  description: string;
}

export interface MaterialBlock {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const PAIN_CARDS: PainCard[] = [
  {
    id: "pain-1",
    title: "Falta de tempo",
    description: "Você precisa de atividades prontas para usar, sem passar horas montando cada página de exercícios."
  },
  {
    id: "pain-2",
    title: "Poucos materiais visuais",
    description: "Muitos materiais disponíveis por aí são simples demais, confusos ou pouco atrativos para prender a atenção dos alunos."
  },
  {
    id: "pain-3",
    title: "Dificuldade para variar as aulas",
    description: "Repetir sempre a mesma proposta deixa o aprendizado engessado, menos dinâmico e menos interessante."
  },
  {
    id: "pain-4",
    title: "Material sem aparência profissional",
    description: "Professores precisam de recursos bonitos, claros e organizados para poder imprimir e aplicar com total segurança pedagógica."
  }
];

export const BENEFITS: BenefitHighlight[] = [
  {
    id: "benefit-1",
    title: "Pronto para imprimir",
    description: "Basta baixar o arquivo PDF de alta definição, imprimir as vias e aplicar imediatamente em sala de aula."
  },
  {
    id: "benefit-2",
    title: "Visual atrativo",
    description: "Páginas coloridas, diagramação limpa, amigável e perfeitamente organizada para capturar o interesse lúdico."
  },
  {
    id: "benefit-3",
    title: "Atividades variadas",
    description: "Chega de material monótono. O kit traz diversidade de exercícios para fixar o alfabeto de diferentes maneiras cognitivas."
  },
  {
    id: "benefit-4",
    title: "Ideal para sala de aula",
    description: "Feito sob medida para crianças, alunos iniciantes, reforço escolar, Atendimento Educacional Especializado (AEE) e propostas de inclusão."
  },
  {
    id: "benefit-5",
    title: "Economia real de tempo",
    description: "Evite todo o estresse de criar designs complicados. Nós já fizemos todo o trabalho difícil por você."
  }
];

export const MATERIAL_BLOCKS: MaterialBlock[] = [
  {
    id: "block-1",
    title: "Atividades do Alfabeto Manual em Libras",
    description: "Páginas ricas focadas em trabalhar o reconhecimento das letras associando-as diretamente aos seus sinais de mão correspondentes.",
    badge: "Alfabeto Completo"
  },
  {
    id: "block-2",
    title: "Atividades de ligar e relacionar",
    description: "Exercícios lúdicos de associação que treinam a correspondência visual rápida entre a letra do alfabeto e a configuração de mãos.",
    badge: "Associação Visual"
  },
  {
    id: "block-3",
    title: "Atividades de circular e marcar",
    description: "Propostas intuitivas de múltipla escolha para reforçar a identificação correta do sinal, ideais para avaliações e revisões de foco.",
    badge: "Foco & Atenção"
  },
  {
    id: "block-4",
    title: "Atividades de sequência alfabética",
    description: "Páginas dinâmicas para preencher os espaços em branco e completar a ordem natural das letras com reforço dos sinais visuais da Libras.",
    badge: "Sequência Pedagógica"
  },
  {
    id: "block-5",
    title: "Atividades de recorte e colagem",
    description: "Recursos práticos e táteis para exercitar a coordenação motora fina enquanto estimula o aprendizado físico dos sinais manuais.",
    badge: "Interativo & Tátil"
  },
  {
    id: "block-6",
    title: "Atividades de revisão geral",
    description: "Páginas elaboradas de fixação no final do caderno idealizadas para revisar e reter o conteúdo de forma divertida e memorável.",
    badge: "Fixação e Retenção"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Eu precisava de atividades prontas para trabalhar Libras com meus alunos e esse material facilitou muito. As páginas são bonitas, organizadas e fáceis de aplicar.",
    name: "Professora Ana Paula",
    role: "Ensino Fundamental I",
    avatarColor: "bg-blue-100 text-blue-600"
  },
  {
    id: "test-2",
    quote: "O que mais gostei foi a praticidade. Imprimi as atividades e consegui usar na aula sem perder tempo montando tudo do zero.",
    name: "Carla Mendes",
    role: "Pedagoga e Psicopedagoga",
    avatarColor: "bg-purple-100 text-purple-600"
  },
  {
    id: "test-3",
    quote: "As atividades são visuais e chamam a atenção das crianças. É um apoio muito bom para trabalhar o alfabeto manual em sala.",
    name: "Juliana Santos",
    role: "Professora de Apoio Escolar",
    avatarColor: "bg-amber-100 text-amber-600"
  },
  {
    id: "test-4",
    quote: "Material bem organizado, colorido e direto ao ponto. Ajuda muito quem precisa de recursos prontos para complementar as aulas.",
    name: "Renata Oliveira",
    role: "Educadora no AEE (Atend. Educ. Especializado)",
    avatarColor: "bg-emerald-100 text-emerald-600"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "O material é enviado por correios?",
    answer: "Não. O material é 100% digital em formato PDF de altíssima definição. Você receberá o link para baixar em seu e-mail logo após a confirmação e poderá imprimir em casa ou na escola quantas vezes precisar."
  },
  {
    id: "faq-2",
    question: "Serve para qual público?",
    answer: "O kit foi planejado para professores, pedagogas, profissionais do AEE, terapeutas, psicopedagogos, reforço escolar, pais e qualquer educador que deseje ensinar o alfabeto manual em Libras para crianças ou alunos iniciantes."
  },
  {
    id: "faq-3",
    question: "O material ensina a Libras completa (fluência)?",
    answer: "Não. O foco do material é dar um excelente apoio pedagógico no ensino inicial do alfabeto datilológico (manual) através de exercícios práticos. Ele é um suporte indispensável, mas não substitui um curso de formação de Libras completo."
  },
  {
    id: "faq-4",
    question: "Posso usar em sala de aula com meus alunos?",
    answer: "Sim! O material foi configurado no padrão de folhas A4, pronto para impressão em alta qualidade. É totalmente liberado imprimir as folhas e cards para aplicar nas suas respectivas salas de aula e atividades escolares."
  },
  {
    id: "faq-5",
    question: "Como e quando recebo o material?",
    answer: "O envio é imediato! Se você pagar por Pix ou Cartão de Crédito, o link de acesso seguro é enviado instantaneamente para o seu e-mail logo após a conclusão da aprovação."
  },
  {
    id: "faq-6",
    question: "Preciso baixar softwares ou editar o material?",
    answer: "Não, de forma alguma! As atividades já vêm perfeitamente diagramadas, centralizadas e prontas para impressão imediata. Basta abrir o arquivo e mandar para a impressora tradicional."
  },
  {
    id: "faq-7",
    question: "Posso imprimir quantas vezes eu quiser?",
    answer: "Sim! Você tem licença de uso pessoal e escolar ilimitada. Você pode imprimir o arquivo PDF todas as vezes que abrir uma nova turma ou precisar de reposição de atividades ao longo do ano letivo."
  }
];
