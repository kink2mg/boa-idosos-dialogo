import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const [accessory, setAccessory] = useState<Omit<Accessory, "id">>({
    nome: "",
    preco: 0,
    precoAntigo: 0,
    descricao: "",
    imagem: "",
    videoUrl: "",
    categoria: "",
    emPromocao: false,
    quantidadeVendas: 0,
  });

  const formatarVendas = (quantidade: number): string => {
    return quantidade >= 1000 ? `${(quantidade / 1000).toFixed(1).replace(".", ",")} mil` : quantidade.toString();
  };

  const desconto = accessory.precoAntigo && accessory.precoAntigo > 0
    ? ((1 - accessory.preco / accessory.precoAntigo) * 100).toFixed(0)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accessory.preco <= 0) {
      toast({ title: "Erro", description: "O preço deve ser maior que zero.", variant: "destructive" });
      return;
    }

    if (accessory.quantidadeVendas < 0) {
      toast({ title: "Erro", description: "A quantidade de vendas não pode ser negativa.", variant: "destructive" });
      return;
    }

    onSubmit(accessory);
    toast({ title: "Sucesso", description: `${accessory.nome} foi salvo com sucesso!` });

    setAccessory({
      nome: "",
      preco: 0,
      precoAntigo: 0,
      descricao: "",
      imagem: "",
      videoUrl: "",
      categoria: "",
      emPromocao: false,
      quantidadeVendas: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Cadastrar Acessório</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Acessório</Label>
          <Input id="nome" value={accessory.nome} onChange={(e) => setAccessory((prev) => ({ ...prev, nome: e.target.value }))} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Input id="categoria" value={accessory.categoria} onChange={(e) => setAccessory((prev) => ({ ...prev, categoria: e.target.value }))} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preco">Preço Atual (R$)</Label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            min="0"
            value={accessory.preco}
            onChange={(e) => setAccessory((prev) => ({ ...prev, preco: Math.max(0, Number(e.target.value)) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precoAntigo">Preço Antigo (R$)</Label>
          <Input
            id="precoAntigo"
            type="number"
            step="0.01"
            min="0"
            value={accessory.precoAntigo}
            onChange={(e) => setAccessory((prev) => ({ ...prev, precoAntigo: Math.max(0, Number(e.target.value)) }))}
          />
        </div>
      </div>

      {accessory.precoAntigo && accessory.precoAntigo > 0 && (
        <p className="text-sm font-semibold text-orange-600">Desconto: {desconto}% OFF</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" value={accessory.descricao} onChange={(e) => setAccessory((prev) => ({ ...prev, descricao: e.target.value }))} rows={3} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagem">URL da Imagem</Label>
        <Input id="imagem" type="url" value={accessory.imagem} onChange={(e) => setAccessory((prev) => ({ ...prev, imagem: e.target.value }))} placeholder="https://exemplo.com/imagem.jpg" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
        <Input id="videoUrl" type="url" value={accessory.videoUrl} onChange={(e) => setAccessory((prev) => ({ ...prev, videoUrl: e.target.value }))} placeholder="https://youtube.com/watch?v=..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="emPromocao" checked={accessory.emPromocao} onCheckedChange={(checked) => setAccessory((prev) => ({ ...prev, emPromocao: checked }))} />
          <Label htmlFor="emPromocao">Em Promoção</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantidadeVendas">Quantidade de Vendas</Label>
          <Input id="quantidadeVendas" type="number" min="0" value={accessory.quantidadeVendas} onChange={(e) => setAccessory((prev) => ({ ...prev, quantidadeVendas: Math.max(0, Number(e.target.value)) }))} />
          <p className="text-sm text-gray-500">Vendas formatadas: {formatarVendas(accessory.quantidadeVendas)}</p>
        </div>
      </div>

      <Button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200">
        Salvar Acessório
      </Button>
    </form>
  );
};

export default AccessoryForm;
