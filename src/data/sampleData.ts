export const samplePlans = [
  {
    title: "Plano Básico",
    category: "Residencial",
    price: 89.90,
    mega: 100,
    features: [
      { text: "Download 100 Mbps" },
      { text: "Upload 50 Mbps" },
      { text: "Wi-Fi Grátis" },
      { text: "Suporte 24/7" }
    ],
    is_popular: false,
    sales_count: 150
  },
  {
    title: "Plano Premium",
    category: "Residencial",
    price: 129.90,
    mega: 200,
    features: [
      { text: "Download 200 Mbps" },
      { text: "Upload 100 Mbps" },
      { text: "Wi-Fi Grátis" },
      { text: "Suporte 24/7" },
      { text: "IP Fixo" }
    ],
    is_popular: true,
    sales_count: 300
  }
];

export const sampleAccessories = [
  {
    nome: "Roteador Wi-Fi 6",
    preco: 299.90,
    preco_antigo: 399.90,
    descricao: "Roteador de última geração com suporte a Wi-Fi 6",
    imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    categoria: "Roteadores",
    em_promocao: true,
    quantidade_vendas: 50
  },
  {
    nome: "Repetidor Wi-Fi",
    preco: 149.90,
    descricao: "Amplie o alcance do seu Wi-Fi",
    imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    categoria: "Repetidores",
    em_promocao: false,
    quantidade_vendas: 30
  },
  {
    nome: "Cabo de Rede 10m",
    preco: 29.90,
    preco_antigo: 39.90,
    descricao: "Cabo de rede Cat6 de alta qualidade",
    imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    categoria: "Cabos",
    em_promocao: true,
    quantidade_vendas: 100
  }
];

export const sampleNews = [
  {
    title: "Nova tecnologia 5G chega à cidade",
    content: "A mais recente tecnologia de internet móvel está chegando...",
    category: "Tecnologia",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    created_at: new Date().toISOString()
  },
  {
    title: "Expansão da rede de fibra óptica",
    content: "Nossa empresa está expandindo a rede de fibra óptica...",
    category: "Infraestrutura",
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    created_at: new Date().toISOString()
  }
];