import { Json } from "@/integrations/supabase/types";

export interface WelcomeMessages {
  greeting: string;
  brandName: string;
  tagline: string;
}

export interface MenuLabels {
  plans: string;
  accessories: string;
  news: string;
  brand: string;
  share: string;
}

export interface NavbarSettings {
  whatsappNumber: string;
  whatsappLink: string;
  instagramUser: string;
  facebookUser: string;
  welcomeMessages: WelcomeMessages;
  menuLabels: MenuLabels;
}

export interface SupabaseNavbarSettings {
  id: string;
  settings: Json;
  created_at?: string;
  updated_at?: string;
}

export const supabaseNavbarToSettings = (data: SupabaseNavbarSettings): NavbarSettings => {
  const settings = data.settings as unknown as NavbarSettings;
  return settings;
};

export const settingsToSupabaseNavbar = (settings: NavbarSettings): Partial<SupabaseNavbarSettings> => ({
  settings: settings as unknown as Json
});