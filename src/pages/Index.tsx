import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type SiteSettings, type SupabaseSiteSettings, supabaseSettingsToSettings } from "@/types/site-settings";
import { Plan } from "@/types/plans";

const Index = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (!error && data) {
        const transformedData = supabaseSettingsToSettings(data as SupabaseSiteSettings);
        setSettings(transformedData);
      }
    };

    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order('mega', { ascending: true });

      if (!error && data) {
        setPlans(data);
      }
    };

    fetchSettings();
    fetchPlans();
  }, []);

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
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id}
              title={plan.title}
              category={plan.category}
              price={plan.price}
              mega={plan.mega}
              features={plan.features}
              isPopular={plan.is_popular}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName={`bg-[${settings?.theme_colors.buttons}] hover:bg-opacity-90 text-white`}
              salesCount={plan.sales_count}
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