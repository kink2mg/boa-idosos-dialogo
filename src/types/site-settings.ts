import { Json } from "@/integrations/supabase/types";

export interface ThemeColors {
  text: string;
  buttons: string;
  primary: string;
  container: string;
  background: string;
}

export interface ContactInfo {
  logo_url: string;
  whatsapp: string;
  share_text: string;
  whatsapp_message: string;
}

export interface SiteSettings {
  id: string;
  theme_colors: ThemeColors;
  contact_info: ContactInfo;
  created_at: string;
  updated_at: string;
}

export interface SupabaseSiteSettings {
  id: string;
  theme_colors: Json;
  contact_info: Json;
  created_at: string;
  updated_at: string;
}

export const supabaseSettingsToSettings = (settings: SupabaseSiteSettings): SiteSettings => ({
  ...settings,
  theme_colors: settings.theme_colors as ThemeColors,
  contact_info: settings.contact_info as ContactInfo
});

export const settingsToSupabaseSettings = (settings: Partial<SiteSettings>): Partial<SupabaseSiteSettings> => ({
  ...settings,
  theme_colors: settings.theme_colors as Json,
  contact_info: settings.contact_info as Json
});