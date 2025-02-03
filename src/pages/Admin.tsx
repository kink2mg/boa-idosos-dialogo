import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarConfig from "@/components/admin/NavbarConfig";
import PlansConfig from "@/components/admin/PlansConfig";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { useToast } from "@/hooks/use-toast";

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
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  const handleAddAccessory = (newAccessory: Omit<Accessory, "id">) => {
    const accessory = { ...newAccessory, id: accessories.length + 1 };
    setAccessories([...accessories, accessory]);
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleAddNews = (newNews: Omit<NewsItem, "id">) => {
    const newsItem = { ...newNews, id: news.length + 1 };
    setNews([...news, newsItem]);
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SiteSettingsForm />
          </TabsContent>

          <TabsContent value="navbar">
            <NavbarConfig />
          </TabsContent>

          <TabsContent value="plans">
            <PlansConfig />
          </TabsContent>

          <TabsContent value="accessories">
            <AccessoryForm onSubmit={handleAddAccessory} />
          </TabsContent>

          <TabsContent value="news">
            <NewsForm onSubmit={handleAddNews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;