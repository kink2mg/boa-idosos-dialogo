import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import { usePlanFormatter } from "@/hooks/usePlanFormatter";
import LoadingSkeleton from "./LoadingSkeleton";

type PlanFeature = {
  text: string;
  info?: string;
};

type PlanProps = {
  title: string;
  category: string;
  price: number;
  features: PlanFeature[];
  gb?: number;
  image?: string;
  isPopular?: boolean;
  salesCount?: number;
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
  gb,
  image,
  isPopular = false,
  salesCount,
  isLoading = false,
  buttonVariant = 'default',
  className,
  buttonClassName,
  salesText
}: PlanProps) => {
  const { formatPrice, formatSales } = usePlanFormatter();

  const buttonClasses = {
    default: 'bg-primary hover:bg-primary-dark',
    orange: 'bg-orange-500 hover:bg-orange-600',
    premium: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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

          {gb && (
            <div className="text-primary text-4xl font-bold mb-4">
              {gb}GB
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
            <Button 
              className={`w-full text-white ${buttonClasses[buttonVariant]}`}
              aria-label={`Contratar plano ${title}`}
            >
              Contrate Agora
            </Button>
            
            {salesCount && (
              <div className="text-center text-sm text-gray-500">
                {formatSales(salesCount)} na última semana
              </div>
            )}
          </div>

          {isPopular && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center text-sm text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span>30 dias de garantia</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanCard;