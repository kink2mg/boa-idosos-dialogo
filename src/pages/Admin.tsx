import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Plan {
  id: number;
  title: string;
  category: string;
  price: number;
  mega: number;
  features: string[];
  isPopular?: boolean;
}

interface Accessory {
  id: number;
  nome: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  descricao: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: 1, 
      title: "NET PÓS", 
      category: "Para seu celular", 
      price: 119.90, 
      mega: 50,
      features: ["Passaporte Américas", "WhatsApp ilimitado"],
      isPopular: true
    },
    { 
      id: 2, 
      title: "NET CONTROLE", 
      category: "Para seu celular", 
      price: 54.90, 
      mega: 25,
      features: ["5G mais rápido", "Ligações ilimitadas"]
    }
  ]);

  const [accessories, setAccessories] = useState<Accessory[]>([
    {
      id: 1,
      nome: "MacBook Pro",
      preco: 8999.90,
      precoAntigo: 9999.90,
      imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      descricao: "MacBook Pro com processador M1, 8GB RAM"
    }
  ]);

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Nova Tecnologia 5G",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      content: "A tecnologia 5G está transformando a maneira como nos conectamos..."
    }
  ]);

  // Form states
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    title: "",
    category: "",
    price: 0,
    mega: 0,
    features: [],
    isPopular: false
  });

  const [newAccessory, setNewAccessory] = useState<Partial<Accessory>>({
    nome: "",
    preco: 0,
    descricao: ""
  });

  const [newNewsItem, setNewNewsItem] = useState<Partial<NewsItem>>({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddPlan = () => {
    if (!newPlan.title || !newPlan.category || !newPlan.price || !newPlan.mega) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setPlans(prev => [...prev, { ...newPlan as Plan, id: prev.length + 1, features: newPlan.features || [] }]);
    setNewPlan({
      title: "",
      category: "",
      price: 0,
      mega: 0,
      features: [],
      isPopular: false
    });
    toast({
      title: "Sucesso",
      description: "Plano adicionado com sucesso!"
    });
  };

  const handleAddAccessory = () => {
    if (!newAccessory.nome || !newAccessory.preco || !newAccessory.descricao) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setAccessories(prev => [...prev, { ...newAccessory as Accessory, id: prev.length + 1 }]);
    setNewAccessory({
      nome: "",
      preco: 0,
      descricao: ""
    });
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleAddNews = () => {
    if (!newNewsItem.title || !newNewsItem.content) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setNews(prev => [...prev, { ...newNewsItem as NewsItem, id: prev.length + 1 }]);
    setNewNewsItem({
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0]
    });
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adicionar Novo Plano</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newPlan.title}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      value={newPlan.category}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mega">Mega</Label>
                    <Input
                      id="mega"
                      type="number"
                      value={newPlan.mega}
                      onChange={(e) => setNewPlan(prev => ({ ...prev, mega: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                <Button onClick={handleAddPlan}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Plano
                </Button>
              </div>
            </Card>

            <div className="grid gap-4">
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
                        {plan.mega} Mega
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
          </TabsContent>

          <TabsContent value="accessories" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adicionar Novo Acessório</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={newAccessory.nome}
                      onChange={(e) => setNewAccessory(prev => ({ ...prev, nome: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço</Label>
                    <Input
                      id="preco"
                      type="number"
                      value={newAccessory.preco}
                      onChange={(e) => setNewAccessory(prev => ({ ...prev, preco: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={newAccessory.descricao}
                    onChange={(e) => setNewAccessory(prev => ({ ...prev, descricao: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddAccessory}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Acessório
                </Button>
              </div>
            </Card>

            <div className="grid gap-4">
              {accessories.map((accessory) => (
                <Card key={accessory.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{accessory.nome}</h3>
                      <p className="text-gray-500">{accessory.descricao}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-xl font-bold">
                        R$ {accessory.preco.toFixed(2)}
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
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adicionar Nova Notícia</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newsTitle">Título</Label>
                    <Input
                      id="newsTitle"
                      value={newNewsItem.title}
                      onChange={(e) => setNewNewsItem(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newsDate">Data</Label>
                    <Input
                      id="newsDate"
                      type="date"
                      value={newNewsItem.date}
                      onChange={(e) => setNewNewsItem(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsContent">Conteúdo</Label>
                  <Textarea
                    id="newsContent"
                    value={newNewsItem.content}
                    onChange={(e) => setNewNewsItem(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddNews}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Notícia
                </Button>
              </div>
            </Card>

            <div className="grid gap-4">
              {news.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
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
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;