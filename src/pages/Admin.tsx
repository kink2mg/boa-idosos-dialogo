import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlansTab } from "@/components/admin/tabs/PlansTab";
import { AccessoriesTab } from "@/components/admin/tabs/AccessoriesTab";
import { NewsTab } from "@/components/admin/tabs/NewsTab";
import NavbarConfig from "@/components/admin/NavbarConfig";
import { Newspaper, Navigation } from "lucide-react";

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
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
          <TabsTrigger value="settings">Configurações</TabsTrigger>
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
          <h2>Configurações do Site</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;