
import { Plan } from "@/types/plans";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";

interface PlanListProps {
  plans: Plan[];
  selectedPlan: Plan | null;
  onSelectPlan: (plan: Plan) => void;
  onDeletePlan: (id: string) => void;
}

const PlanList = ({ plans, selectedPlan, onSelectPlan, onDeletePlan }: PlanListProps) => {
  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`p-4 cursor-pointer ${
            selectedPlan?.id === plan.id ? "border-primary" : ""
          }`}
          onClick={() => onSelectPlan(plan)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{plan.title}</h4>
              <p className="text-sm text-gray-500">{plan.category}</p>
              <p className="text-sm mt-1">
                {plan.mega} Mega - R$ {plan.price.toFixed(2)}
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeletePlan(plan.id);
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PlanList;
