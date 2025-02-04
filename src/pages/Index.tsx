
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Fetch plans from localStorage
    const storedPlans = localStorage.getItem('plans');
    console.log('Stored plans in Index:', storedPlans); // Debug log
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans);
        console.log('Parsed plans in Index:', parsedPlans); // Debug log
        setPlans(parsedPlans);
      } catch (error) {
        console.error('Error parsing plans:', error);
      }
    }
  }, []);

  // Fallback plans if no plans are found in localStorage
  const defaultPlans = [
    {
      title: "NET PÓS",
      category: "Plano Premium",
      price: 119.90,
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
      price: 54.90,
      mega: 25,
      sales: 800,
      features: [
        { text: "5G mais rápido do Brasil" },
        { text: "Ligações ilimitadas" },
        { text: "YouTube ilimitado" },
        { text: "+2GB bônus todo mês" }
      ]
    }
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayPlans.map((plan, index) => (
            <PlanCard 
              key={index}
              {...plan}
              isPopular={index === 0}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName="bg-orange-500 hover:bg-orange-600 text-white"
              salesText={plan.sales >= 1000 ? 
                `${(plan.sales/1000).toFixed(1).replace('.', ',')}k vendas` : 
                `${plan.sales} vendas`}
            />
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <a 
          href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Gostaria de suporte.")}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-7 h-7" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
