import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Accessory {
  id: number;
  nome: string;
  preco: number;
  precoAntigo?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  emPromocao: boolean;
  quantidadeVendas: number;
  desconto: boolean;
}

interface AccessoryFormProps {
  onSubmit: (accessory: Omit<Accessory, "id">) => void;
}

const AccessoryForm = ({ onSubmit }: AccessoryFormProps) => {
  const [accessory, setAccessory] = useState<Omit<Accessory, "id">>({
    nome: "",
    preco: '' as unknown as number,
    precoAntigo: undefined,
    descricao: "",
    imagem: "",
    categoria: "",
    emPromocao: false,
    quantidadeVendas: '' as unknown as number,
    desconto: false
  });

  const [showOldPrice, setShowOldPrice] = useState(false);

  const formatPrice = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'preco' | 'precoAntigo') => {
    const value = e.target.value;
    const numericValue = Number(value.replace(/\D/g, "")) / 100;
    setAccessory(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accessory);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Acessório</Label>
          <Input
            id="nome"
            value={accessory.nome}
            onChange={(e) => setAccessory(prev => ({ ...prev, nome: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Input
            id="categoria"
            value={accessory.categoria}
            onChange={(e) => setAccessory(prev => ({ ...prev, categoria: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preco">Preço Atual (R$)</Label>
          <Input
            id="preco"
            type="text"
            value={accessory.preco ? formatPrice(accessory.preco.toFixed(2)) : ''}
            onChange={(e) => handlePriceChange(e, 'preco')}
            required
          />
        </div>
        {showOldPrice && (
          <div className="space-y-2">
            <Label htmlFor="precoAntigo">Preço Antigo (R$)</Label>
            <Input
              id="precoAntigo"
              type="text"
              value={accessory.precoAntigo ? formatPrice(accessory.precoAntigo.toFixed(2)) : ''}
              onChange={(e) => handlePriceChange(e, 'precoAntigo')}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={accessory.descricao}
          onChange={(e) => setAccessory(prev => ({ ...prev, descricao: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagem">URL da Imagem</Label>
        <Input
          id="imagem"
          type="url"
          value={accessory.imagem}
          onChange={(e) => setAccessory(prev => ({ ...prev, imagem: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="showOldPrice"
            checked={showOldPrice}
            onCheckedChange={setShowOldPrice}
          />
          <Label htmlFor="showOldPrice">Ativar Preço Antigo</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="desconto"
            checked={accessory.desconto}
            onCheckedChange={(checked) => setAccessory(prev => ({ ...prev, desconto: checked }))}
          />
          <Label htmlFor="desconto">Ativar %OFF</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="emPromocao"
            checked={accessory.emPromocao}
            onCheckedChange={(checked) => setAccessory(prev => ({ ...prev, emPromocao: checked }))}
          />
          <Label htmlFor="emPromocao">Em Promoção</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantidadeVendas">Quantidade de Vendas</Label>
        <Input
          id="quantidadeVendas"
          type="number"
          value={accessory.quantidadeVendas}
          onChange={(e) => setAccessory(prev => ({ ...prev, quantidadeVendas: Number(e.target.value) }))}
        />
      </div>

      <Button type="submit" className="w-full">
        Salvar Acessório
      </Button>
    </form>
  );
};

export default AccessoryForm;