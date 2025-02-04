
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Accessory {
  id: string;
  nome: string;
  preco: number;
  preco_antigo?: number;
  descricao: string;
  imagem: string;
  video_url?: string;
  categoria: string;
  em_promocao: boolean;
  quantidade_vendas: number;
  created_at: string;
  updated_at: string;
}

export const useAccessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const { data, error } = await supabase
        .from("accessories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAccessories(data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os acessórios.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAccessory = async (newAccessory: Omit<Accessory, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("accessories")
        .insert([newAccessory])
        .select()
        .single();

      if (error) throw error;

      setAccessories([data, ...accessories]);
      toast({
        title: "Sucesso",
        description: "Acessório adicionado com sucesso!",
      });
      return data;
    } catch (error) {
      console.error("Error adding accessory:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o acessório.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAccessory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("accessories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAccessories(accessories.filter(acc => acc.id !== id));
      toast({
        title: "Sucesso",
        description: "Acessório removido com sucesso!",
      });
    } catch (error) {
      console.error("Error deleting accessory:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o acessório.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAccessory = async (updatedAccessory: Accessory) => {
    try {
      const { error } = await supabase
        .from("accessories")
        .update({
          nome: updatedAccessory.nome,
          preco: updatedAccessory.preco,
          preco_antigo: updatedAccessory.preco_antigo,
          descricao: updatedAccessory.descricao,
          imagem: updatedAccessory.imagem,
          video_url: updatedAccessory.video_url,
          categoria: updatedAccessory.categoria,
          em_promocao: updatedAccessory.em_promocao,
          quantidade_vendas: updatedAccessory.quantidade_vendas
        })
        .eq("id", updatedAccessory.id);

      if (error) throw error;

      setAccessories(accessories.map(acc => 
        acc.id === updatedAccessory.id ? updatedAccessory : acc
      ));
      
      toast({
        title: "Sucesso",
        description: "Acessório atualizado com sucesso!",
      });
    } catch (error) {
      console.error("Error updating accessory:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o acessório.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    accessories,
    addAccessory,
    updateAccessory,
    deleteAccessory,
    isLoading
  };
};
