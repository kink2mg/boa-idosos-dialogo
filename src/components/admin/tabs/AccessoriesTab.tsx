import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Trash, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AccessoryForm from "../AccessoryForm";

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

export const AccessoriesTab = () => {
  const { toast } = useToast();
  const [accessories, setAccessories] = useState<Accessory[]>([]);
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