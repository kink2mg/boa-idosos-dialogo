import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Plan } from "@/types/plans";

const Index = () => {
  const [settings, setSettings] = useState<any>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    // Carregar configurações do localStorage
    const storedSettings = localStorage.getItem('site_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }

    // Carregar planos do localStorage
    const storedPlans = localStorage.getItem('plans');
    if (storedPlans) {
      const parsedPlans = JSON.parse(storedPlans);
      console.log("Planos carregados:", parsedPlans);
      setPlans(parsedPlans);
    }
  }, []);

  const whatsappNumber = settings?.contact_info?.support_number || "5511999999999";
  const whatsappMessage = settings?.contact_info?.support_message || "Olá! Gostaria de suporte.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard 
                key={plan.id || index}
                title={plan.title}
                category={plan.category}
                price={plan.price}
                gb={plan.mega}
                features={plan.features || []}
                isPopular={plan.is_popular}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                buttonClassName="bg-orange-500 hover:bg-orange-600 text-white"
                salesText={plan.sales_count >= 1000 ? 
                  `${(plan.sales_count/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                  `${plan.sales_count} vendas`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              Nenhum Plano cadastrado ainda
            </h2>
            <p className="text-gray-500 mt-2">
              Os Planos serão exibidos aqui após serem adicionados pelo painel administrativo
            </p>
          </div>
        )}
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
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