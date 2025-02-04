import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PriceFields } from "./plan-form/PriceFields";

interface Plan {
  id: number;
  title: string;
  price: number;
  precoAntigo?: number;
  mega: number;
  salesCount?: number;
}

interface PlanFormProps {
  onSubmit: (plan: Omit<Plan, "id">) => void;
}

const PlanForm = ({ onSubmit }: PlanFormProps) => {
  const [plan, setPlan] = useState<Omit<Plan, "id">>({
    title: "",
    price: '' as unknown as number,
    precoAntigo: undefined,
    mega: '' as unknown as number,
    salesCount: '' as unknown as number,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plan);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Plano</Label>
        <Input
          id="title"
          value={plan.title}
          onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <PriceFields
        price={plan.price}
        oldPrice={plan.precoAntigo}
        onPriceChange={(price) => setPlan(prev => ({ ...prev, price }))}
        onOldPriceChange={(oldPrice) => setPlan(prev => ({ ...prev, precoAntigo: oldPrice }))}
      />

      <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-2">
          <Label htmlFor="salesCount">Quantidade de Vendas</Label>
          <Input
            id="salesCount"
            type="number"
            value={plan.salesCount}
            onChange={(e) => setPlan(prev => ({ ...prev, salesCount: Number(e.target.value) }))}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Salvar Plano
      </Button>
    </form>
  );
};

export default PlanForm;