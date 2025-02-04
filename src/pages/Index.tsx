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
      setPlans(JSON.parse(storedPlans));
    }
  }, []);

  const style = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.background,
    color: settings.theme_colors.text,
  } : {};

  const containerStyle = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.container,
  } : {};

  const whatsappNumber = settings?.contact_info?.support_number || "5511999999999";
  const whatsappMessage = settings?.contact_info?.support_message || "Olá! Gostaria de suporte.";

  return (
    <div className="min-h-screen" style={style}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12" style={containerStyle}>
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id}
                title={plan.title}
                category={plan.category}
                price={plan.price}
                mega={plan.mega}
                features={plan.features}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                buttonClassName={`bg-[${settings?.theme_colors?.buttons}] hover:bg-opacity-90 text-white`}
                salesCount={plan.sales_count}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Nenhum Plano cadastrado ainda<br />
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
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            style={{ backgroundColor: settings?.theme_colors?.buttons }}
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;