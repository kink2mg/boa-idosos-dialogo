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
  welcomeMessages: {
    greeting: string;
    brandName: string;
    tagline: string;
  };
  menuLabels: {
    plans: string;
    accessories: string;
    news: string;
    brand: string;
    share: string;
  };
}

const NavbarConfig = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NavbarSettings>({
    whatsappNumber: "5538998622897",
    whatsappLink: "https://wa.me/5538998622897",
    instagramUser: "m.vinizxxp1",
    facebookUser: "marcosviniciusmg03",
    welcomeMessages: {
      greeting: "👋 Bem-vindo(a)",
      brandName: "NETMAX!",
      tagline: "Conectando você ao melhor da internet! 🚀"
    },
    menuLabels: {
      plans: "PLANOS",
      accessories: "ACESSÓRIOS",
      news: "NOTÍCIAS",
      brand: "Net",
      share: "Compartilhar"
    }
  });

  const handleSave = () => {
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
        <h3 className="text-lg font-semibold mb-4">Mensagem de Boas-vindas</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="greeting">Saudação</Label>
            <Input
              id="greeting"
              value={settings.welcomeMessages.greeting}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                welcomeMessages: {
                  ...prev.welcomeMessages,
                  greeting: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="brandName">Nome da Marca</Label>
            <Input
              id="brandName"
              value={settings.welcomeMessages.brandName}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                welcomeMessages: {
                  ...prev.welcomeMessages,
                  brandName: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="tagline">Slogan</Label>
            <Input
              id="tagline"
              value={settings.welcomeMessages.tagline}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                welcomeMessages: {
                  ...prev.welcomeMessages,
                  tagline: e.target.value
                }
              }))}
            />
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