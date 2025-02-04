import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AccessoryForm from "../AccessoryForm";

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
}

export const AccessoriesTab = () => {
  const { toast } = useToast();
  const [accessories, setAccessories] = useState<Accessory[]>([
    {
      id: 1,
      nome: "Roteador Wi-Fi 6",
      preco: 399.90,
      descricao: "Roteador de última geração com tecnologia Wi-Fi 6",
      imagem: "https://exemplo.com/roteador.jpg",
      categoria: "Roteadores",
      emPromocao: false,
      quantidadeVendas: 75
    },
    {
      id: 2,
      nome: "Repetidor Wi-Fi",
      preco: 149.90,
      precoAntigo: 199.90,
      descricao: "Amplificador de sinal Wi-Fi para maior cobertura",
      imagem: "https://exemplo.com/repetidor.jpg",
      categoria: "Roteadores",
      emPromocao: true,
      quantidadeVendas: 120
    },
    {
      id: 3,
      nome: "Cabo de Rede 5m",
      preco: 29.90,
      descricao: "Cabo de rede Cat6 blindado de 5 metros",
      imagem: "https://exemplo.com/cabo.jpg",
      categoria: "Cabos",
      emPromocao: false,
      quantidadeVendas: 200
    },
    {
      id: 4,
      nome: "Switch 8 Portas",
      preco: 89.90,
      descricao: "Switch gigabit com 8 portas",
      imagem: "https://exemplo.com/switch.jpg",
      categoria: "Switches",
      emPromocao: false,
      quantidadeVendas: 45
    },
    {
      id: 5,
      nome: "Kit Ferramentas",
      preco: 59.90,
      precoAntigo: 79.90,
      descricao: "Kit completo de ferramentas para instalação de rede",
      imagem: "https://exemplo.com/ferramentas.jpg",
      categoria: "Ferramentas",
      emPromocao: true,
      quantidadeVendas: 90
    }
  ]);
  const [showAccessoryForm, setShowAccessoryForm] = useState(false);

  const handleAddAccessory = (newAccessory: Omit<Accessory, "id">) => {
    const accessory = { ...newAccessory, id: accessories.length + 1 };
    setAccessories([...accessories, accessory]);
    setShowAccessoryForm(false);
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleDeleteAccessory = (id: number) => {
    setAccessories(accessories.filter(acc => acc.id !== id));
    toast({
      title: "Sucesso",
      description: "Acessório removido com sucesso!"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Acessórios</h3>
      </div>

      <Button onClick={() => setShowAccessoryForm(!showAccessoryForm)}>
        {showAccessoryForm ? "Cancelar" : "Adicionar Novo Acessório"}
      </Button>

      {showAccessoryForm && (
        <Card className="p-6">
          <AccessoryForm onSubmit={handleAddAccessory} />
        </Card>
      )}

      <div className="grid gap-4">
        {accessories.map((accessory) => (
          <Card key={accessory.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{accessory.nome}</h3>
                <p className="text-gray-500">{accessory.categoria}</p>
                <p className="text-sm mt-2">{accessory.descricao}</p>
                <div className="mt-2">
                  <span className="font-bold">
                    R$ {accessory.preco.toFixed(2)}
                  </span>
                  {accessory.precoAntigo && (
                    <span className="text-gray-500 line-through ml-2">
                      R$ {accessory.precoAntigo.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDeleteAccessory(accessory.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};