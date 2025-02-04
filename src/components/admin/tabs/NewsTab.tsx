import { useState } from "react";
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
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Nova Cobertura de Fibra Óptica",
      content: "Estamos expandindo nossa rede de fibra óptica para mais bairros da cidade. Agora os moradores poderão desfrutar de internet ultra rápida.",
      date: new Date().toISOString(),
      image: "https://exemplo.com/fibra.jpg",
      category: "Infraestrutura",
      sendNotification: false
    },
    {
      id: "2",
      title: "Promoção de Natal",
      content: "Aproveite as ofertas especiais de Natal com descontos incríveis em todos os planos de internet.",
      date: new Date().toISOString(),
      image: "https://exemplo.com/natal.jpg",
      category: "Promoções",
      sendNotification: true
    },
    {
      id: "3",
      title: "Novo Plano Empresarial",
      content: "Lançamos um novo plano dedicado para empresas com necessidades específicas de conexão.",
      date: new Date().toISOString(),
      image: "https://exemplo.com/empresa.jpg",
      category: "Produtos",
      sendNotification: false
    },
    {
      id: "4",
      title: "Manutenção Programada",
      content: "Informamos que haverá manutenção programada na rede para melhorias no serviço.",
      date: new Date().toISOString(),
      image: "https://exemplo.com/manutencao.jpg",
      category: "Avisos",
      sendNotification: true
    },
    {
      id: "5",
      title: "Novo Centro de Atendimento",
      content: "Inauguramos um novo centro de atendimento para melhor servir nossos clientes.",
      date: new Date().toISOString(),
      image: "https://exemplo.com/atendimento.jpg",
      category: "Institucional",
      sendNotification: false
    }
  ]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const handleAddNews = async (newNews: Omit<NewsItem, "id">) => {
    try {
      const id = (news.length + 1).toString();
      const newsItem = { ...newNews, id };
      setNews([newsItem, ...news]);
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
