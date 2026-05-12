export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pt-BR", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];
export const DEFAULT_LANG: Lang = "en";

type TourKey = "rio-express" | "tailor-made" | "rio-nature" | "helicopter" | "carnaval" | "boat";

export type Dictionary = {
  nav: { about: string; tours: string; why: string; reviews: string; faq: string; cta: string };
  languageSwitcher: { label: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    role: string;
    stats: { years: string; languages: string; travelers: string; rating: string };
  };
  tours: {
    eyebrow: string;
    title: string;
    intro: string;
    inquire: string;
    inquireMessage: (title: string) => string;
    highlights: { mostLoved: string; premium: string };
    items: Record<
      TourKey,
      { title: string; location: string; duration: string; description: string }
    >;
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ReadonlyArray<{ title: string; text: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<{ quote: string; trip: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ReadonlyArray<{ q: string; a: string }>;
  };
  cta: { eyebrow: string; title: string; intro: string; button: string; footnote: string };
  footer: {
    tagline: string;
    explore: string;
    contact: string;
    languagesLabel: string;
    rights: string;
    crafted: string;
  };
  whatsappAria: string;
};

export const translations: Record<Lang, Dictionary> = {
  en: {
    nav: {
      about: "About",
      tours: "Tours",
      why: "Why Lotus",
      reviews: "Reviews",
      faq: "FAQ",
      cta: "Plan your tour",
    },
    languageSwitcher: { label: "Select language" },
    hero: {
      eyebrow: "Rio de Janeiro · Brazil",
      titleLine1: "Rio, slowly.",
      titleLine2: "Privately. Beautifully.",
      description:
        "A bespoke private guiding service by Patricia Cannabrava. Ten years designing intimate, unhurried days in the marvelous city — for travelers who want to truly feel it.",
      ctaPrimary: "Start planning on WhatsApp",
      ctaSecondary: "Explore experiences",
      scroll: "SCROLL",
    },
    about: {
      eyebrow: "About the guide",
      title: "A carioca who turned love for her city into a craft.",
      p1: "I'm Patricia Cannabrava — born and raised in Rio. In 2015 I founded Lotus Rio Tour to do one thing exceptionally well: design private days that feel personal, safe and beautifully unhurried.",
      p2: "From the first message until you're back at the airport or cruise port, every detail is taken care of — restaurants, attractions, tickets, transportation. You travel light. I take care of the rest.",
      role: "Founder · Private Guide",
      stats: {
        years: "Years guiding",
        languages: "Languages",
        travelers: "Happy travelers",
        rating: "Average rating",
      },
    },
    tours: {
      eyebrow: "Curated experiences",
      title: "Six ways to fall in love with Rio.",
      intro:
        "Each experience is private, fully guided and tailored to your pace — from iconic landmarks to quiet local corners.",
      inquire: "Inquire about this tour",
      inquireMessage: (title: string) =>
        `Hi Patricia, I'd like to know more about the ${title} tour.`,
      highlights: { mostLoved: "Most loved", premium: "Premium" },
      items: {
        "rio-express": {
          title: "Rio Express",
          location: "Christ the Redeemer & Sugarloaf",
          duration: "Up to 8 hours",
          description:
            "The essential Rio in a single, perfectly paced day — Christ the Redeemer, Sugarloaf, Selarón Steps and the iconic beaches.",
        },
        "tailor-made": {
          title: "Tailor-Made Tour",
          location: "Designed around you",
          duration: "Custom",
          description:
            "An itinerary crafted entirely around your interests, pace and time in the city — from hidden viewpoints to private dining.",
        },
        "rio-nature": {
          title: "Rio by Nature",
          location: "Tijuca Forest & Botanical Garden",
          duration: "6–8 hours",
          description:
            "Step into the world's largest urban rainforest, with waterfalls, panoramic trails and the lush Botanical Garden.",
        },
        helicopter: {
          title: "Helicopter Experience",
          location: "Aerial Rio",
          duration: "15–60 min flights",
          description:
            "See Christ, Sugarloaf, Copacabana and Ipanema from above on a private flight — the most cinematic view of the city.",
        },
        carnaval: {
          title: "Carnaval Experience",
          location: "Sambódromo & street parties",
          duration: "Custom",
          description:
            "Live the world's greatest celebration with VIP access, behind-the-scenes visits and trusted local guidance.",
        },
        boat: {
          title: "Private Boat Tour",
          location: "Guanabara Bay",
          duration: "4–6 hours",
          description:
            "Sail past Sugarloaf, hidden islands and Niterói skyline aboard a private boat with full hospitality on board.",
        },
      },
    },
    why: {
      eyebrow: "Why Lotus",
      title: "The difference is in the details.",
      intro:
        "Six commitments that shape every Lotus experience — from the first message to the last hug at the airport.",
      items: [
        {
          title: "Safety first",
          text: "Trusted routes, vetted vendors and a guide who knows the city deeply — so you can relax into every moment.",
        },
        {
          title: "Tailor-made days",
          text: "No two tours alike. Every itinerary is built around your interests, energy and travel style.",
        },
        {
          title: "Three languages",
          text: "Fluent guiding in English, Spanish and Portuguese — natural conversation, never a script.",
        },
        {
          title: "Comfort end-to-end",
          text: "Hotel pickup in Barra da Tijuca, air-conditioned vehicles, and seamless logistics from the first hello.",
        },
        {
          title: "Truly private",
          text: "Always just your group — couples, families and small parties up to 4, with vans and buses on request.",
        },
        {
          title: "Local at heart",
          text: "Beyond landmarks: the cafés, viewpoints and stories that make Rio feel like yours by the end of the day.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Travelers' words",
      title: "Stories that travel home with you.",
      items: [
        {
          quote:
            "Patricia made Rio feel like home. Every detail was anticipated, every story unforgettable. The most thoughtful guide we've ever had.",
          trip: "Rio Express",
        },
        {
          quote:
            "Spoke perfect Spanish, knew every corner of the city, and turned a 3-day stop into the highlight of our entire South America trip.",
          trip: "Tailor-Made Tour",
        },
        {
          quote:
            "Safe, elegant, and incredibly attentive with our kids. The helicopter at sunset is something we'll talk about forever.",
          trip: "Helicopter & Boat",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Everything you might wonder.",
      intro:
        "Don't see your question? Send a message — Patricia personally replies to every traveler.",
      items: [
        {
          q: "Where do you pick us up?",
          a: "We offer complimentary pickup at hotels in Barra da Tijuca. For other neighborhoods, transportation can be arranged on request.",
        },
        {
          q: "Which languages do you speak?",
          a: "Patricia is fluent in Portuguese, English and Spanish — guiding international guests for over a decade.",
        },
        {
          q: "How many people fit in a tour?",
          a: "Private tours run in a comfortable air-conditioned car for up to 4 guests. For larger groups, we operate vans (up to 19) and buses (up to 46).",
        },
        {
          q: "How long is a typical tour?",
          a: "Most full-day private tours last up to 10 hours. Half-day, sunset and custom durations are also available.",
        },
        {
          q: "Can the itinerary be customized?",
          a: "Absolutely. Every Lotus tour is private and adaptable — from Christ the Redeemer to gastronomy, art, nature or hidden local spots.",
        },
        {
          q: "How do we book?",
          a: "Send a message via WhatsApp or the contact form. Patricia personally replies and helps design your perfect Rio experience.",
        },
      ],
    },
    cta: {
      eyebrow: "Let's design your day",
      title: "Your private Rio begins with a single message.",
      intro:
        "Tell Patricia your travel dates and what you'd love to see. She'll craft a thoughtful proposal — usually within a few hours.",
      button: "Chat on WhatsApp",
      footnote: "Replies in English · Português · Español",
    },
    footer: {
      tagline:
        "Private tours in Rio de Janeiro by Patricia Cannabrava. Designed with care, guided with heart, since 2015.",
      explore: "Explore",
      contact: "Contact",
      languagesLabel: "Languages",
      rights: "All rights reserved.",
      crafted: "Crafted in Rio de Janeiro · Brasil",
    },
    whatsappAria: "Chat on WhatsApp",
  },

  "pt-BR": {
    nav: {
      about: "Sobre",
      tours: "Tours",
      why: "Por que Lotus",
      reviews: "Depoimentos",
      faq: "FAQ",
      cta: "Planejar seu tour",
    },
    languageSwitcher: { label: "Selecionar idioma" },
    hero: {
      eyebrow: "Rio de Janeiro · Brasil",
      titleLine1: "Rio, sem pressa.",
      titleLine2: "Privativo. Sob medida.",
      description:
        "Um serviço de guia privativo by Patricia Cannabrava. Dez anos desenhando dias íntimos e tranquilos na cidade maravilhosa — para viajantes que querem realmente senti-la.",
      ctaPrimary: "Planejar pelo WhatsApp",
      ctaSecondary: "Conhecer experiências",
      scroll: "ROLE",
    },
    about: {
      eyebrow: "Sobre a guia",
      title: "Uma carioca que transformou amor pela cidade em ofício.",
      p1: "Sou Patricia Cannabrava — nascida e criada no Rio. Em 2015 fundei a Lotus Rio Tour com um único objetivo: criar dias privativos que sejam pessoais, seguros e lindamente sem pressa.",
      p2: "Da primeira mensagem até o retorno ao aeroporto ou porto, cada detalhe é cuidado — restaurantes, atrações, ingressos, transporte. Você viaja leve. Eu cuido do resto.",
      role: "Fundadora · Guia Privativa",
      stats: {
        years: "Anos guiando",
        languages: "Idiomas",
        travelers: "Viajantes felizes",
        rating: "Avaliação média",
      },
    },
    tours: {
      eyebrow: "Experiências selecionadas",
      title: "Seis maneiras de se apaixonar pelo Rio.",
      intro:
        "Cada experiência é privativa, totalmente guiada e adaptada ao seu ritmo — dos cartões-postais aos cantos locais mais discretos.",
      inquire: "Saber mais sobre este tour",
      inquireMessage: (title: string) =>
        `Olá Patricia, gostaria de saber mais sobre o tour ${title}.`,
      highlights: { mostLoved: "Mais amado", premium: "Premium" },
      items: {
        "rio-express": {
          title: "Rio Express",
          location: "Cristo Redentor & Pão de Açúcar",
          duration: "Até 8 horas",
          description:
            "O essencial do Rio em um único dia perfeitamente ritmado — Cristo Redentor, Pão de Açúcar, Escadaria Selarón e as praias icônicas.",
        },
        "tailor-made": {
          title: "Tour Sob Medida",
          location: "Pensado para você",
          duration: "Personalizado",
          description:
            "Um roteiro feito inteiramente em torno dos seus interesses, ritmo e tempo na cidade — de mirantes secretos a jantares privativos.",
        },
        "rio-nature": {
          title: "Rio Natureza",
          location: "Floresta da Tijuca & Jardim Botânico",
          duration: "6–8 horas",
          description:
            "Entre na maior floresta urbana do mundo, com cachoeiras, trilhas panorâmicas e o exuberante Jardim Botânico.",
        },
        helicopter: {
          title: "Experiência de Helicóptero",
          location: "Rio aéreo",
          duration: "Voos de 15–60 min",
          description:
            "Veja o Cristo, Pão de Açúcar, Copacabana e Ipanema do alto em um voo privativo — a vista mais cinematográfica da cidade.",
        },
        carnaval: {
          title: "Experiência Carnaval",
          location: "Sambódromo & blocos de rua",
          duration: "Personalizado",
          description:
            "Viva a maior festa do mundo com acesso VIP, visitas aos bastidores e orientação local de confiança.",
        },
        boat: {
          title: "Passeio Privativo de Barco",
          location: "Baía de Guanabara",
          duration: "4–6 horas",
          description:
            "Navegue ao redor do Pão de Açúcar, ilhas escondidas e a orla de Niterói em um barco privativo com hospitalidade completa a bordo.",
        },
      },
    },
    why: {
      eyebrow: "Por que Lotus",
      title: "A diferença está nos detalhes.",
      intro:
        "Seis compromissos que moldam toda experiência Lotus — da primeira mensagem ao último abraço no aeroporto.",
      items: [
        {
          title: "Segurança em primeiro lugar",
          text: "Rotas confiáveis, fornecedores criteriosos e uma guia que conhece a cidade profundamente — para você relaxar em cada momento.",
        },
        {
          title: "Dias sob medida",
          text: "Nenhum tour igual ao outro. Cada roteiro é construído em torno dos seus interesses, energia e estilo de viagem.",
        },
        {
          title: "Três idiomas",
          text: "Guia fluente em inglês, espanhol e português — conversa natural, nunca um roteiro decorado.",
        },
        {
          title: "Conforto do início ao fim",
          text: "Pickup em hotéis na Barra da Tijuca, veículos com ar-condicionado e logística impecável desde o primeiro contato.",
        },
        {
          title: "Verdadeiramente privativo",
          text: "Sempre só o seu grupo — casais, famílias e grupos pequenos de até 4, com vans e ônibus sob demanda.",
        },
        {
          title: "Local de coração",
          text: "Além dos cartões-postais: os cafés, mirantes e histórias que fazem o Rio parecer seu ao fim do dia.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Palavras dos viajantes",
      title: "Histórias que viajam de volta com você.",
      items: [
        {
          quote:
            "Patricia fez o Rio parecer casa. Cada detalhe foi antecipado, cada história inesquecível. A guia mais cuidadosa que já tivemos.",
          trip: "Rio Express",
        },
        {
          quote:
            "Falou espanhol perfeito, conhecia cada canto da cidade e transformou uma parada de 3 dias no destaque de toda a nossa viagem pela América do Sul.",
          trip: "Tour Sob Medida",
        },
        {
          quote:
            "Segura, elegante e incrivelmente atenciosa com nossas crianças. O helicóptero ao pôr do sol é algo que vamos lembrar para sempre.",
          trip: "Helicóptero & Barco",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Tudo que você pode se perguntar.",
      intro:
        "Não viu sua dúvida? Mande uma mensagem — a Patricia responde pessoalmente cada viajante.",
      items: [
        {
          q: "Onde vocês buscam a gente?",
          a: "Oferecemos pickup gratuito em hotéis na Barra da Tijuca. Para outros bairros, transporte pode ser organizado sob demanda.",
        },
        {
          q: "Quais idiomas vocês falam?",
          a: "Patricia é fluente em português, inglês e espanhol — guiando viajantes internacionais há mais de uma década.",
        },
        {
          q: "Quantas pessoas cabem em um tour?",
          a: "Tours privativos rodam em um carro confortável com ar-condicionado para até 4 hóspedes. Para grupos maiores, operamos vans (até 19) e ônibus (até 46).",
        },
        {
          q: "Quanto dura um tour típico?",
          a: "A maioria dos tours privativos de dia inteiro dura até 10 horas. Meio-dia, pôr do sol e durações personalizadas também estão disponíveis.",
        },
        {
          q: "O roteiro pode ser customizado?",
          a: "Com certeza. Todo tour Lotus é privativo e adaptável — do Cristo Redentor à gastronomia, arte, natureza ou cantinhos locais escondidos.",
        },
        {
          q: "Como reservamos?",
          a: "Envie uma mensagem pelo WhatsApp ou pelo formulário de contato. Patricia responde pessoalmente e ajuda a desenhar a sua experiência perfeita no Rio.",
        },
      ],
    },
    cta: {
      eyebrow: "Vamos desenhar seu dia",
      title: "Seu Rio privativo começa com uma única mensagem.",
      intro:
        "Conte à Patricia suas datas de viagem e o que adoraria conhecer. Ela criará uma proposta cuidadosa — geralmente em poucas horas.",
      button: "Falar no WhatsApp",
      footnote: "Atendimento em English · Português · Español",
    },
    footer: {
      tagline:
        "Tours privativos no Rio de Janeiro by Patricia Cannabrava. Desenhados com cuidado, guiados com coração, desde 2015.",
      explore: "Explorar",
      contact: "Contato",
      languagesLabel: "Idiomas",
      rights: "Todos os direitos reservados.",
      crafted: "Feito no Rio de Janeiro · Brasil",
    },
    whatsappAria: "Falar no WhatsApp",
  },

  es: {
    nav: {
      about: "Sobre",
      tours: "Tours",
      why: "Por qué Lotus",
      reviews: "Opiniones",
      faq: "FAQ",
      cta: "Planifica tu tour",
    },
    languageSwitcher: { label: "Seleccionar idioma" },
    hero: {
      eyebrow: "Río de Janeiro · Brasil",
      titleLine1: "Río, sin prisa.",
      titleLine2: "Privado. Bellamente.",
      description:
        "Un servicio de guía privada por Patricia Cannabrava. Diez años diseñando días íntimos y pausados en la ciudad maravillosa — para viajeros que quieren realmente sentirla.",
      ctaPrimary: "Planificar por WhatsApp",
      ctaSecondary: "Descubrir experiencias",
      scroll: "DESLIZA",
    },
    about: {
      eyebrow: "Sobre la guía",
      title: "Una carioca que convirtió el amor por su ciudad en oficio.",
      p1: "Soy Patricia Cannabrava — nacida y criada en Río. En 2015 fundé Lotus Rio Tour con un solo objetivo: diseñar días privados que se sientan personales, seguros y bellamente pausados.",
      p2: "Desde el primer mensaje hasta el regreso al aeropuerto o puerto, cada detalle está cuidado — restaurantes, atracciones, entradas, transporte. Tú viajas ligero. Yo me ocupo del resto.",
      role: "Fundadora · Guía Privada",
      stats: {
        years: "Años guiando",
        languages: "Idiomas",
        travelers: "Viajeros felices",
        rating: "Calificación media",
      },
    },
    tours: {
      eyebrow: "Experiencias seleccionadas",
      title: "Seis maneras de enamorarte de Río.",
      intro:
        "Cada experiencia es privada, totalmente guiada y adaptada a tu ritmo — desde íconos hasta rincones locales tranquilos.",
      inquire: "Consultar este tour",
      inquireMessage: (title: string) =>
        `Hola Patricia, me gustaría saber más sobre el tour ${title}.`,
      highlights: { mostLoved: "Más querido", premium: "Premium" },
      items: {
        "rio-express": {
          title: "Río Express",
          location: "Cristo Redentor y Pan de Azúcar",
          duration: "Hasta 8 horas",
          description:
            "El Río esencial en un único día perfectamente ritmado — Cristo Redentor, Pan de Azúcar, Escalera de Selarón y las playas icónicas.",
        },
        "tailor-made": {
          title: "Tour a Medida",
          location: "Diseñado para ti",
          duration: "Personalizado",
          description:
            "Un itinerario creado por completo en torno a tus intereses, ritmo y tiempo en la ciudad — de miradores ocultos a cenas privadas.",
        },
        "rio-nature": {
          title: "Río Naturaleza",
          location: "Bosque de Tijuca y Jardín Botánico",
          duration: "6–8 horas",
          description:
            "Adéntrate en la mayor selva urbana del mundo, con cascadas, senderos panorámicos y el exuberante Jardín Botánico.",
        },
        helicopter: {
          title: "Experiencia en Helicóptero",
          location: "Río aéreo",
          duration: "Vuelos de 15–60 min",
          description:
            "Ve el Cristo, Pan de Azúcar, Copacabana e Ipanema desde lo alto en un vuelo privado — la vista más cinematográfica de la ciudad.",
        },
        carnaval: {
          title: "Experiencia Carnaval",
          location: "Sambódromo y fiestas callejeras",
          duration: "Personalizado",
          description:
            "Vive la mayor celebración del mundo con acceso VIP, visitas tras bambalinas y guía local de confianza.",
        },
        boat: {
          title: "Tour Privado en Barco",
          location: "Bahía de Guanabara",
          duration: "4–6 horas",
          description:
            "Navega junto al Pan de Azúcar, islas escondidas y el horizonte de Niterói en un barco privado con hospitalidad completa a bordo.",
        },
      },
    },
    why: {
      eyebrow: "Por qué Lotus",
      title: "La diferencia está en los detalles.",
      intro:
        "Seis compromisos que dan forma a cada experiencia Lotus — desde el primer mensaje hasta el último abrazo en el aeropuerto.",
      items: [
        {
          title: "Seguridad ante todo",
          text: "Rutas confiables, proveedores cuidadosamente elegidos y una guía que conoce profundamente la ciudad — para que te relajes en cada momento.",
        },
        {
          title: "Días a medida",
          text: "Ningún tour es igual a otro. Cada itinerario se construye en torno a tus intereses, energía y estilo de viaje.",
        },
        {
          title: "Tres idiomas",
          text: "Guía fluida en inglés, español y portugués — conversación natural, nunca un guion.",
        },
        {
          title: "Confort de principio a fin",
          text: "Pickup en hoteles de Barra da Tijuca, vehículos con aire acondicionado y logística impecable desde el primer hola.",
        },
        {
          title: "Verdaderamente privado",
          text: "Siempre solo tu grupo — parejas, familias y grupos pequeños de hasta 4, con vans y autobuses bajo solicitud.",
        },
        {
          title: "Local de corazón",
          text: "Más allá de los íconos: los cafés, miradores e historias que hacen que Río se sienta tuyo al final del día.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Palabras de viajeros",
      title: "Historias que viajan a casa contigo.",
      items: [
        {
          quote:
            "Patricia hizo que Río se sintiera como casa. Cada detalle fue anticipado, cada historia inolvidable. La guía más atenta que hemos tenido.",
          trip: "Río Express",
        },
        {
          quote:
            "Habló un español perfecto, conocía cada rincón de la ciudad y convirtió una parada de 3 días en lo mejor de todo nuestro viaje por Sudamérica.",
          trip: "Tour a Medida",
        },
        {
          quote:
            "Segura, elegante e increíblemente atenta con nuestros niños. El helicóptero al atardecer es algo que recordaremos para siempre.",
          trip: "Helicóptero y Barco",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Todo lo que podrías preguntarte.",
      intro:
        "¿No ves tu pregunta? Envía un mensaje — Patricia responde personalmente a cada viajero.",
      items: [
        {
          q: "¿Dónde nos recogen?",
          a: "Ofrecemos pickup gratuito en hoteles de Barra da Tijuca. Para otros barrios, el transporte puede organizarse bajo solicitud.",
        },
        {
          q: "¿Qué idiomas hablan?",
          a: "Patricia es fluida en portugués, inglés y español — guiando huéspedes internacionales por más de una década.",
        },
        {
          q: "¿Cuántas personas caben en un tour?",
          a: "Los tours privados se realizan en un coche cómodo con aire acondicionado para hasta 4 huéspedes. Para grupos mayores, operamos vans (hasta 19) y autobuses (hasta 46).",
        },
        {
          q: "¿Cuánto dura un tour típico?",
          a: "La mayoría de los tours privados de día completo dura hasta 10 horas. También hay opciones de medio día, atardecer y duración personalizada.",
        },
        {
          q: "¿Se puede personalizar el itinerario?",
          a: "Por supuesto. Cada tour Lotus es privado y adaptable — desde el Cristo Redentor hasta gastronomía, arte, naturaleza o rincones locales escondidos.",
        },
        {
          q: "¿Cómo reservamos?",
          a: "Envía un mensaje por WhatsApp o por el formulario de contacto. Patricia responde personalmente y ayuda a diseñar tu experiencia perfecta en Río.",
        },
      ],
    },
    cta: {
      eyebrow: "Diseñemos tu día",
      title: "Tu Río privado comienza con un solo mensaje.",
      intro:
        "Cuéntale a Patricia tus fechas de viaje y lo que te encantaría ver. Ella creará una propuesta cuidadosa — normalmente en pocas horas.",
      button: "Hablar por WhatsApp",
      footnote: "Atención en English · Português · Español",
    },
    footer: {
      tagline:
        "Tours privados en Río de Janeiro por Patricia Cannabrava. Diseñados con cuidado, guiados con corazón, desde 2015.",
      explore: "Explorar",
      contact: "Contacto",
      languagesLabel: "Idiomas",
      rights: "Todos los derechos reservados.",
      crafted: "Hecho en Río de Janeiro · Brasil",
    },
    whatsappAria: "Hablar por WhatsApp",
  },
};
