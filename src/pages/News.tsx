import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const News = () => {
  const news = [
    {
      id: 1,
      title: "Nova Tecnologia 5G Revoluciona Conectividade",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=500",
      content: "A tecnologia 5G está transformando a maneira como nos conectamos, oferecendo velocidades até 100 vezes mais rápidas que o 4G..."
    },
    {
      id: 2,
      title: "Avanços em Inteligência Artificial",
      date: "2024-03-19",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500",
      content: "Pesquisadores desenvolvem novos algoritmos de IA que prometem revolucionar diversos setores da indústria..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Notícias</h1>
        
        <div className="space-y-6">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-4">
                  <CardHeader>
                    <h2 className="text-2xl font-bold">{article.title}</h2>
                    <p className="text-gray-500">
                      {new Date(article.date).toLocaleDateString('pt-BR')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{article.content}</p>
                  </CardContent>
                  <div className="mt-4">
                    <Button 
                      variant="ghost" 
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Ver mais
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
