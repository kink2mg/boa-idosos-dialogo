import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PlanForm from "../PlanForm";
import { Plan } from "@/types/plans";

export const PlansTab = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showPlanForm, setShowPlanForm] = useState(false);

  const handleAddPlan = (newPlan: Omit<Plan, "id">) => {
    const plan: Plan = {
      ...newPlan,
      id: String(plans.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_popular: newPlan.is_popular || false,
      sales_count: newPlan.sales_count || 0
    };
    setPlans([...plans, plan]);
    setShowPlanForm(false);
    toast({
      title: "Sucesso",
      description: "Plano adicionado com sucesso!"
    });
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
    toast({
      title: "Sucesso",
      description: "Plano removido com sucesso!"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Planos</h3>
      </div>

      <Button onClick={() => setShowPlanForm(!showPlanForm)}>
        {showPlanForm ? "Cancelar" : "Adicionar Novo Plano"}
      </Button>

      {showPlanForm && (
        <Card className="p-6">
          <PlanForm onSubmit={handleAddPlan} />
        </Card>
      )}

      <div className="grid gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p className="text-gray-500">{plan.category}</p>
                <p className="text-sm mt-2">{plan.mega} Mega</p>
                <div className="mt-2">
                  <span className="font-bold">
                    R$ {plan.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};