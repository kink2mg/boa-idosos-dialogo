import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlansTab } from "@/components/admin/tabs/PlansTab";
import { AccessoriesTab } from "@/components/admin/tabs/AccessoriesTab";
import NewsForm from "@/components/admin/NewsForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);

  const handleAddNews = (newNews: Omit<NewsItem, "id">) => {
    const newsItem = { ...newNews, id: news.length + 1 };
    setNews([...news, newsItem]);
    setShowNewsForm(false);
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
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

        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <PlansTab />
          </TabsContent>

          <TabsContent value="accessories">
            <AccessoriesTab />
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
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleDeleteNews(item.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
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