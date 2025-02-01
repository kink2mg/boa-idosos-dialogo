import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const plans = [
    // ... (planos mantidos igual)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <p className="text-orange-600 font-semibold text-lg mb-4">
            Escolha o melhor para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              isPopular={index === 0}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              buttonClassName="bg-orange-600 hover:bg-orange-700 text-white"
              salesText={plan.sales >= 1000 ? 
                `${(plan.sales/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                `${plan.sales} vendas`}
            />
          ))}
        </div>
      </main>

      {/* ... (restante do código igual) */}
    </div>
  );
};

export default Index;
