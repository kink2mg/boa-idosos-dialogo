import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ThemeColorsForm from "./ThemeColorsForm";
import ContactInfoForm from "./ContactInfoForm";
import type { SiteSettings, ThemeColors, ContactInfo, SupabaseSiteSettings } from "@/types/site-settings";
import type { Json } from "@/integrations/supabase/types";

const defaultThemeColors: ThemeColors = {
  text: "#000000",
  buttons: "#ea580c",
  primary: "#ea580c",
  container: "#f3f4f6",
  background: "#ffffff"
};

const defaultContactInfo: ContactInfo = {
  logo_url: "",
  whatsapp: "5538998622897",
  share_text: "Clique aqui",
  whatsapp_message: "Olá! Gostaria de saber mais sobre os planos."
};

const SiteSettingsForm = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        const transformedData: SiteSettings = {
          id: data.id,
          theme_colors: data.theme_colors as ThemeColors,
          contact_info: data.contact_info as ContactInfo,
        };
        setSettings(transformedData);
      } else {
        // Se não existir configurações, cria uma nova com valores padrão
        const defaultSettings = {
          theme_colors: defaultThemeColors as unknown as Json,
          contact_info: defaultContactInfo as unknown as Json,
        };

        const { data: newSettings, error: createError } = await supabase
          .from("site_settings")
          .insert([defaultSettings])
          .select()
          .single();

        if (createError) throw createError;

        if (newSettings) {
          setSettings({
            id: newSettings.id,
            theme_colors: newSettings.theme_colors as ThemeColors,
            contact_info: newSettings.contact_info as ContactInfo,
          });
        }
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as configurações do site.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings?.id) return;

    try {
      const updateData = {
        theme_colors: settings.theme_colors as unknown as Json,
        contact_info: settings.contact_info as unknown as Json,
      };

      const { error } = await supabase
        .from("site_settings")
        .update(updateData)
        .eq("id", settings.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Configurações atualizadas com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Carregando configurações...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Nenhuma configuração encontrada.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Cores do Tema</h3>
        <ThemeColorsForm
          themeColors={settings.theme_colors}
          onChange={(theme_colors) => setSettings({ ...settings, theme_colors })}
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
        <ContactInfoForm
          contactInfo={settings.contact_info}
          onChange={(contact_info) => setSettings({ ...settings, contact_info })}
        />
      </Card>

      <Button type="submit" className="w-full">
        Salvar Configurações
      </Button>
    </form>
  );
};

export default SiteSettingsForm;