export interface ThemeColors {
  text: string;
  primary: string;
  secondary: string;
  tertiary: string;
  darkPurple: string;
  background: string;
  softGreen: string;
  softYellow: string;
  softPurple: string;
  softBlue: string;
  vividPurple: string;
  brightOrange: string;
}

export interface ContactInfo {
  logo_text: string;
  share_message: string;
  sales_number: string;
  support_number: string;
  sales_message: string;
  support_message: string;
}

export interface SiteSettings {
  theme_colors: ThemeColors;
  contact_info: ContactInfo;
  created_at: string;
  updated_at: string;
}

export const defaultSettings: SiteSettings = {
  theme_colors: {
    text: "#333333",
    primary: "#9b87f5",
    secondary: "#7E69AB",
    tertiary: "#6E59A5",
    darkPurple: "#1A1F2C",
    background: "#FFFFFF",
    softGreen: "#F2FCE2",
    softYellow: "#FEF7CD",
    softPurple: "#E5DEFF",
    softBlue: "#D3E4FD",
    vividPurple: "#8B5CF6",
    brightOrange: "#F97316"
  },
  contact_info: {
    logo_text: "Net",
    share_message: "Compartilhe nosso site",
    sales_number: "5511999999999",
    support_number: "5511999999999",
    sales_message: "Olá! Gostaria de saber mais sobre os planos.",
    support_message: "Olá! Preciso de suporte."
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};