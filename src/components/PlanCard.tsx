import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import { usePlanFormatter } from "@/hooks/usePlanFormatter";
import LoadingSkeleton from "./LoadingSkeleton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type SiteSettings } from "@/types/site-settings";

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
  image?: string;
  isPopular?: boolean;
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
  image,
  isPopular = false,
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
        .single();

      if (!error && data) {
        setSettings(data as SiteSettings);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const buttonClasses = {
    default: 'bg-primary hover:bg-primary/90',
    orange: 'bg-orange-500 hover:bg-orange-600',
    premium: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
  };

  const whatsappNumber = settings?.contact_info?.whatsapp || "5538998622897";
  const whatsappMessage = `Olá! Gostaria de contratar o plano ${title} de ${mega} Mega por ${formatPrice(price)}/mês.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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
            {isPopular && (
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>

          {image && (
            <div className="mb-4 relative">
              <img
                src={image}
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
                  {feature.info && (
                    <Info className="w-4 h-4 ml-2 text-gray-400 inline-block cursor-help" />
                  )}
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
                className={`w-full text-white ${buttonClasses[buttonVariant]} ${buttonClassName}`}
                style={{ 
                  backgroundColor: settings?.theme_colors?.buttons || '#ea580c',
                  color: '#ffffff'
                }}
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