import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const plans = [
    {
      title: "NET FAMÍLIA",
      category: "Plano Premium",
      price: 50.99,
      mega: 50,
      sales: 1200,
      features: [
        { text: "Passaporte Américas para usar seu celular no exterior" },
        { text: "GB para redes sociais e vídeos" },
        { text: "WhatsApp ilimitado" },
        { text: "Internet de uso livre" }
      ]
    },
    {
      title: "NET CONTROLE",
      category: "Plano Essencial",
      price: 100.99,
      mega: 100,
      sales: 800,
      features: [
        { text: "5G mais rápido do Brasil" },
        { text: "Ligações ilimitadas" },
        { text: "YouTube ilimitado" },
        { text: "+2GB bônus todo mês" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              className="bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName="bg-orange-500 hover:bg-orange-600 text-white"
              salesText={plan.sales >= 1000 ? 
                `${(plan.sales/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                `${plan.sales} vendas`}
              salesCount={plan.sales}
            />
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <a 
          href={`https://wa.me/5538998622897?text=${encodeURIComponent("Olá! Gostaria de suporte.")}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-8 h-8" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;