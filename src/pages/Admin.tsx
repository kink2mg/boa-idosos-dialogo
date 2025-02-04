import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PlanForm from "@/components/admin/PlanForm";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

const Admin = () => {
  const { toast } = useToast();
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showAccessoryForm, setShowAccessoryForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);

  const handleAddPlan = (newPlan: any) => {
    setShowPlanForm(false);
    toast({
      title: "Sucesso",
      description: "Plano adicionado com sucesso!"
    });
  };

  const handleAddAccessory = (newAccessory: any) => {
    setShowAccessoryForm(false);
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleAddNews = (newNews: any) => {
    setShowNewsForm(false);
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">Configurações do Site</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Configurações Gerais</h2>
              <SiteSettingsForm />
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-4">
              <Button onClick={() => setShowPlanForm(!showPlanForm)}>
                {showPlanForm ? "Cancelar" : "Adicionar Novo Plano"}
              </Button>

              {showPlanForm && (
                <Card className="p-6">
                  <PlanForm onSubmit={handleAddPlan} />
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accessories">
            <div className="space-y-4">
              <Button onClick={() => setShowAccessoryForm(!showAccessoryForm)}>
                {showAccessoryForm ? "Cancelar" : "Adicionar Novo Acessório"}
              </Button>

              {showAccessoryForm && (
                <Card className="p-6">
                  <AccessoryForm onSubmit={handleAddAccessory} />
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="space-y-4">
              <Button onClick={() => setShowNewsForm(!showNewsForm)}>
                {showNewsForm ? "Cancelar" : "Adicionar Nova Notícia"}
              </Button>

              {showNewsForm && (
                <Card className="p-6">
                  <NewsForm onSubmit={handleAddNews} />
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;