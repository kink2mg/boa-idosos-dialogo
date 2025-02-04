
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import PlanList from "./plans/PlanList";
import PlanEditor from "./plans/PlanEditor";
import { usePlans } from "@/hooks/usePlans";

const PlansConfig = () => {
  const {
    plans,
    loading,
    selectedPlan,
    setSelectedPlan,
    fetchPlans,
    addPlan,
    updatePlan,
    deletePlan,
  } = usePlans();

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return <div>Carregando planos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Planos</h3>
        <Button onClick={addPlan}>Adicionar Plano</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <PlanList
          plans={plans}
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          onDeletePlan={deletePlan}
        />
        
        {selectedPlan && (
          <PlanEditor
            selectedPlan={selectedPlan}
            onUpdatePlan={updatePlan}
          />
        )}
      </div>
    </div>
  );
};

export default PlansConfig;
