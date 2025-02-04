import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type SiteSettings, type SupabaseSiteSettings, supabaseSettingsToSettings } from "@/types/site-settings";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          // Insert default settings if none exist
          const defaultSettings = {
            theme_colors: {
              text: "#000000",
              buttons: "#DC2626",
              primary: "#DC2626",
              container: "#FFFFFF",
              background: "#F3F4F6",
              orangeButtons: "#F97316",
              logo: "#F97316"
            },
            contact_info: {
              sales_number: "5538998622897",
              support_number: "5538998622897",
              sales_message: "Olá! Gostaria de contratar o",
              support_message: "Olá! Gostaria de suporte."
            }
          };

          const { data: newSettings, error: insertError } = await supabase
            .from("site_settings")
            .insert([defaultSettings])
            .select()
            .single();

          if (insertError) throw insertError;
          
          if (newSettings) {
            const transformedData = supabaseSettingsToSettings(newSettings as SupabaseSiteSettings);
            setSettings(transformedData);
          }
        } else {
          const transformedData = supabaseSettingsToSettings(data as SupabaseSiteSettings);
          setSettings(transformedData);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as configurações do site.",
          variant: "destructive",
        });
      }
    };

    fetchSettings();
  }, [toast]);

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

  const style = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.background,
    color: settings.theme_colors.text,
  } : {};

  const containerStyle = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.container,
  } : {};

  return (
    <div className="min-h-screen" style={style}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12" style={containerStyle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName={`bg-[${settings?.theme_colors.buttons}] hover:bg-opacity-90 text-white`}
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
          href={`https://wa.me/${settings?.contact_info.support_number}?text=${encodeURIComponent(settings?.contact_info.support_message || "")}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            style={{ backgroundColor: settings?.theme_colors.buttons }}
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;