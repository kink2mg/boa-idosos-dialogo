import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Palette, Save, Settings, Box, Newspaper, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

interface NavbarConfig {
  logo: string;
  menuItems: MenuItem[];
  showSearch: boolean;
  showUserMenu: boolean;
  socialLinks: SocialLinks;
}

interface MenuItem {
  label: string;
  path: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  whatsapp: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    textColor: "#ffffff",
    backgroundColor: "#f3f4f6"
  });

  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>({
    logo: "/logo.png",
    menuItems: [
      { label: "Planos", path: "/planos" },
      { label: "Acessórios", path: "/acessorios" },
      { label: "Notícias", path: "/noticias" }
    ],
    showSearch: true,
    showUserMenu: true,
    socialLinks: {
      facebook: "marcosviniciusmg03",
      instagram: "m.vinizxxp1",
      whatsapp: "5538998622897"
    }
  });

  // Carregar configurações
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeConfig");
    const savedNavbar = localStorage.getItem("navbarConfig");
    
    if (savedTheme) setThemeConfig(JSON.parse(savedTheme));
    if (savedNavbar) setNavbarConfig(JSON.parse(savedNavbar));
  }, []);

  // Salvar configurações
  const saveConfig = () => {
    localStorage.setItem("themeConfig", JSON.stringify(themeConfig));
    localStorage.setItem("navbarConfig", JSON.stringify(navbarConfig));
    
    toast({
      title: "Configurações salvas",
      description: "Todas as alterações foram armazenadas com sucesso!"
    });
  };

  // Componente Navbar
  const Navbar = () => (
    <nav 
      className="w-full py-4 px-6 shadow-md mb-8"
      style={{ 
        backgroundColor: themeConfig.primaryColor,
        color: themeConfig.textColor
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <img 
            src={navbarConfig.logo} 
            alt="Logo" 
            className="h-12 cursor-pointer"
            onClick={() => navigate('/')}
          />
          
          <div className="hidden md:flex gap-6">
            {navbarConfig.menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="hover:bg-white/10"
                style={{ color: themeConfig.textColor }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {navbarConfig.showSearch && (
            <input
              type="text"
              placeholder="Pesquisar..."
              className="px-4 py-2 rounded-lg bg-white/10 border-none focus:ring-2 focus:ring-white/50"
              style={{ color: themeConfig.textColor }}
            />
          )}

          {navbarConfig.showUserMenu && (
            <div className="relative group">
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 p-0 hover:bg-white/10"
              >
                <span className="text-xl">👤</span>
              </Button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/perfil')}
                >
                  Meu Perfil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500"
                  onClick={() => navigate('/logout')}
                >
                  Sair
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  // Configurações do Navbar
  const NavbarSettings = () => (
    <Card className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Seção Logo e Redes Sociais */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2">URL do Logo</label>
            <input
              type="text"
              value={navbarConfig.logo}
              onChange={(e) => setNavbarConfig({...navbarConfig, logo: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <div>
              <label className="block mb-2">Facebook</label>
              <input
                type="text"
                value={navbarConfig.socialLinks.facebook}
                onChange={(e) => setNavbarConfig({
                  ...navbarConfig,
                  socialLinks: {...navbarConfig.socialLinks, facebook: e.target.value}
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Instagram</label>
              <input
                type="text"
                value={navbarConfig.socialLinks.instagram}
                onChange={(e) => setNavbarConfig({
                  ...navbarConfig,
                  socialLinks: {...navbarConfig.socialLinks, instagram: e.target.value}
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">WhatsApp</label>
              <input
                type="text"
                value={navbarConfig.socialLinks.whatsapp}
                onChange={(e) => setNavbarConfig({
                  ...navbarConfig,
                  socialLinks: {...navbarConfig.socialLinks, whatsapp: e.target.value}
                })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Seção Menu */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block mb-2">Itens do Menu</label>
            {navbarConfig.menuItems.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const newItems = [...navbarConfig.menuItems];
                    newItems[index].label = e.target.value;
                    setNavbarConfig({...navbarConfig, menuItems: newItems});
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Rótulo"
                />
                <input
                  type="text"
                  value={item.path}
                  onChange={(e) => {
                    const newItems = [...navbarConfig.menuItems];
                    newItems[index].path = e.target.value;
                    setNavbarConfig({...navbarConfig, menuItems: newItems});
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="/caminho"
                />
                <Button
                  variant="destructive"
                  onClick={() => setNavbarConfig({
                    ...navbarConfig,
                    menuItems: navbarConfig.menuItems.filter((_, i) => i !== index)
                  })}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setNavbarConfig({
                ...navbarConfig,
                menuItems: [...navbarConfig.menuItems, { label: "", path: "" }]
              })}
            >
              Adicionar Item
            </Button>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={navbarConfig.showSearch}
                  onChange={(e) => setNavbarConfig({...navbarConfig, showSearch: e.target.checked})}
                />
                Mostrar Campo de Busca
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={navbarConfig.showUserMenu}
                  onChange={(e) => setNavbarConfig({...navbarConfig, showUserMenu: e.target.checked})}
                />
                Mostrar Menu do Usuário
              </label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button onClick={saveConfig} className="gap-2">
            <Save size={18} />
            Salvar Tudo
          </Button>
        </div>

        <Tabs defaultValue="navbar">
          <TabsList className="w-full">
            <TabsTrigger value="navbar" className="flex-1">
              <Box className="mr-2" /> Navbar
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1">
              <Palette className="mr-2" /> Tema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navbar">
            <NavbarSettings />
          </TabsContent>

          <TabsContent value="theme">
            <Card className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(themeConfig).map(([key, value]) => (
                  <div key={key}>
                    <label className="block mb-2 capitalize">{key.replace('Color', '')}</label>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setThemeConfig({...themeConfig, [key]: e.target.value})}
                      className="w-full h-12 cursor-pointer"
                    />
                    <span className="text-sm mt-1 block">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
