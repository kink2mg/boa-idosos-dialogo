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
  settings: NavbarSettings;
  created_at?: string;
  updated_at?: string;
}

export const supabaseNavbarToSettings = (data: SupabaseNavbarSettings): NavbarSettings => data.settings;

export const settingsToSupabaseNavbar = (settings: NavbarSettings): Partial<SupabaseNavbarSettings> => ({
  settings
});