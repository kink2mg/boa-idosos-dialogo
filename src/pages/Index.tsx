import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const plans = [
    {
      title: "NET PÓS",
      category: "Plano Premium",
      price: 119.90,
      gb: 50,
      sales: 1200,
      features: [
        { text: "Roaming nas Américas incluído" },
        { text: "Bônus de 15GB para streaming" },
        { text: "Ligações internacionais ilimitadas" },
        { text: "Wi-Fi hotspots em todo país" },
        { text: "5G Ultra Velocidade" }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
    },
    {
      title: "NET CONTROLE",
      category: "Plano Essencial",
      price: 54.90,
      gb: 25,
      sales: 800,
      features: [
        { text: "Cobertura nacional 4G/5G" },
        { text: "WhatsApp e redes sociais ilimitados" },
        { text: "10GB extra para primeiros 3 meses" },
        { text: "Controle de gastos integrado" },
        { text: "Assistência técnica 24h" }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conecte-se ao Mundo
          </h1>
          <p className="text-lg text-gray-600 mx-auto max-w-xl">
            Internet móvel de alta velocidade com a melhor relação custo-benefício do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              isPopular={index === 0}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              buttonClassName="bg-indigo-600 hover:bg-indigo-700 text-white"
              salesText={
                <span className="text-sm font-medium text-green-600">
                  {plan.sales >= 1000 
                    ? `+${(plan.sales/1000).toFixed(1).replace('.', ',')} mil clientes` 
                    : `+${plan.sales} adesões recentes`}
                </span>
              }
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>*Todos os planos incluem proteção contra fraudes e suporte prioritário</p>
          <p className="mt-2">Garantia de satisfação ou seu dinheiro de volta em 7 dias</p>
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
          <MessageCircle className="w-7 h-7" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
