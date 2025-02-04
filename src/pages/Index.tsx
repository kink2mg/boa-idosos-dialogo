import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Plan, supabasePlanToPlan } from "@/types/plans";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      console.log("Fetching plans from Supabase...");
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }

      console.log("Plans fetched successfully:", data);
      // Transform the data using supabasePlanToPlan helper
      const transformedPlans = data?.map(plan => supabasePlanToPlan(plan)) || [];
      setPlans(transformedPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {isLoading ? (
            <>
              <PlanCard
                title=""
                category=""
                price={0}
                features={[]}
                isLoading={true}
              />
              <PlanCard
                title=""
                category=""
                price={0}
                features={[]}
                isLoading={true}
              />
            </>
          ) : plans.length > 0 ? (
            plans.map((plan) => (
              <PlanCard 
                key={plan.id}
                title={plan.title}
                category={plan.category}
                price={plan.price}
                mega={plan.mega}
                features={plan.features}
                isPopular={plan.is_popular}
                salesCount={plan.sales_count}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                buttonClassName="bg-orange-500 hover:bg-orange-600 text-white"
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              Nenhum plano encontrado
            </div>
          )}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-bounce">
        <a 
          href={`https://wa.me/5538998622897?text=${encodeURIComponent("Olá! Gostaria de suporte.")}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-7 h-7" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;