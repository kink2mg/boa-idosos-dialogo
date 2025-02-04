
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { type Plan } from "@/types/plans";

type PlanCardProps = Plan & {
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
  sales_count,
  className = "",
  buttonClassName = "",
  salesText,
}: PlanCardProps) => {
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const whatsappMessage = `Olá! Gostaria de contratar o plano ${title} de ${mega} Mega por ${formatPrice(price)}/mês.`;
  const whatsappUrl = `https://wa.me/5538998622897?text=${encodeURIComponent(whatsappMessage)}`;

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
          </div>

          {mega && (
            <div className="text-primary text-4xl font-bold mb-4">
              {mega} Mega
            </div>
          )}

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-600">{feature.text}</span>
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
                aria-label={`Contratar plano ${title}`}
              >
                Contrate Agora
              </Button>
            </a>
            
            {sales_count && (
              <div className="text-center text-sm text-gray-500">
                {salesText}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
