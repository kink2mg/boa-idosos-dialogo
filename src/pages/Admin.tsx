import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette,
  Save,
  Rocket,
  ShoppingBag,
  Newspaper,
  Settings,
  Plus,
  Trash2,
  Link as LinkIcon,
  Smartphone
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  glass: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  link: string;
  featured: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<ThemeConfig>({
    primary: "#6366f1",
    secondary: "#4f46e5",
    accent: "#f59e0b",
    background: "#0f172a",
    text: "#f8fafc",
    glass: "rgba(99, 102, 241, 0.1)"
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: "",
    price: 0,
    category: "plano",
    image: "",
    link: "",
    featured: false
  });

  // Carregar dados iniciais
  useEffect(() => {
    const savedData = {
      theme: localStorage.getItem("nebulaTheme"),
      products: localStorage.getItem("nebulaProducts")
    };

    if (savedData.theme) setTheme(JSON.parse(savedData.theme));
    if (savedData.products) setProducts(JSON.parse(savedData.products));
  }, []);

  // Salvar configurações
  const saveAll = () => {
    localStorage.setItem("nebulaTheme", JSON.stringify(theme));
    localStorage.setItem("nebulaProducts", JSON.stringify(products));
    toast({ title: "🪐 Configurações cósmicas salvas!" });
  };

  // Gerar link automático
  const generateLink = (name: string) => {
    return `/${name.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(160deg, ${theme.background}, ${theme.primary}20)`,
      color: theme.text
    }}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Nebula Control Panel
            </h1>
            <p className="text-sm opacity-75">Gestão Intergaláctica de Produtos</p>
          </div>
          
          <Button 
            onClick={saveAll}
            className="glass-effect"
            style={{ backgroundColor: theme.accent }}
          >
            <Save size={18} className="mr-2" />
            Salvar na Nuvem
          </Button>
        </div>

        {/* Conteúdo Principal */}
        <Tabs defaultValue="products">
          <TabsList className="glass-effect border-none gap-2 mb-6">
            <TabsTrigger value="products" className="data-[state=active]:bg-accent">
              <ShoppingBag size={18} className="mr-2" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-accent">
              <Palette size={18} className="mr-2" />
              Tema
            </TabsTrigger>
            <TabsTrigger value="mobile" className="data-[state=active]:bg-accent">
              <Smartphone size={18} className="mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>

          {/* Seção de Produtos */}
          <TabsContent value="products">
            <Card className="glass-effect border-none">
              <div className="p-6 space-y-8">
                {/* Formulário de Novo Produto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                      link: generateLink(e.target.value)
                    })}
                    className="glass-input"
                  />
                  
                  <input
                    type="number"
                    placeholder="Preço"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({
                      ...newProduct, 
                      price: Number(e.target.value)
                    })}
                    className="glass-input"
                  />

                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({
                      ...newProduct, 
                      category: e.target.value
                    })}
                    className="glass-input"
                  >
                    <option value="plano">Plano</option>
                    <option value="acessorio">Acessório</option>
                    <option value="noticia">Notícia</option>
                  </select>

                  <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({
                      ...newProduct, 
                      image: e.target.value
                    })}
                    className="glass-input"
                  />

                  <div className="md:col-span-2 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newProduct.featured}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          featured: e.target.checked
                        })}
                        className="w-4 h-4 accent-indigo-500"
                      />
                      Destaque
                    </label>
                  </div>

                  <Button
                    onClick={() => {
                      const product = { ...newProduct, id: Date.now().toString() };
                      setProducts([...products, product]);
                      setNewProduct({
                        name: "",
                        price: 0,
                        category: "plano",
                        image: "",
                        link: "",
                        featured: false
                      });
                    }}
                    className="md:col-span-2 glass-effect hover:scale-[1.02] transition-transform"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Rocket className="mr-2" />
                    Lançar Produto
                  </Button>
                </div>

                {/* Lista de Produtos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <Card 
                      key={product.id}
                      className="glass-effect border-none relative group overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          {product.featured && (
                            <div className="absolute top-2 left-2 bg-accent px-3 py-1 rounded-full text-xs font-bold">
                              ★ Destaque
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <span className="text-sm px-2 py-1 rounded-full bg-primary/10">
                            {product.category}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <a 
                            href={product.link} 
                            target="_blank"
                            className="flex-1"
                          >
                            <Button 
                              variant="outline" 
                              className="w-full glass-effect flex items-center gap-2"
                            >
                              <LinkIcon size={16} />
                              Visualizar
                            </Button>
                          </a>
                          
                          <Button
                            variant="destructive"
                            onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                            className="px-3"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Seção de Tema */}
          <TabsContent value="theme">
            <Card className="glass-effect border-none p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(theme).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">{key}</label>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setTheme({ ...theme, [key]: e.target.value })}
                      className="w-full h-10 rounded-lg cursor-pointer border-none"
                    />
                    <div className="text-xs opacity-75">{value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Seção Mobile */}
          <TabsContent value="mobile">
            <Card className="glass-effect border-none p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">📱 Otimização Mobile</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="pwa" className="w-4 h-4 accent-primary" />
                      <label htmlFor="pwa">Ativar PWA</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="offline" className="w-4 h-4 accent-primary" />
                      <label htmlFor="offline">Suporte Offline</label>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-4">
                  <div className="absolute inset-0 backdrop-blur-lg rounded-xl" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2">📲 Preview Mobile</h3>
                    <div className="space-y-2 text-sm">
                      <p>• Layout Responsivo</p>
                      <p>• Touch Optimized</p>
                      <p>• Instant Updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        .glass-effect {
          backdrop-filter: blur(12px);
          background: ${theme.glass};
          border: 1px solid ${theme.primary}20;
          box-shadow: 0 8px 32px ${theme.primary}10;
        }

        .glass-input {
          background: ${theme.primary}10;
          border: 1px solid ${theme.primary}20;
          color: ${theme.text};
          padding: 0.75rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .glass-input:focus {
          outline: none;
          border-color: ${theme.primary};
          box-shadow: 0 0 0 2px ${theme.primary}40;
        }
      `}</style>
    </div>
  );
};

export default Admin;
