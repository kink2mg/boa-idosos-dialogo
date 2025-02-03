import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarConfig from "@/components/admin/NavbarConfig";
import PlansConfig from "@/components/admin/PlansConfig";
import AccessoryForm from "@/components/admin/AccessoryForm";
import NewsForm from "@/components/admin/NewsForm";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface Accessory {
  id: number;
  nome: string;
  preco: number;
  precoAntigo?: number;
  descricao: string;
  imagem: string;
  videoUrl?: string;
  categoria: string;
  emPromocao: boolean;
  quantidadeVendas: number;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  videoUrl?: string;
  category: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login");
          toast({
            title: "Acesso Negado",
            description: "Você precisa fazer login primeiro.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          throw profileError;
        }

        if (!profile || profile.role !== "admin") {
          console.log("User is not admin, redirecting");
          toast({
            title: "Acesso Negado",
            description: "Você não tem permissão para acessar esta página.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao verificar suas permissões.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleAddAccessory = (newAccessory: Omit<Accessory, "id">) => {
    const accessory = { ...newAccessory, id: accessories.length + 1 };
    setAccessories([...accessories, accessory]);
    toast({
      title: "Sucesso",
      description: "Acessório adicionado com sucesso!"
    });
  };

  const handleAddNews = (newNews: Omit<NewsItem, "id">) => {
    const newsItem = { ...newNews, id: news.length + 1 };
    setNews([...news, newsItem]);
    toast({
      title: "Sucesso",
      description: "Notícia adicionada com sucesso!"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="w-full flex-wrap">
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
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

          <TabsContent value="accessories">
            <AccessoryForm onSubmit={handleAddAccessory} />
          </TabsContent>

          <TabsContent value="news">
            <NewsForm onSubmit={handleAddNews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;