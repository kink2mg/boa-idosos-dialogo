import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface PlanProps {
  title: string;
  category: string;
  price: number;
  features: PlanFeature[];
  gb?: number;
  image?: string;
}

const PlanCard = ({ title, category, price, features, gb, image }: PlanProps) => {
  return (
    <Card className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{category}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        
        {image && (
          <div className="mb-4">
            <img src={image} alt={title} className="w-full rounded-lg" />
          </div>
        )}
        
        {gb && (
          <div className="text-primary text-4xl font-bold mb-4">
            {gb}GB
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
            <span className="text-3xl font-bold text-primary">R$ {price.toFixed(2)}</span>
            <span className="text-gray-500 ml-2">/mês</span>
          </div>
        </div>
        
        <Button className="w-full bg-secondary text-black hover:bg-yellow-400">
          Contrate
        </Button>
      </div>
    </Card>
  );
};

export default PlanCard;