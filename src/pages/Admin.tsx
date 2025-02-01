import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

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

  // Dados mockados
  const [planos, setPlanos] = useState<Plan[]>([
    {
      id: 1,
      title: "NET PÓS",
      category: "Para seu celular",
      price: 119.90,
      gb: 50,
      isPopular: true,
      features: ["Ligações ilimitadas", "5G incluso", "Roaming internacional"]
    },
    {
      id: 2,
      title: "NET CONTROLE",
      category: "Para seu celular",
      price: 54.90,
      gb: 25,
      features: ["Ligações ilimitadas", "4G+ disponível"]
    }
  ]);

  const [acessorios, setAcessorios] = useState<Product[]>([
    {
      id: 1,
      nome: "MacBook Pro",
      preco: 8999.90,
      precoAntigo: 9999.90,
      imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      descricao: "MacBook Pro com processador M1, 8GB RAM",
      emPromocao: true,
      vendas: 1200
    },
    // ... outros acessórios
  ]);

  const [noticias, setNoticias] = useState<News[]>([
    {
      id: 1,
      title: "Nova Tecnologia 5G Revoluciona Conectividade",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      content: "A tecnologia 5G está transformando a maneira como nos conectamos..."
    },
    // ... outras notícias
  ]);

  // Função genérica para salvar
  const handleSaveItem = (itemData: any) => {
    const setters = {
      planos: setPlanos,
      acessorios: setAcessorios,
      noticias: setNoticias
    };

    if (itemData.id) {
      setters[activeSection](prev => 
        prev.map(item => item.id === itemData.id ? itemData : item)
      );
    } else {
      setters[activeSection](prev => [...prev, { ...itemData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Componente de formulário dinâmico
  const DynamicForm = () => {
    const commonFields = (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Título</label>
          <Input
            value={selectedItem?.nome || selectedItem?.title || ""}
            onChange={e => setSelectedItem({...selectedItem, [activeSection === 'noticias' ? 'title' : 'nome']: e.target.value})}
          />
        </div>

        {activeSection !== 'noticias' && (
          <div>
            <label className="text-sm font-medium">Preço</label>
            <Input
              type="number"
              value={selectedItem?.preco || 0}
              onChange={e => setSelectedItem({...selectedItem, preco: Number(e.target.value)})}
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Imagem</label>
          <div className="flex gap-2">
            <Input
              value={selectedItem?.imagem || selectedItem?.image || ""}
              onChange={e => setSelectedItem({...selectedItem, [activeSection === 'noticias' ? 'image' : 'imagem']: e.target.value})}
              placeholder="Cole a URL da imagem"
            />
            <Button variant="outline">
              <ImageIcon className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedItem?.id ? "Editar" : "Novo"} {activeSection === 'noticias' ? "Notícia" : activeSection}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {commonFields}

          <div className="space-y-4">
            {activeSection === 'acessorios' && (
              <>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={selectedItem?.emPromocao || false}
                    onCheckedChange={checked => setSelectedItem({...selectedItem, emPromocao: checked})}
                  />
                  <span>Em Promoção</span>
                </div>

                <div>
                  <label className="text-sm font-medium">Preço Antigo</label>
                  <Input
                    type="number"
                    value={selectedItem?.precoAntigo || 0}
                    onChange={e => setSelectedItem({...selectedItem, precoAntigo: Number(e.target.value)})}
                  />
                </div>
              </>
            )}

            {activeSection === 'noticias' && (
              <div>
                <label className="text-sm font-medium">Conteúdo</label>
                <Textarea
                  value={selectedItem?.content || ""}
                  onChange={e => setSelectedItem({...selectedItem, content: e.target.value})}
                  rows={6}
                />
              </div>
            )}

            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => handleSaveItem(selectedItem)}
            >
              <Save className="w-4 h-4 mr-2" /> Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Painel Admin</h2>
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
                  ? "bg-orange-100 text-orange-600"
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
                className="bg-orange-600 hover:bg-orange-700"
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
          <Card>
            <div className="overflow-x-auto">
              {activeSection === 'planos' && (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Título</th>
                      <th className="px-6 py-3 text-left">Categoria</th>
                      <th className="px-6 py-3 text-left">Preço</th>
                      <th className="px-6 py-3 text-left">GB</th>
                      <th className="px-6 py-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planos.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{item.title}</td>
                        <td className="px-6 py-4">{item.category}</td>
                        <td className="px-6 py-4">R$ {item.price.toFixed(2).replace('.', ',')}</td>
                        <td className="px-6 py-4">{item.gb} GB</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeSection === 'acessorios' && (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Produto</th>
                      <th className="px-6 py-3 text-left">Preço</th>
                      <th className="px-6 py-3 text-left">Promoção</th>
                      <th className="px-6 py-3 text-left">Vendas</th>
                      <th className="px-6 py-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acessorios.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imagem}
                              alt={item.nome}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.nome}</p>
                              <p className="text-sm text-gray-500">{item.descricao}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-orange-600 font-bold">
                              R$ {item.preco.toFixed(2).replace('.', ',')}
                            </span>
                            {item.precoAntigo && (
                              <span className="text-sm text-gray-400 line-through">
                                R$ {item.precoAntigo.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={item.emPromocao ? "default" : "secondary"}>
                            {item.emPromocao ? "Ativa" : "Inativa"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {formatarVendas(item.vendas)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeSection === 'noticias' && (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Notícia</th>
                      <th className="px-6 py-3 text-left">Data</th>
                      <th className="px-6 py-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticias.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {item.content}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

// Função auxiliar para formatar vendas
const formatarVendas = (quantidade: number): string => {
  if (quantidade >= 1000) {
    return `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil`;
  }
  return quantidade.toString();
};

export default Admin;