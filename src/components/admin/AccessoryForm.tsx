import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

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
  enviarNotificacao: boolean;
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
    enviarNotificacao: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(accessory);
      toast({
        title: "Sucesso",
        description: "Acessório salvo com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar o acessório.",
        variant: "destructive",
      });
    }
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
            type="number"
            step="0.01"
            value={accessory.preco}
            onChange={(e) => setAccessory(prev => ({ ...prev, preco: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precoAntigo">Preço Antigo (R$)</Label>
          <Input
            id="precoAntigo"
            type="number"
            step="0.01"
            value={accessory.precoAntigo}
            onChange={(e) => setAccessory(prev => ({ ...prev, precoAntigo: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={accessory.descricao}
          onChange={(e) => setAccessory(prev => ({ ...prev, descricao: e.target.value }))}
          rows={3}
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
          placeholder="https://exemplo.com/imagem.jpg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={accessory.videoUrl}
          onChange={(e) => setAccessory(prev => ({ ...prev, videoUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="emPromocao"
            checked={accessory.emPromocao}
            onCheckedChange={(checked) => setAccessory(prev => ({ ...prev, emPromocao: checked }))}
          />
          <Label htmlFor="emPromocao">Em Promoção</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="enviarNotificacao"
            checked={accessory.enviarNotificacao}
            onCheckedChange={(checked) => setAccessory(prev => ({ ...prev, enviarNotificacao: checked }))}
          />
          <Label htmlFor="enviarNotificacao">Enviar notificação</Label>
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