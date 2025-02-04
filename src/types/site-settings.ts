import { Json } from "@/integrations/supabase/types";

export interface ThemeColors {
  text: string;
  buttons: string;
  primary: string;
  container: string;
  background: string;
  orangeButtons: string;
  logo: string;
}

export interface ContactInfo {
  sales_number: string;
  support_number: string;
  sales_message: string;
  support_message: string;
}

export interface SiteSettings {
  theme_colors: ThemeColors;
  contact_info: ContactInfo;
}

export interface SupabaseSiteSettings {
  id: string;
  theme_colors: Json;
  contact_info: Json;
  created_at?: string;
  updated_at?: string;
}

export const supabaseSettingsToSettings = (data: SupabaseSiteSettings): SiteSettings => ({
  theme_colors: data.theme_colors as ThemeColors,
  contact_info: data.contact_info as ContactInfo
});

export const settingsToSupabaseSettings = (settings: SiteSettings): Partial<SupabaseSiteSettings> => ({
  theme_colors: settings.theme_colors as Json,
  contact_info: settings.contact_info as Json
});