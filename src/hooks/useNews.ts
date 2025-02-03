import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setIsLoading(false);
    }
  };

  const addNews = async (newNews: Omit<NewsItem, "id">) => {
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
      return formattedNews;
    } catch (error) {
      console.error("Error adding news:", error);
      throw error;
    }
  };

  return {
    news,
    addNews,
    isLoading
  };
};