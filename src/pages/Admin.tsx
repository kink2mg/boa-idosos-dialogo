import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarConfig from "@/components/admin/NavbarConfig";
import PlansConfig from "@/components/admin/PlansConfig";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { NewsTab } from "@/components/admin/tabs/NewsTab";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="w-full flex-wrap">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SiteSettingsForm />
          </TabsContent>

          <TabsContent value="navbar">
            <NavbarConfig />
          </TabsContent>

          <TabsContent value="plans">
            <PlansConfig />
          </TabsContent>

          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;