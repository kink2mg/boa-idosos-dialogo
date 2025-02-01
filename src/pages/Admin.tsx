import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Plus, Edit, Trash, Settings, Box, Newspaper, Smartphone, 
  X, Save, ImageIcon, List, Star, TrendingUp 
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
      image: "https://example.com/image1.jpg",
      isPopular: true
    },
    // ... outro plano
  ]);

  const [activeCategory, setActiveCategory] = useState("Planos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Novos estados para configurações
  const [pageSettings, setPageSettings] = useState({
    title: "Planos Net",
    subtitle: "Escolha o plano perfeito para suas necessidades",
    gradientFrom: "indigo-50",
    gradientTo: "blue-50"
  });

  const categories = [
    { name: "Planos", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Configurações", icon: <Settings className="w-5 h-5" /> }
  ];

  // Funções CRUD
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

  // Componente do formulário de plano
  const PlanForm = () => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{selectedPlan ? "Editar Plano" : "Novo Plano"}</DialogTitle>
        <X className="absolute right-4 top-4 cursor-pointer" onClick={() => setIsModalOpen(false)} />
      </DialogHeader>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input label="Título" value={selectedPlan?.title || ""} 
            onChange={e => setSelectedPlan({...selectedPlan!, title: e.target.value})} />
          
          <Input label="Categoria" value={selectedPlan?.category || ""} 
            onChange={e => setSelectedPlan({...selectedPlan!, category: e.target.value})} />
          
          <Input label="Preço" type="number" value={selectedPlan?.price || 0} 
            onChange={e => setSelectedPlan({...selectedPlan!, price: Number(e.target.value)})} />
          
          <Input label="GB de Dados" type="number" value={selectedPlan?.gb || 0} 
            onChange={e => setSelectedPlan({...selectedPlan!, gb: Number(e.target.value)})} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch checked={selectedPlan?.isPopular || false} 
              onCheckedChange={checked => setSelectedPlan({...selectedPlan!, isPopular: checked})} />
            <span>Plano em Destaque</span>
          </div>

          <Input label="Imagem (URL)" value={selectedPlan?.image || ""} 
            onChange={e => setSelectedPlan({...selectedPlan!, image: e.target.value})} />

          <div className="space-y-2">
            <label className="text-sm font-medium">Características</label>
            {selectedPlan?.features?.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input value={feature.text} 
                  onChange={e => {
                    const newFeatures = [...selectedPlan.features];
                    newFeatures[index].text = e.target.value;
                    setSelectedPlan({...selectedPlan, features: newFeatures});
                  }} />
                <Button variant="outline" size="sm" 
                  onClick={() => {
                    const newFeatures = selectedPlan.features.filter((_, i) => i !== index);
                    setSelectedPlan({...selectedPlan, features: newFeatures});
                  }}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full" 
              onClick={() => setSelectedPlan({
                ...selectedPlan!, 
                features: [...selectedPlan?.features || [], { text: "" }]
              })}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Característica
            </Button>
          </div>
        </div>
      </div>

      <Button className="mt-4 w-full" onClick={() => handleSavePlan(selectedPlan!)}>
        <Save className="w-4 h-4 mr-2" /> Salvar Plano
      </Button>
    </DialogContent>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ... sidebar ... */}

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            {/* ... */}
            <div className="flex gap-4">
              <Input 
                placeholder="Pesquisar..." 
                className="w-64" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="bg-primary hover:bg-primary/90"
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

          {/* Estatísticas Aprimoradas */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-emerald-50 border-emerald-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-emerald-600">Total Planos</p>
                  <h3 className="text-2xl font-bold">{plans.length}</h3>
                </div>
                <Box className="w-8 h-8 text-emerald-600" />
              </div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-600">Vendas Totais</p>
                  <h3 className="text-2xl font-bold">
                    {plans.reduce((sum, plan) => sum + plan.sales, 0)}
                  </h3>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </Card>
          </div>

          {/* Tabela Aprimorada */}
          <Card className="border-0 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* ... cabeçalho ... */}
                <tbody>
                  {plans
                    .filter(plan => 
                      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      plan.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((plan) => (
                      <tr key={plan.id} className="hover:bg-slate-50 border-b last:border-0">
                        {/* ... células ... */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {plan.isPopular && <Star className="w-4 h-4 text-amber-500" />}
                            {plan.title}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-primary font-medium">
                          <img 
                            src={plan.image} 
                            alt={plan.title} 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        {/* ... ações ... */}
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
