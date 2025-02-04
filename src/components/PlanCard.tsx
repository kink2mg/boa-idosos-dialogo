import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { usePlanFormatter } from "@/hooks/usePlanFormatter";
import LoadingSkeleton from "./LoadingSkeleton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type SiteSettings, type SupabaseSiteSettings, supabaseSettingsToSettings } from "@/types/site-settings";

type PlanFeature = {
  text: string;
  info?: string;
};

type PlanProps = {
  title: string;
  category: string;
  price: number;
  features: PlanFeature[];
  mega?: number;
  image_url?: string;
  is_popular?: boolean;
  sales_count?: number;
  isLoading?: boolean;
  buttonVariant?: 'default' | 'orange' | 'premium';
  className?: string;
  buttonClassName?: string;
  salesText?: string;
};

const PlanCard = ({ 
  title,
  category,
  price,
  features,
  mega,
  image_url,
  is_popular = false,
  sales_count,
  isLoading = false,
  buttonVariant = 'orange',
  className,
  buttonClassName,
  salesText
}: PlanProps) => {
  const { formatPrice, formatSales } = usePlanFormatter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const transformedData = supabaseSettingsToSettings(data as SupabaseSiteSettings);
        setSettings(transformedData);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const whatsappMessage = settings?.contact_info.sales_message 
    ? `${settings.contact_info.sales_message} plano ${title} de ${mega} Mega por ${formatPrice(price)}/mês.`
    : `Olá! Gostaria de contratar o plano ${title} de ${mega} Mega por ${formatPrice(price)}/mês.`;

  const whatsappUrl = `https://wa.me/${settings?.contact_info.sales_number}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-semibold uppercase text-orange-600 tracking-wide">
                {category}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{title}</h3>
            </div>
            {is_popular && (
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>

          {image_url && (
            <div className="mb-4 relative">
              <img
                src={image_url}
                alt={`Ilustração do plano ${title}`}
                className="w-full rounded-lg object-cover h-48"
                loading="lazy"
              />
            </div>
          )}

          {mega && (
            <div className="text-primary text-4xl font-bold mb-4">
              {mega} Mega
            </div>
          )}

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="group flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-600 relative">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Por apenas</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(price)}
              </span>
              <span className="text-gray-500 ml-2">/mês</span>
            </div>
          </div>

          <div className="space-y-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                className={`w-full text-white ${buttonClassName}`}
                style={{ backgroundColor: settings?.theme_colors.buttons }}
                aria-label={`Contratar plano ${title}`}
              >
                Contrate Agora
              </Button>
            </a>
            
            {sales_count && (
              <div className="text-center text-sm text-gray-500">
                {formatSales(sales_count)} na última semana
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanCard;