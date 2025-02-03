import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarConfig from "@/components/admin/NavbarConfig";
import PlansConfig from "@/components/admin/PlansConfig";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="navbar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="navbar">
            <NavbarConfig />
          </TabsContent>

          <TabsContent value="plans">
            <PlansConfig />
          </TabsContent>

          <TabsContent value="accessories">
            < AccessoryForm />
          </TabsContent>

          <TabsContent value="news">
            < NewsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
