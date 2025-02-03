import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash } from "lucide-react";

interface PlanCategory {
  id: string;
  name: string;
}

interface Plan {
  id: string;
  title: string;
  category: string;
  price: number;
  features: string[];
  imageUrl?: string;
  videoUrl?: string;
  isPopular: boolean;
  salesCount: number;
  warranty: number;
}

const PlansConfig = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<PlanCategory[]>([
    { id: "1", name: "Plano Essencial" },
    { id: "2", name: "Plano Premium" }
  ]);
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { 
        id: Date.now().toString(), 
        name: newCategory 
      }]);
      setNewCategory("");
    }
  };

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      title: "",
      category: categories[0]?.id || "",
      price: 0,
      features: [],
      isPopular: false,
      salesCount: 0,
      warranty: 30
    };
    setPlans([...plans, newPlan]);
    setSelectedPlan(newPlan);
  };

  const handleUpdatePlan = (updatedPlan: Plan) => {
    setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    setSelectedPlan(updatedPlan);
  };

  const handleAddFeature = () => {
    if (selectedPlan && newFeature.trim()) {
      const updatedPlan = {
        ...selectedPlan,
        features: [...selectedPlan.features, newFeature]
      };
      handleUpdatePlan(updatedPlan);
      setNewFeature("");
    }
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
    if (selectedPlan?.id === planId) {
      setSelectedPlan(null);
    }
    toast({
      title: "Plano removido",
      description: "O plano foi removido com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Categorias de Planos</h3>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Nova categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleAddCategory}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 p-2 rounded">
              {category.name}
            </div>
          ))}
        </div>
      </Card>

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
                  <h4 className="font-semibold">{plan.title || "Novo Plano"}</h4>
                  <p className="text-sm text-gray-500">
                    R$ {plan.price.toFixed(2)}
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
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    title: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <select
                  id="category"
                  className="w-full border rounded-md p-2"
                  value={selectedPlan.category}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    category: e.target.value
                  })}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  value={selectedPlan.price}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    price: Number(e.target.value)
                  })}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={selectedPlan.imageUrl || ""}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    imageUrl: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
                <Input
                  id="videoUrl"
                  value={selectedPlan.videoUrl || ""}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    videoUrl: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="salesCount">Quantidade de Vendas</Label>
                <Input
                  id="salesCount"
                  type="number"
                  value={selectedPlan.salesCount}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    salesCount: Number(e.target.value)
                  })}
                />
              </div>

              <div>
                <Label htmlFor="warranty">Garantia (dias)</Label>
                <Input
                  id="warranty"
                  type="number"
                  value={selectedPlan.warranty}
                  onChange={(e) => handleUpdatePlan({
                    ...selectedPlan,
                    warranty: Number(e.target.value)
                  })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPopular"
                  checked={selectedPlan.isPopular}
                  onCheckedChange={(checked) => handleUpdatePlan({
                    ...selectedPlan,
                    isPopular: checked
                  })}
                />
                <Label htmlFor="isPopular">Plano Popular</Label>
              </div>

              <div>
                <Label>Características do Plano</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nova característica"
                  />
                  <Button onClick={handleAddFeature}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span>{feature}</span>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleUpdatePlan({
                          ...selectedPlan,
                          features: selectedPlan.features.filter((_, i) => i !== index)
                        })}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlansConfig;