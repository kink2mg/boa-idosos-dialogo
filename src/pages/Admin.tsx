import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, Settings, Box, Newspaper, Smartphone } from "lucide-react";

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

  const [activeCategory, setActiveCategory] = useState("Planos");

  const categories = [
    { name: "Planos", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Acessórios", icon: <Box className="w-5 h-5" /> },
    { name: "Notícias", icon: <Newspaper className="w-5 h-5" /> },
    { name: "Configurações", icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4 space-y-2">
        <h2 className="text-xl font-bold px-2 py-4 border-b border-slate-700">Admin Total</h2>
        {categories.map((cat) => (
          <Button
            key={cat.name}
            variant="ghost"
            className={`w-full justify-start space-x-3 ${
              activeCategory === cat.name 
                ? "bg-slate-800 text-white" 
                : "hover:bg-slate-800/50 text-slate-300"
            }`}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </Button>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{activeCategory}</h1>
              <p className="text-slate-500">Gerencie os {activeCategory.toLowerCase()} do sistema</p>
            </div>
            <div className="flex gap-4">
              <Input placeholder="Pesquisar..." className="w-64" />
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Item
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-emerald-50 border-emerald-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-emerald-600">Total Planos</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <Box className="w-8 h-8 text-emerald-600" />
              </div>
            </Card>
            {/* Adicionar mais cards de estatística conforme necessário */}
          </div>

          {/* Listagem de Planos */}
          <Card className="border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-500 font-medium">Plano</th>
                    <th className="text-left py-4 px-6 text-slate-500 font-medium">Categoria</th>
                    <th className="text-left py-4 px-6 text-slate-500 font-medium">Preço</th>
                    <th className="text-left py-4 px-6 text-slate-500 font-medium">Dados</th>
                    <th className="text-right py-4 px-6 text-slate-500 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-slate-50 border-b last:border-0">
                      <td className="py-4 px-6 font-medium">{plan.title}</td>
                      <td className="py-4 px-6 text-slate-500">{plan.category}</td>
                      <td className="py-4 px-6">R$ {plan.price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-primary font-medium">{plan.gb}GB</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
