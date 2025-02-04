import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

interface PlanFeature {
  text: string;
  info?: string;
}

interface Plan {
  id: string;
  title: string;
  category: string;
  price: number;
  precoAntigo?: number;
  mega: number;
  features: PlanFeature[];
  imageUrl?: string;
  is_popular: boolean;
  sales_count: number;
  description?: string;
  created_at: string;
  updated_at: string;
  enviarNotificacao?: boolean;
}

interface PlanFormProps {
  onSubmit: (plan: Omit<Plan, "id">) => void;
}

const PlanForm = ({ onSubmit }: PlanFormProps) => {
  const [features, setFeatures] = useState<PlanFeature[]>([]);
  const [newFeature, setNewFeature] = useState({ text: "", info: "" });
  const [showOldPrice, setShowOldPrice] = useState(false);
  const [plan, setPlan] = useState<Omit<Plan, "id">>({
    title: "",
    category: "",
    price: undefined as any,
    precoAntigo: undefined,
    mega: undefined as any,
    features: [],
    imageUrl: "",
    is_popular: false,
    sales_count: undefined as any,
    description: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    enviarNotificacao: false
  });

  const handleAddFeature = () => {
    if (newFeature.text) {
      setFeatures([...features, newFeature]);
      setNewFeature({ text: "", info: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...plan, features });
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
          <Label htmlFor="price">Preço Atual (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={plan.price || ""}
            onChange={(e) => setPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="showOldPrice">Mostrar Preço Antigo</Label>
            <Switch
              id="showOldPrice"
              checked={showOldPrice}
              onCheckedChange={setShowOldPrice}
            />
          </div>
          {showOldPrice && (
            <Input
              id="precoAntigo"
              type="number"
              step="0.01"
              value={plan.precoAntigo || ""}
              onChange={(e) => setPlan(prev => ({ ...prev, precoAntigo: Number(e.target.value) }))}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mega">Mega</Label>
          <Input
            id="mega"
            type="number"
            value={plan.mega || ""}
            onChange={(e) => setPlan(prev => ({ ...prev, mega: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salesCount">Quantidade de Vendas</Label>
          <Input
            id="salesCount"
            type="number"
            value={plan.sales_count || ""}
            onChange={(e) => setPlan(prev => ({ ...prev, sales_count: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Plano</Label>
        <Textarea
          id="description"
          value={plan.description}
          onChange={(e) => setPlan(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input
          id="imageUrl"
          type="url"
          value={plan.imageUrl}
          onChange={(e) => setPlan(prev => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="isPopular"
            checked={plan.is_popular}
            onCheckedChange={(checked) => setPlan(prev => ({ ...prev, is_popular: checked }))}
          />
          <Label htmlFor="isPopular">Plano Popular</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="enviarNotificacao"
            checked={plan.enviarNotificacao}
            onCheckedChange={(checked) => setPlan(prev => ({ ...prev, enviarNotificacao: checked }))}
          />
          <Label htmlFor="enviarNotificacao">Enviar notificação</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Características do Plano</Label>
        <div className="flex space-x-2">
          <Input
            value={newFeature.text}
            onChange={(e) => setNewFeature(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Nova característica"
          />
          <Input
            value={newFeature.info}
            onChange={(e) => setNewFeature(prev => ({ ...prev, info: e.target.value }))}
            placeholder="Informação adicional (opcional)"
          />
          <Button type="button" onClick={handleAddFeature}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ul className="mt-2 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{feature.text}</span>
              {feature.info && <span className="text-gray-500">({feature.info})</span>}
            </li>
          ))}
        </ul>
      </div>

      <Button type="submit" className="w-full">
        Salvar Plano
      </Button>
    </form>
  );
};

export default PlanForm;