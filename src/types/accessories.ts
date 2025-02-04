export interface Accessory {
  id: string;
  nome: string;
  preco: number;
  preco_antigo?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  em_promocao: boolean;
  quantidade_vendas: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseAccessory {
  id: string;
  nome: string;
  preco: number;
  preco_antigo?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  em_promocao: boolean;
  quantidade_vendas: number;
  created_at?: string;
  updated_at?: string;
}

export const supabaseAccessoryToAccessory = (accessory: SupabaseAccessory): Accessory => ({
  ...accessory
});

export const accessoryToSupabaseAccessory = (
  accessory: Accessory
): Omit<SupabaseAccessory, 'id' | 'created_at' | 'updated_at'> => ({
  nome: accessory.nome,
  preco: accessory.preco,
  preco_antigo: accessory.preco_antigo,
  descricao: accessory.descricao,
  imagem: accessory.imagem,
  categoria: accessory.categoria,
  em_promocao: accessory.em_promocao,
  quantidade_vendas: accessory.quantidade_vendas
});