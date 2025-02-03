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
  videoUrl?: string;
  categoria: string;
  emPromocao: boolean;
  quantidadeVendas: number;
}

interface AccessoryFormProps {
  onSubmit: (accessory: Omit<Accessory, "id">) => void;
}

const AccessoryForm = ({ onSubmit }: AccessoryFormProps) => {
  const [accessory, setAccessory] = useState<Omit<Accessory, "id">>({
    nome: "",
    preco: 0,
    precoAntigo: 0,
    descricao: "",
    imagem: "",
    videoUrl: "",
    categoria: "",
    emPromocao: false,
    quantidadeVendas: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accessory);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-background p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-text">Nome do Acessório</Label>
          <Input
            id="nome"
            value={accessory.nome}
            onChange={(e) => setAccessory(prev => ({ ...prev, nome: e.target.value }))}
            required
            className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria" className="text-text">Categoria</Label>
          <Input
            id="categoria"
            value={accessory.categoria}
            onChange={(e) => setAccessory(prev => ({ ...prev, categoria: e.target.value }))}
            required
            className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preco" className="text-text">Preço Atual (R$)</Label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            value={accessory.preco}
            onChange={(e) => setAccessory(prev => ({ ...prev, preco: Number(e.target.value) }))}
            required
            className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precoAntigo" className="text-text">Preço Antigo (R$)</Label>
          <Input
            id="precoAntigo"
            type="number"
            step="0.01"
            value={accessory.precoAntigo}
            onChange={(e) => setAccessory(prev => ({ ...prev, precoAntigo: Number(e.target.value) }))}
            className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao" className="text-text">Descrição</Label>
        <Textarea
          id="descricao"
          value={accessory.descricao}
          onChange={(e) => setAccessory(prev => ({ ...prev, descricao: e.target.value }))}
          rows={3}
          required
          className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagem" className="text-text">URL da Imagem</Label>
        <Input
          id="imagem"
          type="url"
          value={accessory.imagem}
          onChange={(e) => setAccessory(prev => ({ ...prev, imagem: e.target.value }))}
          placeholder="https://exemplo.com/imagem.jpg"
          required
          className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl" className="text-text">URL do Vídeo (YouTube)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={accessory.videoUrl}
          onChange={(e) => setAccessory(prev => ({ ...prev, videoUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
          className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="emPromocao"
            checked={accessory.emPromocao}
            onCheckedChange={(checked) => setAccessory(prev => ({ ...prev, emPromocao: checked }))}
          />
          <Label htmlFor="emPromocao" className="text-text">Em Promoção</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantidadeVendas" className="text-text">Quantidade de Vendas</Label>
          <Input
            id="quantidadeVendas"
            type="number"
            value={accessory.quantidadeVendas}
            onChange={(e) => setAccessory(prev => ({ ...prev, quantidadeVendas: Number(e.target.value) }))}
            className="border text-text placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-button hover:bg-buttonHover text-white py-2 rounded-md shadow-md">
        Salvar Acessório
      </Button>
    </form>
  );
};

export default AccessoryForm;
