import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  category: string;
}

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedNews: NewsItem[] = data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        date: new Date(item.created_at).toISOString().split('T')[0],
        image: item.image_url || '',
        videoUrl: item.video_url,
        category: item.category || ''
      }));

      setNews(formattedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as notícias.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNews = async (newNews: Omit<NewsItem, "id" | "date">) => {
    try {
      const { data, error } = await supabase
        .from("news")
        .insert([{
          title: newNews.title,
          content: newNews.content,
          image_url: newNews.image,
          video_url: newNews.videoUrl,
          category: newNews.category
        }])
        .select()
        .single();

      if (error) throw error;

      const formattedNews: NewsItem = {
        id: data.id,
        title: data.title,
        content: data.content,
        date: new Date(data.created_at).toISOString().split('T')[0],
        image: data.image_url || '',
        videoUrl: data.video_url,
        category: data.category || ''
      };

      setNews([formattedNews, ...news]);
      toast({
        title: "Sucesso",
        description: "Notícia adicionada com sucesso!",
      });
      return formattedNews;
    } catch (error) {
      console.error("Error adding news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a notícia.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateNews = async (updatedNews: NewsItem) => {
    try {
      const { error } = await supabase
        .from("news")
        .update({
          title: updatedNews.title,
          content: updatedNews.content,
          image_url: updatedNews.image,
          video_url: updatedNews.videoUrl,
          category: updatedNews.category
        })
        .eq("id", updatedNews.id);

      if (error) throw error;

      setNews(news.map(item => 
        item.id === updatedNews.id ? updatedNews : item
      ));
      
      toast({
        title: "Sucesso",
        description: "Notícia atualizada com sucesso!",
      });
    } catch (error) {
      console.error("Error updating news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a notícia.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNews(news.filter(item => item.id !== id));
      toast({
        title: "Sucesso",
        description: "Notícia removida com sucesso!",
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a notícia.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    news,
    addNews,
    updateNews,
    deleteNews,
    isLoading
  };
};