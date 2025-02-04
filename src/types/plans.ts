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
  created_at: string;
  updated_at: string;
}