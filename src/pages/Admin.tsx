import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash } from "lucide-react";

interface Plan {
  id: number;
  title: string;
  category: string;
  price: number;
  gb: number;
}

const Admin = () => {
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, title: "NET PÓS", category: "Para seu celular", price: 119.90, gb: 50 },
    { id: 2, title: "NET CONTROLE", category: "Para seu celular", price: 54.90, gb: 25 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button className="bg-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Plano
          </Button>
        </div>

        <div className="grid gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{plan.title}</h3>
                  <p className="text-gray-500">{plan.category}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-bold">
                    R$ {plan.price.toFixed(2)}
                  </div>
                  <div className="text-primary font-bold">
                    {plan.gb}GB
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
