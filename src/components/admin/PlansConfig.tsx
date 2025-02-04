import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plan, SupabasePlan, supabasePlanToPlan, planToSupabasePlan } from "@/types/plans";

const PlansConfig = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [newFeature, setNewFeature] = useState("");

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

      if (data) {
        const formattedPlans = data.map((plan: SupabasePlan) => supabasePlanToPlan(plan));
        setPlans(formattedPlans);
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

  const handleAddPlan = async () => {
    const newPlan: Omit<Plan, 'id' | 'created_at' | 'updated_at'> = {
      title: "Novo Plano",
      category: "",
      price: 0,
      mega: 0,
      features: [],
      is_popular: false,
      sales_count: 0,
    };

    try {
      const { data, error } = await supabase
        .from("plans")
        .insert([planToSupabasePlan(newPlan as Plan)])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const formattedPlan = supabasePlanToPlan(data);
        setPlans([formattedPlan, ...plans]);
        setSelectedPlan(formattedPlan);
        toast({
          title: "Sucesso",
          description: "Plano criado com sucesso!",
        });
      }
    } catch (error) {
      console.error("Error adding plan:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o plano.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePlan = async (updatedPlan: Plan) => {
    try {
      const { error } = await supabase
        .from("plans")
        .update(planToSupabasePlan(updatedPlan))
        .eq("id", updatedPlan.id);

      if (error) throw error;

      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
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

  const handleDeletePlan = async (planId: string) => {
    try {
      const { error } = await supabase
        .from("plans")
        .delete()
        .eq("id", planId);

      if (error) throw error;

      setPlans(plans.filter(p => p.id !== planId));
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

  if (loading) {
    return <div>Carregando planos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Planos</h3>
        <Button onClick={handleAddPlan}>Adicionar Plano</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-4 cursor-pointer ${
                selectedPlan?.id === plan.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{plan.title}</h4>
                  <p className="text-sm text-gray-500">{plan.category}</p>
                  <p className="text-sm mt-1">
                    {plan.mega} Mega - R$ {plan.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlan(plan.id);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Plano</Label>
                <Input
                  id="title"
                  value={selectedPlan.title}
                  onChange={(e) => setSelectedPlan({
                    ...selectedPlan,
                    title: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={selectedPlan.category}
                  onChange={(e) => setSelectedPlan({
                    ...selectedPlan,
                    category: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="mega">Mega</Label>
                <Input
                  id="mega"
                  type="number"
                  value={selectedPlan.mega}
                  onChange={(e) => setSelectedPlan({
                    ...selectedPlan,
                    mega: parseInt(e.target.value)
                  })}
                />
              </div>

              <div>
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={selectedPlan.price}
                  onChange={(e) => setSelectedPlan({
                    ...selectedPlan,
                    price: parseFloat(e.target.value)
                  })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPopular"
                  checked={selectedPlan.is_popular}
                  onCheckedChange={(checked) => setSelectedPlan({
                    ...selectedPlan,
                    is_popular: checked
                  })}
                />
                <Label htmlFor="isPopular">Plano Popular</Label>
              </div>

              <Button 
                className="w-full"
                onClick={() => handleUpdatePlan(selectedPlan)}
              >
                Salvar Alterações
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlansConfig;
