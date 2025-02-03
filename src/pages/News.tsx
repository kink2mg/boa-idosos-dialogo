import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const News = () => {
  const news = [
    // ... (array de notícias mantido igual)
  ];

  const handleShare = (article: { id: number; title: string }) => {
    const shareUrl = `${window.location.origin}/news/${article.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `Confira esta notícia: ${article.title}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copiado para a área de transferência!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white">
              <div className="flex flex-col md:flex-row">
                {/* ... (conteúdo do card mantido igual) */}
                
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  {/* ... (cabeçalho e conteúdo mantidos iguais) */}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Link to={`/news/${article.id}`}>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                      >
                        Ver mais <FaArrowRight />
                      </Button>
                    </Link>
                    
                    <Button 
                      onClick={() => handleShare(article)}
                      variant="ghost"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaShareAlt />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
