import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PlanForm from "@/components/admin/PlanForm";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminList } from "@/components/admin/AdminList";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("plans");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (data: any) => {
    toast({
      title: "Sucesso",
      description: "Item adicionado com sucesso!"
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Sucesso",
      description: "Item removido com sucesso!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="space-y-4">
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancelar" : `Adicionar Novo ${activeTab === "plans" ? "Plano" : activeTab === "accessories" ? "Acessório" : "Notícia"}`}
            </Button>

            {showForm && (
              <Card className="p-6">
                {activeTab === "plans" && <PlanForm onSubmit={handleSubmit} />}
                {activeTab === "accessories" && <AccessoryForm onSubmit={handleSubmit} />}
                {activeTab === "news" && <NewsForm onSubmit={handleSubmit} />}
              </Card>
            )}

            <AdminList type={activeTab} onDelete={handleDelete} />
          </div>
        </AdminTabs>
      </div>
    </div>
  );
};

export default Admin;