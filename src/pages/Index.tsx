import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Database } from "@/integrations/supabase/types";

type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
type Plan = Database['public']['Tables']['plans']['Row'];
type PlanFeature = {
  text: string;
  info?: string;
};

const Index = () => {
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as SiteSettings;
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
      return data as Plan[];
    }
  });

  const contactInfo = settings?.contact_info as { 
    whatsapp: string; 
    whatsapp_message: string;
  } | null;

  const themeColors = settings?.theme_colors as {
    background: string;
    container: string;
    primary: string;
  } | null;

  const whatsappNumber = contactInfo?.whatsapp || "5538998622897";
  const whatsappMessage = contactInfo?.whatsapp_message || "Olá! Gostaria de suporte.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const defaultColors = {
    background: "#ffffff",
    container: "#f3f4f6",
    primary: "#ea580c"
  };

  const colors = themeColors || defaultColors;

  const transformFeatures = (features: any[]): PlanFeature[] => {
    return features?.map(feature => ({
      text: feature.title || feature.text,
      info: feature.info
    })) || [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: colors.background }}>
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
      style={{ background: colors.background }}
    >
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
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
              features={transformFeatures(plan.features as any[])}
              image={plan.image_url}
              isPopular={plan.is_popular}
              salesCount={plan.sales_count}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName={`bg-[${colors.primary}] hover:bg-[${colors.primary}]/90 text-white`}
              salesText={plan.sales_count && plan.sales_count >= 1000 ? 
                `${(plan.sales_count/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                plan.sales_count ? `${plan.sales_count} vendas` : undefined}
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
              background: colors.primary,
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