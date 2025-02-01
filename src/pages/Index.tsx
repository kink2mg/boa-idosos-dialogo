import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const plans = [
    {
      name: "Básico",
      title: "NET PÓS",
      category: "Plano",
      price: 119.90,
      mega: 50000,
      features: [
        { text: "Suporte 24h" },
        { text: "Instalação Inclusa" },
        { text: "IP Fixo" },
        { text: "TV HD Inclusa" },
        { text: "WhatsApp ilimitado" }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
    },
    {
      name: "Intermediário",
      title: "NET CONTROLE",
      category: "Plano",
      price: 54.90,
      mega: 25000,
      features: [
        { text: "Suporte 24h" },
        { text: "Instalação Inclusa" },
        { text: "IP Fixo" },
        { text: "TV HD Inclusa" },
        { text: "5G mais rápido do Brasil" },
        { text: "Ligações ilimitadas" }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index}
              {...plan}
              // Garanta que o componente PlanCard está preparado para receber as novas props
              planName={plan.name}
              mega={plan.mega}
            />
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-4 right-4">
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
