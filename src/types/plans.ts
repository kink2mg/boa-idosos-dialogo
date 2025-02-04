
export interface PlanFeature {
  text: string;
  info?: string;
}

export interface Plan {
  id: string;
  title: string;
  category: string;
  price: number;
  precoAntigo?: number;
  mega: number;
  features: PlanFeature[];
  imageUrl?: string;
  videoUrl?: string;
  is_popular: boolean;
  sales_count: number;
  description?: string;
  created_at: string;
  updated_at: string;
  sendNotification?: boolean;
}
