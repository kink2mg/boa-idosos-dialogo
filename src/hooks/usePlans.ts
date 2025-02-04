
import { useState } from "react";
import { Plan } from "@/types/plans";
import { useToast } from "@/components/ui/use-toast";

export const usePlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = () => {
    try {
      const storedPlans = localStorage.getItem('plans');
      if (storedPlans) {
        const parsedPlans = JSON.parse(storedPlans);
        setPlans(parsedPlans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPlan = () => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      title: "Novo Plano",
      category: "Internet",
      price: 99.90,
      mega: 100,
      features: [
        { text: "Wi-Fi Grátis" },
        { text: "Instalação Grátis" },
        { text: "Suporte 24h" }
      ],
      is_popular: false,
      sales_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      const updatedPlans = [newPlan, ...plans];
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      setSelectedPlan(newPlan);
      toast({
        title: "Sucesso",
        description: "Plano criado com sucesso!",
      });
    } catch (error) {
      console.error("Error adding plan:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o plano.",
        variant: "destructive",
      });
    }
  };

  const updatePlan = async (updatedPlan: Plan) => {
    try {
      const updatedPlans = plans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      toast({
        title: "Sucesso",
        description: "Plano atualizado com sucesso!",
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o plano.",
        variant: "destructive",
      });
    }
  };

  const deletePlan = async (planId: string) => {
    try {
      const updatedPlans = plans.filter(p => p.id !== planId);
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      if (selectedPlan?.id === planId) {
        setSelectedPlan(null);
      }
      toast({
        title: "Sucesso",
        description: "Plano removido com sucesso!",
      });
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o plano.",
        variant: "destructive",
      });
    }
  };

  return {
    plans,
    loading,
    selectedPlan,
    setSelectedPlan,
    fetchPlans,
    addPlan,
    updatePlan,
    deletePlan,
  };
};
