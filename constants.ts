import { RuleCategory, Schedule, Professional, NearbyPlace } from './types';

export const CONDO_NAME = "Ecovila Santa Margarida";

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: '1',
    name: 'Paulínia Shopping',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?q=80&w=800&auto=format&fit=crop',
    distance: '2.5 km',
    address: 'Av. Pref. José Lozano Araújo, 1515',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  },
  {
    id: '2',
    name: 'Parque Zeca Malavazzi',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1496071868846-5c5a70999026?q=80&w=800&auto=format&fit=crop',
    distance: '3.0 km',
    address: 'R. Álvaro Ribeiro, 191',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  },
  {
    id: '3',
    name: 'Hospital Samaritano',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop',
    distance: '4.2 km',
    address: 'R. Portugal, 400',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  },
  {
    id: '4',
    name: 'McDonald\'s',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    distance: '1.8 km',
    address: 'Av. José Paulino, 2200',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  },
  {
    id: '5',
    name: 'Colégio Objetivo',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    distance: '1.5 km',
    address: 'R. Santa Cruz, 120',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  },
  {
    id: '6',
    name: 'Supermercado Pague Menos',
    category: 'Service',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop',
    distance: '1.0 km',
    address: 'Av. José Paulino, 3200',
    googleMapsLink: 'https://goo.gl/maps/xyz'
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Romanos Estética Automotiva',
    category: 'Lava Rápido',
    phone: '19994144143'
  },
  {
    id: '2',
    name: 'Vetrocamp',
    category: 'Vidros',
    phone: '19982094884'
  },
  {
    id: '3',
    name: 'Carla Queijos',
    category: 'Alimentação',
    phone: '19996205898'
  },
  {
    id: '4',
    name: 'Mineiro Queijos',
    category: 'Alimentação',
    phone: '19992719111'
  },
  {
    id: '5',
    name: 'Empório Boiatti',
    category: 'Empório',
    phone: '19994068041'
  },
  {
    id: '6',
    name: 'DSW Construtora',
    category: 'Reforma',
    phone: '19988347481'
  },
  {
    id: '7',
    name: 'Delícias da Didi',
    category: 'Restaurante',
    phone: '19999707474'
  },
  {
    id: '8',
    name: 'Adenilton Ar Condicionado',
    category: 'Ar Condicionado',
    phone: '19993027253'
  },
  {
    id: '9',
    name: 'Marcelo Ar Condicionado',
    category: 'Ar Condicionado',
    phone: '19987386582'
  }
];

