import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

  const formatarVendas = (quantidade: number): string => {
    return quantidade >= 1000 ? `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil` : quantidade.toString();
  };

  const desconto = accessory.precoAntigo
    ? ((1 - accessory.preco / accessory.precoAntigo) * 100).toFixed(0)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accessory);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
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
          <div className="space-y-2">
            <Label htmlFor="quantidadeVendas">Quantidade de Vendas</Label>
            <Input
              id="quantidadeVendas"
              type="number"
              value={accessory.quantidadeVendas}
              onChange={(e) => setAccessory(prev => ({ ...prev, quantidadeVendas: Number(e.target.value) }))}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
          Salvar Acessório
        </Button>
      </form>

      {/* Preview do Produto */}
      <Card className="w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        <CardHeader className="relative">
          <img
            src={accessory.imagem || "https://via.placeholder.com/500"}
            alt={accessory.nome}
            className="w-full h-60 object-cover rounded-t-lg"
          />
          {accessory.emPromocao && (
            <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-md">
              Promoção
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{accessory.nome || "Nome do Produto"}</CardTitle>
          <p className="text-gray-600 mb-2">{accessory.descricao || "Descrição do produto"}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-primary">
                R$ {accessory.preco.toFixed(2).replace('.', ',')}
              </p>
              {accessory.precoAntigo && accessory.precoAntigo > accessory.preco && (
                <span className="text-xs font-semibold text-orange-600">
                  {desconto}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Vendas: {formatarVendas(accessory.quantidadeVendas)}
            </p>
          </div>

          {accessory.precoAntigo && accessory.precoAntigo > accessory.preco && (
            <p className="text-md text-gray-500 line-through">
              R$ {accessory.precoAntigo.toFixed(2).replace('.', ',')}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessoryForm;
