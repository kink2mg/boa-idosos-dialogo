
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import PlanForm from "../PlanForm";
import { Plan } from "@/types/plans";
import { usePlans } from "@/hooks/usePlans";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export const PlansTab = () => {
  const { plans, addPlan, deletePlan, updatePlan, isLoading } = usePlans();
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleAddPlan = async (newPlan: Omit<Plan, "id" | "created_at" | "updated_at">) => {
    try {
      await addPlan(newPlan);
      setShowPlanForm(false);
    } catch (error) {
      console.error("Error in handleAddPlan:", error);
    }
  };

  const handleEditPlan = async (plan: Plan) => {
    try {
      await updatePlan(plan);
      setEditingPlan(null);
    } catch (error) {
      console.error("Error in handleEditPlan:", error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Planos</h3>
      </div>

      <Button onClick={() => {
        setEditingPlan(null);
        setShowPlanForm(!showPlanForm);
      }}>
        {showPlanForm ? "Cancelar" : "Adicionar Novo Plano"}
      </Button>

      {(showPlanForm || editingPlan) && (
        <Card className="p-6">
          <PlanForm 
            onSubmit={editingPlan ? handleEditPlan : handleAddPlan}
            initialData={editingPlan}
          />
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
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setEditingPlan(plan)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => deletePlan(plan.id)}
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
