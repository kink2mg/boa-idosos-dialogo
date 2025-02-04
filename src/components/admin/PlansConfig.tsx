
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";
import { Plan } from "@/types/plans";

const PlansConfig = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    try {
      const storedPlans = localStorage.getItem('plans');
      console.log('Fetching stored plans:', storedPlans); // Debug log
      if (storedPlans) {
        const parsedPlans = JSON.parse(storedPlans);
        console.log('Parsed plans in admin:', parsedPlans); // Debug log
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

  const handleAddPlan = () => {
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
      console.log('Saving plans:', updatedPlans); // Debug log
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

  const handleUpdatePlan = async (updatedPlan: Plan) => {
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

  const handleDeletePlan = async (planId: string) => {
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
