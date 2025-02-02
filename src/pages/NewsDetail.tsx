import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NewsDetail = () => {
  const { id } = useParams();
  // For now, we'll use static data. In a real app, this would come from your data storage
  const news = [
    {
      id: 1,
      title: "Nova Tecnologia 5G Revoluciona Conectividade",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
      content: "A tecnologia 5G está transformando a maneira como nos conectamos, oferecendo velocidades até 100 vezes mais rápidas que o 4G. Esta revolução na conectividade promete transformar diversos setores, desde a medicina até o entretenimento. Com baixa latência e alta capacidade de transmissão de dados, o 5G permite aplicações em tempo real que antes eram impossíveis. Especialistas preveem que esta tecnologia será fundamental para o desenvolvimento de cidades inteligentes e da Internet das Coisas (IoT)."
    },
    {
      id: 2,
      title: "Avanços em Inteligência Artificial",
      date: "2024-03-19",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
      content: "Pesquisadores desenvolvem novos algoritmos de IA que prometem revolucionar diversos setores da indústria. Os avanços recentes em aprendizado de máquina e processamento de linguagem natural estão abrindo novas possibilidades para automação e análise de dados. Empresas de todo o mundo já começam a implementar estas soluções para melhorar seus processos e serviços."
    }
  ];

  const article = news.find(n => n.id === Number(id));

  if (!article) {
    return <div>Notícia não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <p className="text-gray-500 mb-6">
              {new Date(article.date).toLocaleDateString('pt-BR')}
            </p>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {article.content}
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default NewsDetail;