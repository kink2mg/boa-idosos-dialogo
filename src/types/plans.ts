import { Json } from "@/integrations/supabase/types";

export interface PlanFeature {
  text: string;
  info?: string;
}

export interface Plan {
  id: string;
  title: string;
  category: string;
  price: number;
  mega: number;
  features: PlanFeature[];
  salesCount?: number;
  created_at: string;
  updated_at: string;
}

export interface SupabasePlan {
  id: string;
  title: string;
  category: string;
  price: number;
  mega: number;
  features: Json;
  sales_count: number;
  created_at: string;
  updated_at: string;
}

export const supabasePlanToPlan = (plan: SupabasePlan): Plan => ({
  id: plan.id,
  title: plan.title,
  category: plan.category,
  price: plan.price,
  mega: plan.mega,
  features: plan.features as unknown as PlanFeature[],
  salesCount: plan.sales_count,
  created_at: plan.created_at,
  updated_at: plan.updated_at
});