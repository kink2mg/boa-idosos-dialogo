import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface ThemeColors {
  text: string;
  buttons: string;
  primary: string;
  container: string;
  background: string;
}

interface ContactInfo {
  logo_url: string;
  whatsapp: string;
  share_text: string;
  whatsapp_message: string;
}

interface SiteSettings {
  id: string;
  theme_colors: ThemeColors;
  contact_info: ContactInfo;
}

interface SupabaseSiteSettings {
  id: string;
  theme_colors: Json;
  contact_info: Json;
  created_at: string;
  updated_at: string;
}

const SiteSettingsForm = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;

      // Transform Supabase data to our frontend format
      const transformedData: SiteSettings = {
        id: data.id,
        theme_colors: data.theme_colors as ThemeColors,
        contact_info: data.contact_info as ContactInfo,
      };

      setSettings(transformedData);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings?.id) return;

    try {
      // Transform our frontend data to Supabase format
      const supabaseData: Partial<SupabaseSiteSettings> = {
        theme_colors: settings.theme_colors as Json,
        contact_info: settings.contact_info as Json,
      };

      const { error } = await supabase
        .from("site_settings")
        .update(supabaseData)
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
    return <div>Carregando...</div>;
  }

  if (!settings) {
    return <div>Nenhuma configuração encontrada.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Cores do Tema</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="text-color">Cor do Texto</Label>
            <Input
              id="text-color"
              type="color"
              value={settings.theme_colors.text}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme_colors: {
                    ...settings.theme_colors,
                    text: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="buttons-color">Cor dos Botões</Label>
            <Input
              id="buttons-color"
              type="color"
              value={settings.theme_colors.buttons}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme_colors: {
                    ...settings.theme_colors,
                    buttons: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="primary-color">Cor Primária</Label>
            <Input
              id="primary-color"
              type="color"
              value={settings.theme_colors.primary}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme_colors: {
                    ...settings.theme_colors,
                    primary: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="container-color">Cor do Container</Label>
            <Input
              id="container-color"
              type="color"
              value={settings.theme_colors.container}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme_colors: {
                    ...settings.theme_colors,
                    container: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="background-color">Cor do Fundo</Label>
            <Input
              id="background-color"
              type="color"
              value={settings.theme_colors.background}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  theme_colors: {
                    ...settings.theme_colors,
                    background: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="logo-url">URL do Logo</Label>
            <Input
              id="logo-url"
              type="url"
              value={settings.contact_info.logo_url}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_info: {
                    ...settings.contact_info,
                    logo_url: e.target.value,
                  },
                })
              }
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={settings.contact_info.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_info: {
                    ...settings.contact_info,
                    whatsapp: e.target.value,
                  },
                })
              }
              placeholder="5538998622897"
            />
          </div>
          <div>
            <Label htmlFor="share-text">Texto do Compartilhamento</Label>
            <Input
              id="share-text"
              value={settings.contact_info.share_text}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_info: {
                    ...settings.contact_info,
                    share_text: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="whatsapp-message">Mensagem do WhatsApp</Label>
            <Input
              id="whatsapp-message"
              value={settings.contact_info.whatsapp_message}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_info: {
                    ...settings.contact_info,
                    whatsapp_message: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </Card>

      <Button type="submit" className="w-full">
        Salvar Configurações
      </Button>
    </form>
  );
};

export default SiteSettingsForm;