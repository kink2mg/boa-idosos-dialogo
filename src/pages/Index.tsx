import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const Index = () => {
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('price', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const whatsappNumber = settings?.contact_info?.whatsapp || "5538998622897";
  const whatsappMessage = settings?.contact_info?.whatsapp_message || "Olá! Gostaria de suporte.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const themeColors = settings?.theme_colors || {
    background: "#ffffff",
    container: "#f3f4f6",
    primary: "#ea580c"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: themeColors.background }}>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ background: themeColors.background }}
    >
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: themeColors.primary }}>
            Nossos Planos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para você e aproveite a melhor internet da região
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans?.map((plan) => (
            <PlanCard 
              key={plan.id} 
              title={plan.title}
              category={plan.category}
              price={plan.price}
              mega={plan.mega}
              features={plan.features || []}
              image={plan.image_url}
              isPopular={plan.is_popular}
              salesCount={plan.sales_count}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName={`bg-[${themeColors.primary}] hover:bg-[${themeColors.primary}]/90 text-white`}
              salesText={plan.sales_count >= 1000 ? 
                `${(plan.sales_count/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                `${plan.sales_count} vendas`}
            />
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <a 
          href={whatsappUrl}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            style={{ 
              background: themeColors.primary,
              color: "#ffffff"
            }}
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;