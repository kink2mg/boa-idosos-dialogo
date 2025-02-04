import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PriceFieldsProps {
  price: number | '';
  oldPrice?: number | '';
  onPriceChange: (price: number) => void;
  onOldPriceChange: (oldPrice?: number) => void;
}

export const PriceFields = ({ price, oldPrice, onPriceChange, onOldPriceChange }: PriceFieldsProps) => {
  const [showOldPrice, setShowOldPrice] = useState(!!oldPrice);

  const handleOldPriceToggle = (checked: boolean) => {
    setShowOldPrice(checked);
    if (!checked) {
      onOldPriceChange(undefined);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="price">Preço Atual (R$)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="showOldPrice">Mostrar Preço Antigo</Label>
          <Switch
            id="showOldPrice"
            checked={showOldPrice}
            onCheckedChange={handleOldPriceToggle}
          />
        </div>
        
        {showOldPrice && (
          <div className="mt-2">
            <Input
              id="oldPrice"
              type="number"
              step="0.01"
              value={oldPrice}
              onChange={(e) => onOldPriceChange(Number(e.target.value))}
              placeholder="Preço antigo"
            />
          </div>
        )}
      </div>
    </div>
  );
};