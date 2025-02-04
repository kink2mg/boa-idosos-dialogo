
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  category: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    console.log("Carregando notícias do localStorage:", storedNews);
    if (storedNews) {
      try {
        const parsedNews = JSON.parse(storedNews);
        console.log("Notícias parseadas:", parsedNews);
        setNews(parsedNews);
      } catch (error) {
        console.error("Erro ao parsear notícias:", error);
      }
    } else {
      console.log("Nenhuma notícia encontrada no localStorage");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        {news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((article) => (
              <Card key={article.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-48 md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                    />
                  </div>
                  
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <CardHeader>
                      <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(article.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-orange-600 text-sm font-medium">
                        {article.category}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {article.content}
                      </p>
                    </CardContent>
                    <div className="mt-4">
                      <Link to={`/news/${article.id}`}>
                        <Button 
                          variant="ghost" 
                          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                        >
                          Ver mais <FaArrowRight />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              Nenhuma notícia cadastrada ainda
            </h2>
            <p className="text-gray-500 mt-2">
              As notícias serão exibidas aqui após serem adicionadas pelo painel administrativo
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
