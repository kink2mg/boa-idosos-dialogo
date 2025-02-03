import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface AdminListProps {
  type: string;
  onDelete: (id: number) => void;
}

export const AdminList = ({ type, onDelete }: AdminListProps) => {
  const items = []; // Aqui você pode integrar com um estado global ou API

  return (
    <div className="grid gap-4">
      {items.map((item: any) => (
        <Card key={item.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">
                {type === "plans" ? item.title : type === "accessories" ? item.nome : item.title}
              </h3>
              <p className="text-gray-500">{item.category || item.categoria}</p>
              <p className="text-sm mt-2">{item.description || item.descricao || item.content}</p>
              {(item.price || item.preco) && (
                <div className="mt-2">
                  <span className="font-bold">
                    R$ {(item.price || item.preco).toFixed(2)}
                  </span>
                  {(item.precoAntigo || item.oldPrice) && (
                    <span className="text-gray-500 line-through ml-2">
                      R$ {(item.precoAntigo || item.oldPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => onDelete(item.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};