export const SCHEDULES: Schedule[] = [
  {
    id: 'pool',
    area: 'Piscina',
    openTime: '07:00',
    closeTime: '22:00',
    days: 'Terça a Domingo',
    maintenance: 'Segunda-feira',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/piscinas.jpeg',
    description: 'Área de lazer aquático para relaxamento e diversão da família.',
    specificRules: [
      'Uso exclusivo para moradores e até 2 visitantes por unidade.',
      'É obrigatório o banho de ducha antes de entrar na água.',
      'Proibido o uso de vidros (garrafas, copos) na área do deck.',
      'Não é permitido consumir alimentos na borda ou dentro da piscina.',
      'Crianças menores de 10 anos devem estar acompanhadas.',
      'Proibido o uso de óleos bronzeadores que sujem a água.'
    ]
  },
  {
    id: 'court',
    area: 'Quadra Poliesportiva',
    openTime: '08:00',
    closeTime: '22:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/quadra-poliesportiva.jpeg',
    description: 'Espaço para prática de esportes coletivos e atividades físicas.',
    specificRules: [
      'Uso obrigatório de tênis adequado para prática esportiva.',
      'Respeitar o horário de agendamento (máximo 1h se houver fila).',
      'Proibido andar de skate, patins ou bicicleta na quadra.',
      'Não é permitido pendurar-se nos aros de basquete ou traves.',
      'Manter o silêncio após às 21h.'
    ]
  },
  {
    id: 'party_hall',
    area: 'Salão de Festas',
    openTime: '10:00',
    closeTime: '23:59',
    days: 'Mediante Reserva',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/sala-eventos.jpeg',
    description: 'Ambiente amplo e equipado para suas celebrações.',
    specificRules: [
      'Reserva obrigatória mediante pagamento de taxa pelo app da Lello.',
      'Lista de convidados deve ser entregue na portaria com 24h de antecedência.',
      'O morador anfitrião é responsável por qualquer dano ao patrimônio.',
      'O som deve ser desligado ou reduzido drasticamente após as 22h.',
      'A limpeza grossa deve ser feita após o evento.'
    ]
  },
  {
    id: 'gym',
    area: 'Academia',
    openTime: '06:00',
    closeTime: '23:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/uploads/2025/10/Academia-ST-1.jpg',
    description: 'Espaço fitness completo para seus treinos diários.',
    specificRules: [
      'Uso obrigatório de toalha individual durante os exercícios.',
      'Higienizar os equipamentos com álcool logo após o uso.',
      'Guardar pesos e colchonetes nos lugares corretos.',
      'Crianças só podem permanecer se acompanhadas pelos responsáveis.',
      'Proibido treinar sem camisa ou com trajes inadequados.'
    ]
  },
  {
    id: 'bbq',
    area: 'Churrasqueira',
    openTime: '10:00',
    closeTime: '22:00',
    days: 'Terça a Domingo',
    image: 'https://www.campinasnaplanta.com.br/wp-content/uploads/eco-vila-santa-margarida-espaco-churrasqueira.jpg',
    description: 'Área externa equipada para churrascos e confraternizações.',
    specificRules: [
      'Reserva e pagamento de taxa devem ser feitos pelo app da Lello.',
      'Limite de 20 convidados por reserva.',
      'A limpeza da grelha é responsabilidade do morador.',
      'Proibido som automotivo ou caixas de som de alta potência.',
      'Entregar a área limpa e sem lixo acumulado.'
    ]
  },
  {
    id: 'gourmet',
    area: 'Área Gourmet',
    openTime: '10:00',
    closeTime: '23:00',
    days: 'Mediante Reserva',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/area-gourmet.jpeg',
    description: 'Espaço sofisticado para jantares e pequenas recepções.',
    specificRules: [
      'Agendamento mediante pagamento de taxa no app da Lello.',
      'Capacidade máxima de 15 pessoas.',
      'Conferir checklist de utensílios na entrada e saída.',
      'Todo o lixo deve ser retirado e levado às lixeiras.',
      'Danos a eletrodomésticos serão cobrados.'
    ]
  },
  {
    id: 'playroom',
    area: 'Brinquedoteca',
    openTime: '08:00',
    closeTime: '22:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/uploads/2025/10/Briquedoteca-ST-1.jpg',
    description: 'Espaço lúdico e seguro dedicado para a diversão das crianças.',
    specificRules: [
      'Crianças menores de 8 anos devem estar acompanhadas por um responsável.',
      'Retirar os sapatos antes de entrar no tatame ou brinquedos.',
      'É proibido consumir alimentos ou bebidas dentro do espaço.',
      'Os brinquedos devem ser organizados após o uso.',
      'Não é permitida a entrada de animais.'
    ]
  },
  {
    id: 'zen',
    area: 'Espaço Zen',
    openTime: '06:00',
    closeTime: '22:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/hidro.jpeg',
    description: 'Ambiente tranquilo com hidromassagem e área de descanso.',
    specificRules: [
      'Reserva obrigatória com pagamento de taxa pelo app da Lello.',
      'Lei do Silêncio Absoluto.',
      'Proibido consumir alimentos na área da hidro.',
      'Banho de ducha obrigatório antes do uso.',
      'Não é permitida a entrada de animais.'
    ]
  },
  {
    id: 'cinema',
    area: 'Cinema',
    openTime: '09:00',
    closeTime: '23:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/sala-descanso.jpeg',
    description: 'Sala climatizada com projetor 4K e som surround.',
    specificRules: [
      'Reserva gratuita e obrigatória pelo aplicativo da Lello.',
      'Proibido entrar com trajes de banho ou roupas molhadas.',
      'Não é permitido apoiar os pés nas poltronas.',
      'Recolher todo o lixo (pipoca, embalagens) ao sair.',
      'Desligar todos os equipamentos e ar-condicionado após o uso.'
    ]
  },
  {
    id: 'coworking',
    area: 'Coworking',
    openTime: '07:00',
    closeTime: '22:00',
    days: 'Todos os dias',
    image: 'https://ecovilasantamargarida.com.br/wp-content/themes/santamargarida/img/areas_lazer/espaco-social.jpeg',
    description: 'Estações de trabalho e sala de reuniões.',
    specificRules: [
      'Uso obrigatório de fones de ouvido para chamadas e áudios.',
      'Manter o tom de voz baixo para não atrapalhar os vizinhos.',
      'Não deixar pertences pessoais nas mesas após o uso.',
      'Proibido fazer refeições completas nas estações de trabalho.',
      'Wi-Fi exclusivo para uso profissional/estudo.'
    ]
  }
];

