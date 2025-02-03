import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface NavbarSettings {
  whatsappNumber: string;
  whatsappLink: string;
  instagramUser: string;
  facebookUser: string;
  welcomeText: string;
  menuLabels: {
    plans: string;
    accessories: string;
    news: string;
    brand: string;
    share: string;
  };
  colors: {
    background: string;
    text: string;
    buttonBackground: string;
    buttonText: string;
  };
}

const NavbarConfig = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NavbarSettings>({
    whatsappNumber: "5538998622897",
    whatsappLink: "https://wa.me/5538998622897",
    instagramUser: "m.vinizxxp1",
    facebookUser: "marcosviniciusmg03",
    welcomeText: "👋 Bem-vindo(a) à Net!\nConectando você ao melhor da internet! 🚀",
    menuLabels: {
      plans: "PLANOS",
      accessories: "ACESSÓRIOS",
      news: "NOTÍCIAS",
      brand: "Net",
      share: "Compartilhar"
    },
    colors: {
      background: "#ffffff",
      text: "#000000",
      buttonBackground: "#ea384c",
      buttonText: "#ffffff"
    }
  });

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    toast({
      title: "Configurações salvas",
      description: "As alterações foram aplicadas com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
            <Input
              id="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                whatsappNumber: e.target.value
              }))}
            />
          </div>
          <div>
            <Label htmlFor="instagramUser">Usuário do Instagram</Label>
            <Input
              id="instagramUser"
              value={settings.instagramUser}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                instagramUser: e.target.value
              }))}
            />
          </div>
          <div>
            <Label htmlFor="facebookUser">Usuário do Facebook</Label>
            <Input
              id="facebookUser"
              value={settings.facebookUser}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                facebookUser: e.target.value
              }))}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Textos</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="welcomeText">Mensagem de Boas-vindas</Label>
            <Input
              id="welcomeText"
              value={settings.welcomeText}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                welcomeText: e.target.value
              }))}
            />
          </div>
          <div>
            <Label htmlFor="menuPlans">Texto do Menu - Planos</Label>
            <Input
              id="menuPlans"
              value={settings.menuLabels.plans}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                menuLabels: { ...prev.menuLabels, plans: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="menuAccessories">Texto do Menu - Acessórios</Label>
            <Input
              id="menuAccessories"
              value={settings.menuLabels.accessories}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                menuLabels: { ...prev.menuLabels, accessories: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="menuNews">Texto do Menu - Notícias</Label>
            <Input
              id="menuNews"
              value={settings.menuLabels.news}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                menuLabels: { ...prev.menuLabels, news: e.target.value }
              }))}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Cores</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={settings.colors.background}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  colors: { ...prev.colors, background: e.target.value }
                }))}
                className="w-20"
              />
              <Input
                value={settings.colors.background}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  colors: { ...prev.colors, background: e.target.value }
                }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="textColor">Cor do Texto</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={settings.colors.text}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  colors: { ...prev.colors, text: e.target.value }
                }))}
                className="w-20"
              />
              <Input
                value={settings.colors.text}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  colors: { ...prev.colors, text: e.target.value }
                }))}
              />
            </div>
          </div>
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Salvar Configurações
      </Button>
    </div>
  );
};

export default NavbarConfig;