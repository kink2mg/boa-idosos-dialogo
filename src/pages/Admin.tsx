import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Plus, Edit, Trash, Settings, Box, Newspaper, Smartphone, ShoppingCart,
  X, Save, ImageIcon, List, Star, TrendingUp, Search, MessageCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface Product {
  id: number;
  nome: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  descricao: string;
  emPromocao: boolean;
  vendas: number;
}

interface News {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string;
}

interface Plan {
  id: number;
  title: string;
  category: string;
  price: number;
  gb: number;
  features?: string[];
  isPopular?: boolean;
}

const Admin = () => {
  // Estados principais
  const [activeSection, setActiveSection] = useState<"planos" | "acessorios" | "noticias">("planos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#F97316");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // Carregar cor do localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem("primaryColor");
    if (savedColor) setPrimaryColor(savedColor);
  }, []);

  // Salvar cor no localStorage
  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  // Dados mockados (manter igual)
  const [planos, setPlanos] = useState<Plan[]>([...]);
  const [acessorios, setAcessorios] = useState<Product[]>([...]);
  const [noticias, setNoticias] = useState<News[]>([...]);

  // Estilos dinâmicos
  const dynamicStyles = `
    :root {
      --primary-color: ${primaryColor};
      --primary-hover: ${primaryColor}CC;
      --primary-bg: ${primaryColor}10;
    }
  `;

  const handleSaveItem = (itemData: any) => { ... }; // Manter igual

  const DynamicForm = () => { ... }; // Manter igual

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: `var(--primary-bg)` }}>
      <style>{dynamicStyles}</style>
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Painel Admin</h2>
          <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
            <PopoverTrigger>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-4">
              <HexColorPicker
                color={primaryColor}
                onChange={(color) => setPrimaryColor(color)}
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="mt-4"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <nav className="space-y-2">
          {[
            { section: "planos", icon: <Smartphone className="w-5 h-5" />, label: "Planos" },
            { section: "acessorios", icon: <ShoppingCart className="w-5 h-5" />, label: "Acessórios" },
            { section: "noticias", icon: <Newspaper className="w-5 h-5" />, label: "Notícias" }
          ].map(({ section, icon, label }) => (
            <button
              key={section}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                activeSection === section
                  ? "bg-[var(--primary-bg)] text-[var(--primary-color)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(section as any)}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                Gerenciamento de {activeSection}
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Input
                  placeholder={`Pesquisar ${activeSection}...`}
                  className="w-full pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
              <Button
                style={{ backgroundColor: primaryColor }}
                className="hover:bg-[var(--primary-hover)]"
                onClick={() => {
                  setSelectedItem(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Tabelas Dinâmicas */}
          <Card style={{ borderColor: `var(--primary-bg)` }}>
            <div className="overflow-x-auto">
              {/* Tabelas mantidas com substituição de cores */}
              {activeSection === 'planos' && (
                <table className="w-full">
                  ...
                  <td className="px-6 py-4" style={{ color: primaryColor }}>
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </td>
                  ...
                </table>
              )}

              {activeSection === 'acessorios' && (
                <table className="w-full">
                  ...
                  <span style={{ color: primaryColor }}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </span>
                  ...
                </table>
              )}

              {activeSection === 'noticias' && (
                <table className="w-full">...</table>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal Dinâmico */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DynamicForm />
      </Dialog>
    </div>
  );
};

// Função auxiliar para formatar vendas (manter igual)
const formatarVendas = (quantidade: number): string => { ... };

export default Admin;
