import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Palette, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PlanForm from "@/components/admin/PlanForm";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";

// Interfaces
interface PlanFeature {
  text: string;
  info?: string;
}

interface Plan {
  id: string;
  title: string;
  category: string;
  price: number;
  precoAntigo?: number;
  features: PlanFeature[];
  imageUrl?: string;
  isPopular?: boolean;
  salesCount?: number;
  description?: string;
  color?: string;
}

interface Accessory {
  id: string;
  nome: string;
  preco: number;
  precoAntigo?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  emPromocao: boolean;
  quantidadeVendas: number;
  color?: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
  color?: string;
}

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    textColor: "#1f2937",
    backgroundColor: "#f3f4f6"
  });

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeConfig");
    if (savedTheme) {
      setThemeConfig(JSON.parse(savedTheme));
    }
  }, []);

  // Salvar configurações
  const saveConfig = () => {
    localStorage.setItem("themeConfig", JSON.stringify(themeConfig));
    toast({
      title: "Configurações salvas",
      description: "As alterações foram armazenadas com sucesso!"
    });
  };

  // Handlers genéricos
  const createHandler = <T extends { id: string }>(state: T[], setState: React.Dispatch<React.SetStateAction<T[]>>) => 
    (newItem: Omit<T, "id">) => {
      const item = { ...newItem, id: Date.now().toString() } as T;
      setState([...state, item]);
      toast({ title: "Sucesso", description: "Item adicionado!" });
    };

  const deleteHandler = <T extends { id: string }>(state: T[], setState: React.Dispatch<React.SetStateAction<T[]>>) => 
    (id: string) => {
      setState(state.filter(item => item.id !== id));
      toast({ title: "Sucesso", description: "Item removido!" });
    };

  // Handlers específicos
  const handleAddPlan = createHandler(plans, setPlans);
  const handleAddAccessory = createHandler(accessories, setAccessories);
  const handleAddNews = createHandler(news, setNews);
  const handleDeletePlan = deleteHandler(plans, setPlans);
  const handleDeleteAccessory = deleteHandler(accessories, setAccessories);
  const handleDeleteNews = deleteHandler(news, setNews);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: themeConfig.textColor }}>
            Painel Administrativo
          </h1>
          <Button onClick={saveConfig} className="gap-2">
            <Save size={18} />
            Salvar Configurações
          </Button>
        </div>

        <Tabs defaultValue="config" className="space-y-4">
          <TabsList style={{ 
            backgroundColor: themeConfig.primaryColor,
            color: themeConfig.textColor
          }}>
            <TabsTrigger value="config" className="gap-2">
              <Palette size={16} /> Tema
            </TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          {/* Seção de Configurações de Tema */}
          <TabsContent value="config">
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Cor Primária</label>
                  <input
                    type="color"
                    value={themeConfig.primaryColor}
                    onChange={(e) => setThemeConfig({...themeConfig, primaryColor: e.target.value})}
                  />
                </div>
                <div>
                  <label>Cor Secundária</label>
                  <input
                    type="color"
                    value={themeConfig.secondaryColor}
                    onChange={(e) => setThemeConfig({...themeConfig, secondaryColor: e.target.value})}
                  />
                </div>
                <div>
                  <label>Cor do Texto</label>
                  <input
                    type="color"
                    value={themeConfig.textColor}
                    onChange={(e) => setThemeConfig({...themeConfig, textColor: e.target.value})}
                  />
                </div>
                <div>
                  <label>Cor de Fundo</label>
                  <input
                    type="color"
                    value={themeConfig.backgroundColor}
                    onChange={(e) => setThemeConfig({...themeConfig, backgroundColor: e.target.value})}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Seção de Planos */}
          <TabsContent value="plans">
            <div className="space-y-4">
              <PlanForm onSubmit={handleAddPlan} />
              
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card key={plan.id} className="p-6" style={{ borderColor: themeConfig.primaryColor }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold" style={{ color: themeConfig.textColor }}>
                          {plan.title}
                        </h3>
                        <p style={{ color: themeConfig.primaryColor }}>{plan.category}</p>
                        <div className="mt-4 space-y-2">
                          <Button 
                            variant="outline" 
                            style={{ 
                              backgroundColor: themeConfig.secondaryColor,
                              color: 'white'
                            }}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="ml-2"
                            onClick={() => handleDeletePlan(plan.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: themeConfig.primaryColor }}>
                          R$ {plan.price.toFixed(2)}
                        </p>
                        {plan.precoAntigo && (
                          <p className="line-through text-gray-500">
                            R$ {plan.precoAntigo.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Seção de Acessórios */}
          <TabsContent value="accessories">
            <div className="space-y-4">
              <AccessoryForm onSubmit={handleAddAccessory} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessories.map((accessory) => (
                  <Card key={accessory.id} className="p-6" style={{ 
                    backgroundColor: themeConfig.primaryColor + '10',
                    borderColor: themeConfig.primaryColor
                  }}>
                    <div className="space-y-4">
                      <img 
                        src={accessory.imagem} 
                        alt={accessory.nome} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h3 className="text-xl font-semibold" style={{ color: themeConfig.textColor }}>
                        {accessory.nome}
                      </h3>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          style={{ color: themeConfig.primaryColor }}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleDeleteAccessory(accessory.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Seção de Notícias */}
          <TabsContent value="news">
            <div className="space-y-4">
              <NewsForm onSubmit={handleAddNews} />
              
              <div className="grid gap-4">
                {news.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold" style={{ color: themeConfig.textColor }}>
                          {item.title}
                        </h3>
                        <p className="text-sm mt-2 text-gray-600">{item.content.substring(0, 100)}...</p>
                        <div className="mt-4 flex gap-2">
                          <Button 
                            variant="outline"
                            style={{ color: themeConfig.primaryColor }}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleDeleteNews(item.id)}
                          >
                            Excluir
                          </Button>
                        </div>
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