export const RULES: RuleCategory[] = [
  {
    id: 'noise',
    title: 'Convivência e Silêncio',
    iconName: 'Volume2',
    allowed: [
      { id: 'n1', text: 'Ruídos moderados durante o dia, respeitando o sossego alheio.' }
    ],
    prohibited: [
      { id: 'n2', text: 'Barulho entre 22h e 07h (Horário de Silêncio Absoluto).' },
      { id: 'n3', text: 'Usar halls e escadas para brincadeiras, reuniões ou guardar objetos.' }
    ]
  },
  {
    id: 'works',
    title: 'Mudanças e Obras',
    iconName: 'Hammer',
    allowed: [
      { id: 'w1', text: 'Obras de Segunda a Sexta (08h às 17h) e Sábados (08h às 12h).' },
      { id: 'w2', text: 'Entrada de materiais pelo elevador de serviço (devidamente forrado).' },
      { id: 'w3', text: 'Reformas estruturais mediante entrega de ART ao síndico.' }
    ],
    prohibited: [
      { id: 'w4', text: 'Obras, furos ou marteladas aos domingos e feriados.' }
    ]
  },
  {
    id: 'leisure',
    title: 'Áreas Comuns e Lazer',
    iconName: 'Trees',
    allowed: [
      { id: 'l1', text: 'Uso da piscina das 07h às 22h (Ducha obrigatória antes de entrar).' },
      { id: 'l2', text: 'Salão de Festas com reserva e lista de convidados (12h antecedência).' },
      { id: 'l3', text: 'Academia: Uso de toalha individual e limpeza dos equipamentos após uso.' }
    ],
    prohibited: [
      { id: 'l4', text: 'Vidros (copos/garrafas) ou alimentos na borda da piscina.' },
      { id: 'l5', text: 'Crianças desacompanhadas na academia.' }
    ]
  },
  {
    id: 'parking',
    title: 'Estacionamento',
    iconName: 'Car',
    allowed: [
      { id: 'p1', text: 'Velocidade máxima de 10 km/h.' },
      { id: 'p2', text: 'Motos com motor desligado ou em baixa rotação.' },
      { id: 'p3', text: 'Uso exclusivo da vaga vinculada à sua unidade.' }
    ],
    prohibited: [
      { id: 'p4', text: 'Usar a vaga como depósito (móveis, pneus, entulho).' }
    ]
  },
  {
    id: 'trash',
    title: 'Lixo e Higiene',
    iconName: 'Trash2',
    allowed: [
      { id: 't1', text: 'Separar lixo reciclável do orgânico.' },
      { id: 't2', text: 'Lixo bem ensacado para evitar odores e vazamentos.' },
      { id: 't3', text: 'Vidros quebrados embalados em papelão ou garrafa PET.' }
    ],
    prohibited: [
      { id: 't4', text: 'Deixar lixo na porta do apartamento ou corredores.' }
    ]
  },
  {
    id: 'security',
    title: 'Segurança e Acesso',
    iconName: 'Shield',
    allowed: [
      { id: 's1', text: 'Identificação obrigatória de visitantes na portaria.' },
      { id: 's2', text: 'Morador deve descer para retirar entregas (delivery).' }
    ],
    prohibited: [
      { id: 's3', text: 'Entregadores subirem até o apartamento.' },
      { id: 's4', text: 'Crianças menores de 10 anos sozinhas nos elevadores ou áreas de risco.' }
    ]
  },
  {
    id: 'pets',
    title: 'Animais de Estimação',
    iconName: 'Dog',
    allowed: [
      { id: 'pt1', text: 'Circulação sempre com guia/coleira.' },
      { id: 'pt2', text: 'Uso preferencial do elevador de serviço.' },
      { id: 'pt3', text: 'Recolher imediatamente os dejetos.' }
    ],
    prohibited: [
      { id: 'pt4', text: 'Animais soltos nas áreas comuns.' }
    ]
  }
];