
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plan, supabasePlanToPlan, planToSupabasePlan } from "@/types/plans";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPlans(data.map(supabasePlanToPlan));
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPlan = async (newPlan: Omit<Plan, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .insert([planToSupabasePlan(newPlan as Plan)])
        .select()
        .single();

      if (error) throw error;

      const transformedPlan = supabasePlanToPlan(data);
      setPlans([transformedPlan, ...plans]);
      toast({
        title: "Sucesso",
        description: "Plano adicionado com sucesso!",
      });
      return transformedPlan;
    } catch (error) {
      console.error("Error adding plan:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o plano.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePlan = async (updatedPlan: Plan) => {
    try {
      const { error } = await supabase
        .from("plans")
        .update(planToSupabasePlan(updatedPlan))
        .eq("id", updatedPlan.id);

      if (error) throw error;

      setPlans(plans.map(plan => 
        plan.id === updatedPlan.id ? updatedPlan : plan
      ));
      
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
      throw error;
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from("plans")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setPlans(plans.filter(plan => plan.id !== id));
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
      throw error;
    }
  };

  return {
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    isLoading
  };
};
