
import { Plan } from "@/types/plans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface PlanEditorProps {
  selectedPlan: Plan;
  onUpdatePlan: (plan: Plan) => void;
}

const PlanEditor = ({ selectedPlan, onUpdatePlan }: PlanEditorProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título do Plano</Label>
          <Input
            id="title"
            value={selectedPlan.title}
            onChange={(e) => onUpdatePlan({
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
            onChange={(e) => onUpdatePlan({
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
            onChange={(e) => onUpdatePlan({
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
            onChange={(e) => onUpdatePlan({
              ...selectedPlan,
              price: parseFloat(e.target.value)
            })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPopular"
            checked={selectedPlan.is_popular}
            onCheckedChange={(checked) => onUpdatePlan({
              ...selectedPlan,
              is_popular: checked
            })}
          />
          <Label htmlFor="isPopular">Plano Popular</Label>
        </div>

        <Button 
          className="w-full"
          onClick={() => onUpdatePlan(selectedPlan)}
        >
          Salvar Alterações
        </Button>
      </div>
    </Card>
  );
};

export default PlanEditor;
