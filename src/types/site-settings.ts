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
  id: settings.id,
  theme_colors: settings.theme_colors as unknown as ThemeColors,
  contact_info: settings.contact_info as unknown as ContactInfo,
  created_at: settings.created_at,
  updated_at: settings.updated_at
});

export const settingsToSupabaseSettings = (settings: Partial<SiteSettings>): Partial<SupabaseSiteSettings> => ({
  id: settings.id,
  theme_colors: settings.theme_colors as unknown as Json,
  contact_info: settings.contact_info as unknown as Json,
  created_at: settings.created_at,
  updated_at: settings.updated_at
});