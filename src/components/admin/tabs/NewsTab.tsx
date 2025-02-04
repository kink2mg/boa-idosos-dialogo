
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import NewsForm from "@/components/admin/NewsForm";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
  sendNotification: boolean;
}

export const NewsTab = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      try {
        setNews(JSON.parse(storedNews));
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
    console.log("Notícias salvas no localStorage:", news);
  }, [news]);

  const handleAddNews = async (newNews: Omit<NewsItem, "id">) => {
    try {
      const id = Date.now().toString();
      const newsItem = { ...newNews, id };
      const updatedNews = [newsItem, ...news];
      setNews(updatedNews);
      setShowNewsForm(false);
      toast({
        title: "Sucesso",
        description: "Notícia adicionada com sucesso!"
      });
    } catch (error) {
      console.error("Error adding news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a notícia.",
        variant: "destructive",
      });
    }
  };

  const handleEditNews = async (updatedNews: NewsItem) => {
    try {
      setNews(news.map(item => (item.id === updatedNews.id ? updatedNews : item)));
      setEditingNews(null);
      toast({
        title: "Sucesso",
        description: "Notícia atualizada com sucesso!"
      });
    } catch (error) {
      console.error("Error updating news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a notícia.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      setNews(news.filter(item => item.id !== id));
      toast({
        title: "Sucesso",
        description: "Notícia removida com sucesso!"
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a notícia.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => {
        setEditingNews(null);
        setShowNewsForm(!showNewsForm);
      }}>
        {showNewsForm ? "Cancelar" : "Adicionar Nova Notícia"}
      </Button>

      {(showNewsForm || editingNews) && (
        <Card className="p-6">
          <NewsForm 
            onSubmit={editingNews ? handleEditNews : handleAddNews}
            initialData={editingNews}
          />
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
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setEditingNews({...item, sendNotification: false})}
                >
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
  );
};
