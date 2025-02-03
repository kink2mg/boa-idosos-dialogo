import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const News = () => {
  const news = [
    {
      id: 1,
      title: "Nova Tecnologia 5G Revoluciona Conectividade",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
      content: "A tecnologia 5G está transformando a maneira como nos conectamos, oferecendo velocidades até 100 vezes mais rápidas que o 4G..."
    },
    {
      id: 2,
      title: "Avanços em Inteligência Artificial",
      date: "2024-03-19",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
      content: "Pesquisadores desenvolvem novos algoritmos de IA que prometem revolucionar diversos setores da indústria..."
    }
  ];

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
      </main>
    </div>
  );
};

export default News;
