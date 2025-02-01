import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Plus, Edit, Trash, Settings, Box, Newspaper, Smartphone, 
  X, Save, ImageIcon, List, Star, TrendingUp, Search 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Plan {
  id: number;
  title: string;
  category: string;
  price: number;
  gb: number;
  sales: number;
  features: { text: string }[];
  image: string;
  isPopular: boolean;
}

const Admin = () => {
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: 1, 
      title: "NET PÓS", 
      category: "Plano Premium", 
      price: 119.90, 
      gb: 50,
      sales: 1200,
      features: [
        { text: "Passaporte Américas para usar seu celular no exterior" },
        { text: "GB para redes sociais e vídeos" }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500",
      isPopular: true
    },
    { 
      id: 2, 
      title: "NET CONTROLE", 
      category: "Plano Essencial", 
      price: 54.90, 
      gb: 25,
      sales: 850,
      features: [
        { text: "5G mais rápido do Brasil" },
        { text: "Ligações ilimitadas" }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500",
      isPopular: false
    }
  ]);

  const [activeCategory, setActiveCategory] = useState("Planos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const formatarVendas = (quantidade: number): string => {
    if (quantidade >= 1000) {
      return `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil`;
    }
    return quantidade.toString();
  };

  const handleSavePlan = (planData: Plan) => {
    if (planData.id) {
      setPlans(plans.map(p => p.id === planData.id ? planData : p));
    } else {
      setPlans([...plans, { ...planData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDeletePlan = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const PlanForm = () => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-orange-600">
          {selectedPlan ? "Editar Plano" : "Novo Plano"}
        </DialogTitle>
        <X className="absolute right-4 top-4 cursor-pointer text-gray-500" onClick={() => setIsModalOpen(false)} />
      </DialogHeader>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Título"
            value={selectedPlan?.title || ""} 
            onChange={e => setSelectedPlan({...selectedPlan!, title: e.target.value})}
          />
          
          <Input
            label="Categoria"
            value={selectedPlan?.category || ""} 
            onChange={e => setSelectedPlan({...selectedPlan!, category: e.target.value})}
          />
          
          <Input
            label="Preço"
            type="number"
            value={selectedPlan?.price || 0} 
            onChange={e => setSelectedPlan({...selectedPlan!, price: Number(e.target.value)})}
          />
          
          <Input
            label="GB de Dados"
            type="number"
            value={selectedPlan?.gb || 0} 
            onChange={e => setSelectedPlan({...selectedPlan!, gb: Number(e.target.value)})}
          />

          <Input
            label="Vendas"
            type="number"
            value={selectedPlan?.sales || 0} 
            onChange={e => setSelectedPlan({...selectedPlan!, sales: Number(e.target.value)})}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={selectedPlan?.isPopular || false} 
              onCheckedChange={checked => setSelectedPlan({...selectedPlan!, isPopular: checked})}
              className="data-[state=checked]:bg-orange-600"
            />
            <span>Plano em Destaque</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Imagem do Plano</label>
            <div className="flex gap-2">
              <Input
                value={selectedPlan?.image || ""}
                onChange={e => setSelectedPlan({...selectedPlan!, image: e.target.value})}
                placeholder="Cole a URL da imagem"
              />
              <Button variant="outline" type="button" className="border-orange-200">
                <ImageIcon className="w-4 h-4 mr-2 text-orange-600" />
                Upload
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Características</label>
            {selectedPlan?.features?.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature.text} 
                  onChange={e => {
                    const newFeatures = [...selectedPlan.features];
                    newFeatures[index].text = e.target.value;
                    setSelectedPlan({...selectedPlan, features: newFeatures});
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-200"
                  onClick={() => {
                    const newFeatures = selectedPlan.features.filter((_, i) => i !== index);
                    setSelectedPlan({...selectedPlan, features: newFeatures});
                  }}
                >
                  <X className="w-4 h-4 text-orange-600" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={() => setSelectedPlan({
                ...selectedPlan!, 
                features: [...selectedPlan?.features || [], { text: "" }]
              })}
            >
              <Plus className="w-4 h-4 mr-2" /> Adicionar Característica
            </Button>
          </div>
        </div>
      </div>

      <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700" onClick={() => handleSavePlan(selectedPlan!)}>
        <Save className="w-4 h-4 mr-2" /> Salvar Plano
      </Button>
    </DialogContent>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Painel Net</h2>
          <nav className="space-y-2">
            {["Planos", "Configurações"].map((category) => (
              <button
                key={category}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeCategory === category
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "Planos" ? (
                  <Smartphone className="w-5 h-5" />
                ) : (
                  <Settings className="w-5 h-5" />
                )}
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Planos</h1>
              <p className="text-gray-600">Gerencie seus planos e promoções</p>
            </div>
            <div className="flex gap-4">
              <Input
                placeholder="Pesquisar planos..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4 text-gray-400" />}
              />
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => {
                  setSelectedPlan(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-orange-600">Plano Mais Popular</p>
                  <h3 className="text-2xl font-bold">
                    {plans.find(p => p.isPopular)?.title || '-'}
                  </h3>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-600">Total de Planos</p>
                  <h3 className="text-2xl font-bold">{plans.length}</h3>
                </div>
                <Box className="w-8 h-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-green-600">Vendas Totais</p>
                  <h3 className="text-2xl font-bold">
                    {formatarVendas(plans.reduce((sum, plan) => sum + plan.sales, 0))}
                  </h3>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Tabela de Planos */}
          <Card className="border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Destaque</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Plano</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Imagem</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Preço</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Vendas</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {plans
                    .filter(plan => 
                      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      plan.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((plan) => (
                      <tr key={plan.id} className="hover:bg-slate-50 border-b last:border-0">
                        <td className="py-4 px-6">
                          {plan.isPopular && <Star className="w-5 h-5 text-amber-500" />}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-medium">{plan.title}</span>
                            <span className="text-sm text-gray-500">{plan.category}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <img 
                            src={plan.image} 
                            alt={plan.title} 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="py-4 px-6">
                          R$ {plan.price.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-4 px-6">
                          {formatarVendas(plan.sales)} vendas
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-orange-600 border-orange-200 hover:bg-orange-50"
                              onClick={() => {
                                setSelectedPlan(plan);
                                setIsModalOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeletePlan(plan.id)}
                            >
                              <Trash className="w-4 h-4" />
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

      {/* Modal de Edição/Criação */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedPlan !== null && <PlanForm />}
      </Dialog>
    </div>
  );
};

export default Admin;
