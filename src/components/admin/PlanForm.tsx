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
  id: number;
  title: string;
  category: string;
  price: number;
  precoAntigo?: number;
  mega: number;
  features: PlanFeature[];
  imageUrl?: string;
  videoUrl?: string;
  isPopular?: boolean;
  salesCount?: number;
  description?: string;
}

interface PlanFormProps {
  onSubmit: (plan: Omit<Plan, "id">) => void;
}

const PlanForm = ({ onSubmit }: PlanFormProps) => {
  const [features, setFeatures] = useState<PlanFeature[]>([]);
  const [newFeature, setNewFeature] = useState({ text: "", info: "" });
  const [plan, setPlan] = useState<Omit<Plan, "id">>({
    title: "",
    category: "",
    price: 0,
    precoAntigo: 0,
    mega: 0,
    features: [],
    imageUrl: "",
    videoUrl: "",
    isPopular: false,
    salesCount: 0,
    description: ""
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
            value={plan.price}
            onChange={(e) => setPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="oldPrice">Preço Antigo (R$)</Label>
          <Input
            id="oldPrice"
            type="number"
            step="0.01"
            value={plan.precoAntigo}
            onChange={(e) => setPlan(prev => ({ ...prev, precoAntigo: Number(e.target.value) }))}
          />
        </div>
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={plan.videoUrl}
          onChange={(e) => setPlan(prev => ({ ...prev, videoUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPopular"
          checked={plan.isPopular}
          onCheckedChange={(checked) => setPlan(prev => ({ ...prev, isPopular: checked }))}
        />
        <Label htmlFor="isPopular">Plano Popular</Label>
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