import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlansTab } from "@/components/admin/tabs/PlansTab";
import { AccessoriesTab } from "@/components/admin/tabs/AccessoriesTab";
import { NewsTab } from "@/components/admin/tabs/NewsTab";
import NavbarConfig from "@/components/admin/NavbarConfig";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { Newspaper, Navigation, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { populateDatabase } from "@/utils/populateDatabase";

const Admin = () => {
  const { toast } = useToast();

  const handlePopulateDatabase = async () => {
    const result = await populateDatabase();
    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Dados de exemplo adicionados com sucesso!"
      });
    } else {
      toast({
        title: "Erro",
        description: "Erro ao adicionar dados de exemplo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <Button 
          onClick={handlePopulateDatabase}
          className="flex items-center gap-2"
        >
          <Database className="w-4 h-4" />
          Adicionar Dados de Exemplo
        </Button>
      </div>
      
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-4">
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="accessories">Acessórios</TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            Notícias
          </TabsTrigger>
          <TabsTrigger value="navbar" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Navbar
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <PlansTab />
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <AccessoriesTab />
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <NewsTab />
        </TabsContent>

        <TabsContent value="navbar" className="space-y-4">
          <NavbarConfig />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SiteSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;