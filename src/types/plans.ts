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
  image_url?: string;
  is_popular: boolean;
  sales_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupabasePlan {
  id: string;
  title: string;
  category: string;
  price: number;
  mega: number;
  features: Json;
  image_url?: string;
  is_popular: boolean;
  sales_count: number;
  created_at?: string;
  updated_at?: string;
}

export const supabasePlanToPlan = (plan: SupabasePlan): Plan => ({
  ...plan,
  features: plan.features as unknown as PlanFeature[]
});

export const planToSupabasePlan = (plan: Plan): Omit<SupabasePlan, 'id' | 'created_at' | 'updated_at'> => ({
  title: plan.title,
  category: plan.category,
  price: plan.price,
  mega: plan.mega,
  features: plan.features as unknown as Json,
  image_url: plan.image_url,
  is_popular: plan.is_popular,
  sales_count: plan.sales_count
});