import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const News = () => {
  const news = [
    // ... (mantenha seu array de notícias original)
  ];

  const handleShare = async (article: { id: number; title: string }) => {
    try {
      const shareUrl = `${window.location.origin}/news/${article.id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: `Confira esta notícia: ${article.title}`,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copiado para a área de transferência! 📋');
      } else {
        throw new Error('Navegador não suporta compartilhamento');
      }
    } catch (error) {
      const input = document.createElement('input');
      input.value = `${window.location.origin}/news/${article.id}`;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('Link copiado para a área de transferência! 📋');
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
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {article.content}
                    </p>
                  </CardContent>
                  <div className="mt-4 flex justify-between items-center gap-2">
                    <Link 
                      to={`/news/${article.id}`} 
                      className="flex-1"
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                      >
                        Ver mais <FaArrowRight />
                      </Button>
                    </Link>
                    
                    <Button 
                      onClick={() => handleShare(article)}
                      variant="ghost"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      aria-label="Compartilhar notícia"
                    >
                      <FaShareAlt className="text-lg" />
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
