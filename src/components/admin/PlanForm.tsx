import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plan } from "@/types/plans";

interface PlanFormProps {
  onSubmit: (plan: Omit<Plan, "id" | "created_at" | "updated_at">) => void;
}

const PlanForm = ({ onSubmit }: PlanFormProps) => {
  const [plan, setPlan] = useState<Omit<Plan, "id" | "created_at" | "updated_at">>({
    title: "",
    category: "",
    price: 0,
    mega: 0,
    features: [],
    is_popular: false,
    sales_count: 0,
    image_url: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plan);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Plano</Label>
          <Input
            id="title"
            value={plan.title}
            onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            value={plan.category}
            onChange={(e) => setPlan(prev => ({ ...prev, category: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={plan.price}
            onChange={(e) => setPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mega">Mega</Label>
          <Input
            id="mega"
            type="number"
            value={plan.mega}
            onChange={(e) => setPlan(prev => ({ ...prev, mega: Number(e.target.value) }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salesCount">Quantidade de Vendas</Label>
        <Input
          id="salesCount"
          type="number"
          value={plan.sales_count}
          onChange={(e) => setPlan(prev => ({ ...prev, sales_count: Number(e.target.value) }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPopular"
          checked={plan.is_popular}
          onCheckedChange={(checked) => setPlan(prev => ({ ...prev, is_popular: checked }))}
        />
        <Label htmlFor="isPopular">Plano Popular</Label>
      </div>

      <Button type="submit" className="w-full">
        Salvar Plano
      </Button>
    </form>
  );
};

export default PlanForm;