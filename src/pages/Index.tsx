import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type SiteSettings, type SupabaseSiteSettings, supabaseSettingsToSettings } from "@/types/site-settings";
import { type Plan, supabasePlanToPlan } from "@/types/plans";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from("plans")
          .select("*")
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedPlans = data.map((plan) => supabasePlanToPlan(plan));
          setPlans(formattedPlans);
        }
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os planos. Tente novamente mais tarde."
        });
      }
    };

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const transformedData = supabaseSettingsToSettings(data as SupabaseSiteSettings);
          setSettings(transformedData);
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    fetchPlans();
  }, [toast]);

  const style = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.background,
    color: settings.theme_colors.text
  } : {};

  const containerStyle = settings?.theme_colors ? {
    backgroundColor: settings.theme_colors.container
  } : {};

  return (
    <div className="min-h-screen" style={style}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12" style={containerStyle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {loading ? (
            <>
              <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
              <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
            </>
          ) : plans.length > 0 ? (
            plans.map((plan) => (
              <PlanCard
                key={plan.id}
                {...plan}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                buttonClassName={`bg-[${settings?.theme_colors.buttons}] hover:bg-opacity-90 text-white`}
                salesText={plan.sales_count >= 1000 ? 
                  `${(plan.sales_count/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                  `${plan.sales_count} vendas`}
                sales_count={plan.sales_count}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">Nenhum plano encontrado.</p>
            </div>
          )}
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