import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Save, Settings, Box, Newspaper, Plug, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

interface Plan {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  isPopular: boolean;
}

interface Accessory {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    accentColor: "#22c55e",
    textColor: "#ffffff",
    backgroundColor: "#f3f4f6"
  });

  const [plans, setPlans] = useState<Plan[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    title: "",
    price: 0,
    description: "",
    features: [],
    isPopular: false
  });

  const [newAccessory, setNewAccessory] = useState<Omit<Accessory, 'id'>>({
    name: "",
    price: 0,
    category: "",
    image: "",
    stock: 0
  });

  const [newNews, setNewNews] = useState<Omit<News, 'id'>>({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    isFeatured: false
  });

  // Carregar dados
  useEffect(() => {
    const loadData = () => {
      const savedPlans = localStorage.getItem("plans");
      const savedAccessories = localStorage.getItem("accessories");
      const savedNews = localStorage.getItem("news");
      const savedTheme = localStorage.getItem("themeConfig");

      if (savedPlans) setPlans(JSON.parse(savedPlans));
      if (savedAccessories) setAccessories(JSON.parse(savedAccessories));
      if (savedNews) setNews(JSON.parse(savedNews));
      if (savedTheme) setThemeConfig(JSON.parse(savedTheme));
    };

    loadData();
  }, []);

  // Salvar dados
  const saveAll = () => {
    localStorage.setItem("plans", JSON.stringify(plans));
    localStorage.setItem("accessories", JSON.stringify(accessories));
    localStorage.setItem("news", JSON.stringify(news));
    localStorage.setItem("themeConfig", JSON.stringify(themeConfig));

    toast({
      title: "Tudo salvo!",
      description: "Todas as configurações foram armazenadas com sucesso!"
    });
  };

  // Handlers genéricos
  const createHandler = <T extends { id: string }>(
    state: T[],
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    newItem: Omit<T, 'id'>
  ) => {
    const item = { ...newItem, id: Date.now().toString() } as T;
    setState([...state, item]);
  };

  const deleteHandler = <T extends { id: string }>(
    state: T[],
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    id: string
  ) => {
    setState(state.filter(item => item.id !== id));
  };

  // Seção de Planos
  const PlansSection = () => (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Adicionar Novo Plano</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome do Plano"
            value={newPlan.title}
            onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            value={newPlan.price}
            onChange={(e) => setNewPlan({...newPlan, price: Number(e.target.value)})}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Descrição"
            value={newPlan.description}
            onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
            className="p-2 border rounded col-span-2"
          />
          <div className="col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newPlan.isPopular}
                onChange={(e) => setNewPlan({...newPlan, isPopular: e.target.checked})}
              />
              Plano Popular
            </label>
          </div>
          <Button
            onClick={() => {
              createHandler(plans, setPlans, newPlan);
              setNewPlan({
                title: "",
                price: 0,
                description: "",
                features: [],
                isPopular: false
              });
            }}
            className="col-span-2"
          >
            <Plus className="mr-2" /> Adicionar Plano
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Planos Existentes</h2>
        <div className="grid gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p>R$ {plan.price.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => deleteHandler(plans, setPlans, plan.id)}>
                  <Trash2 className="mr-2" /> Excluir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );

  // Seção de Acessórios
  const AccessoriesSection = () => (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Adicionar Acessório</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={newAccessory.name}
            onChange={(e) => setNewAccessory({...newAccessory, name: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            value={newAccessory.price}
            onChange={(e) => setNewAccessory({...newAccessory, price: Number(e.target.value)})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={newAccessory.category}
            onChange={(e) => setNewAccessory({...newAccessory, category: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL da Imagem"
            value={newAccessory.image}
            onChange={(e) => setNewAccessory({...newAccessory, image: e.target.value})}
            className="p-2 border rounded"
          />
          <Button
            onClick={() => {
              createHandler(accessories, setAccessories, newAccessory);
              setNewAccessory({
                name: "",
                price: 0,
                category: "",
                image: "",
                stock: 0
              });
            }}
            className="col-span-2"
          >
            <Plus className="mr-2" /> Adicionar Acessório
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Acessórios Existentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessories.map((accessory) => (
            <Card key={accessory.id} className="p-4 relative">
              <img 
                src={accessory.image} 
                alt={accessory.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{accessory.name}</h3>
              <p>R$ {accessory.price.toFixed(2)}</p>
              <Button 
                variant="destructive" 
                className="mt-2 w-full"
                onClick={() => deleteHandler(accessories, setAccessories, accessory.id)}
              >
                <Trash2 className="mr-2" /> Excluir
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );

  // Seção de Notícias
  const NewsSection = () => (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Nova Notícia</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Título"
            value={newNews.title}
            onChange={(e) => setNewNews({...newNews, title: e.target.value})}
            className="p-2 border rounded col-span-2"
          />
          <input
            type="date"
            value={newNews.date}
            onChange={(e) => setNewNews({...newNews, date: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL da Imagem"
            value={newNews.image}
            onChange={(e) => setNewNews({...newNews, image: e.target.value})}
            className="p-2 border rounded"
          />
          <div className="col-span-2">
            <textarea
              placeholder="Conteúdo"
              value={newNews.content}
              onChange={(e) => setNewNews({...newNews, content: e.target.value})}
              className="p-2 border rounded w-full h-32"
            />
          </div>
          <label className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={newNews.isFeatured}
              onChange={(e) => setNewNews({...newNews, isFeatured: e.target.checked})}
            />
            Destaque
          </label>
          <Button
            onClick={() => {
              createHandler(news, setNews, newNews);
              setNewNews({
                title: "",
                content: "",
                date: new Date().toISOString().split('T')[0],
                image: "",
                isFeatured: false
              });
            }}
            className="col-span-2"
          >
            <Plus className="mr-2" /> Publicar Notícia
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Notícias Publicadas</h2>
        <div className="grid gap-4">
          {news.map((item) => (
            <Card key={item.id} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>{new Date(item.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => deleteHandler(news, setNews, item.id)}>
                  <Trash2 className="mr-2" /> Excluir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );

  // Seção de Tema
  const ThemeSection = () => (
    <Card className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(themeConfig).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 capitalize">{key.replace('Color', '')}</label>
            <input
              type="color"
              value={value}
              onChange={(e) => setThemeConfig({...themeConfig, [key]: e.target.value})}
              className="w-full h-12 cursor-pointer"
            />
            <span className="text-sm mt-1 block">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: themeConfig.textColor }}>
            Painel Administrativo
          </h1>
          <Button onClick={saveAll} className="gap-2">
            <Save size={18} /> Salvar Tudo
          </Button>
        </div>

        <Tabs defaultValue="plans">
          <TabsList className="w-full flex-wrap h-auto">
            <TabsTrigger value="plans" className="flex-1 mb-2">
              <Plug className="mr-2" /> Planos
            </TabsTrigger>
            <TabsTrigger value="accessories" className="flex-1 mb-2">
              <Box className="mr-2" /> Acessórios
            </TabsTrigger>
            <TabsTrigger value="news" className="flex-1 mb-2">
              <Newspaper className="mr-2" /> Notícias
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1 mb-2">
              <Palette className="mr-2" /> Tema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <PlansSection />
          </TabsContent>

          <TabsContent value="accessories">
            <AccessoriesSection />
          </TabsContent>

          <TabsContent value="news">
            <NewsSection />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
