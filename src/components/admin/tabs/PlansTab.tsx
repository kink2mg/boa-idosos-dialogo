import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlanForm from "../PlanForm";
import { Plan } from "@/types/plans";

export const PlansTab = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      title: "Internet Básica",
      category: "Residencial",
      price: 89.90,
      mega: 200,
      features: [
        { text: "Wi-Fi Grátis" },
        { text: "Instalação Gratuita" },
        { text: "Suporte 24/7" }
      ],
      is_popular: false,
      sales_count: 150,
      description: "Plano ideal para uso básico da internet",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Internet Plus",
      category: "Residencial",
      price: 119.90,
      mega: 400,
      features: [
        { text: "Wi-Fi Grátis" },
        { text: "Instalação Gratuita" },
        { text: "Suporte 24/7" },
        { text: "IP Fixo" }
      ],
      is_popular: true,
      sales_count: 280,
      description: "Plano perfeito para streaming e jogos",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Internet Premium",
      category: "Residencial",
      price: 149.90,
      mega: 600,
      features: [
        { text: "Wi-Fi Grátis" },
        { text: "Instalação Gratuita" },
        { text: "Suporte 24/7" },
        { text: "IP Fixo" },
        { text: "Prioridade no Atendimento" }
      ],
      is_popular: false,
      sales_count: 200,
      description: "Nossa melhor internet para toda família",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "4",
      title: "Internet Business",
      category: "Empresarial",
      price: 299.90,
      mega: 800,
      features: [
        { text: "Wi-Fi Corporativo" },
        { text: "Instalação Especializada" },
        { text: "Suporte Prioritário" },
        { text: "IP Fixo" },
        { text: "SLA Garantido" }
      ],
      is_popular: false,
      sales_count: 80,
      description: "Internet dedicada para empresas",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "5",
      title: "Internet Enterprise",
      category: "Empresarial",
      price: 499.90,
      mega: 1000,
      features: [
        { text: "Wi-Fi Corporativo" },
        { text: "Instalação Especializada" },
        { text: "Suporte VIP" },
        { text: "IP Fixo" },
        { text: "SLA Premium" },
        { text: "Link Dedicado" }
      ],
      is_popular: false,
      sales_count: 45,
      description: "Solução completa para grandes empresas",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);
  const [showPlanForm, setShowPlanForm] = useState(false);

  const handleAddPlan = (newPlan: Omit<Plan, "id">) => {
    const plan: Plan = {
      ...newPlan,
      id: String(plans.length + 1),
      is_popular: newPlan.is_popular || false,
      sales_count: newPlan.sales_count || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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

export default PlansTab;