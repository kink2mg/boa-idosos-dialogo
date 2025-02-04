import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PlanForm from "@/components/admin/PlanForm";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

interface PlanFeature {
  text: string;
  info?: string;
}

interface Plan {
  id: number;
  title: string;
  category: string;
  price: number;
  precoAntigo?: number;
  mega: number;
  features: PlanFeature[];
  imageUrl?: string;
  videoUrl?: string;
  isPopular?: boolean;
  salesCount?: number;
  description?: string;
}

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

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  category: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showAccessoryForm, setShowAccessoryForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);

  const handleAddPlan = (newPlan: Omit<Plan, "id">) => {
    const plan = { ...newPlan, id: plans.length + 1 };
    setPlans([...plans, plan]);
    setShowPlanForm(false);
    toast({
      title: "Sucesso",
      description: "Plano adicionado com sucesso!"
    });
  };

  const handleAddAccessory = (newAccessory: Omit<Accessory, "id">) => {
    const accessory = { ...newAccessory, id: accessories.length + 1 };
    setAccessories([...accessories, accessory]);
    setShowAccessoryForm(false);
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleAddNews = (newNews: Omit<NewsItem, "id">) => {
    const newsItem = { ...newNews, id: news.length + 1 };
    setNews([...news, newsItem]);
    setShowNewsForm(false);
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
    });
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
    toast({
      title: "Sucesso",
      description: "Plano removido com sucesso!"
    });
  };

  const handleDeleteAccessory = (id: number) => {
    setAccessories(accessories.filter(acc => acc.id !== id));
    toast({
      title: "Sucesso",
      description: "Acessório removido com sucesso!"
    });
  };

  const handleDeleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
    toast({
      title: "Sucesso",
      description: "Notícia removida com sucesso!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Configurações do Site</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Configurações Gerais</h2>
              <SiteSettingsForm />
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-4">
              <Button onClick={() => setShowPlanForm(!showPlanForm)}>
                {showPlanForm ? "Cancelar" : "Adicionar Novo Plano"}
              </Button>

              {showPlanForm && (
                <Card className="p-6">
                  <PlanForm onSubmit={handleAddPlan} />
                </Card>
              )}

              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card key={plan.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{plan.title}</h3>
                        <p className="text-gray-500">{plan.category}</p>
                        <p className="text-sm mt-2">{plan.description}</p>
                        <div className="mt-2">
                          <span className="font-bold">R$ {plan.price.toFixed(2)}</span>
                          {plan.precoAntigo && (
                            <span className="text-gray-500 line-through ml-2">
                              R$ {plan.precoAntigo.toFixed(2)}
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
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessories">
            <div className="space-y-4">
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
                          <span className="font-bold">R$ {accessory.preco.toFixed(2)}</span>
                          {accessory.precoAntigo && (
                            <span className="text-gray-500 line-through ml-2">
                              R$ {accessory.precoAntigo.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Vendas: {accessory.quantidadeVendas || 0}
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
          </TabsContent>

          <TabsContent value="news">
            <div className="space-y-4">
              <Button onClick={() => setShowNewsForm(!showNewsForm)}>
                {showNewsForm ? "Cancelar" : "Adicionar Nova Notícia"}
              </Button>

              {showNewsForm && (
                <Card className="p-6">
                  <NewsForm onSubmit={handleAddNews} />
                </Card>
              )}

              <div className="grid gap-4">
                {news.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-500">{item.category}</p>
                        <p className="text-sm mt-2">{item.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteNews(item.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
