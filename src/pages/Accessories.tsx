import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { supabaseSettingsToSettings } from "@/types/site-settings";

const Accessories = () => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('*')
          .single();

        if (settingsData) {
          const settings = supabaseSettingsToSettings(settingsData);
          setWhatsappNumber(settings.contact_info.sales_number);
          setWhatsappMessage(settings.contact_info.sales_message);
        }

        // Fetch accessories
        const { data: accessoriesData } = await supabase
          .from('accessories')
          .select('*');

        if (accessoriesData) {
          setProdutos(accessoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatarVendas = (quantidade: number): string => {
    if (quantidade >= 1000) {
      return `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil`;
    }
    return quantidade.toString();
  };

  const adicionarAoCarrinho = (produto: any) => {
    const message = `${whatsappMessage} ${produto.nome} por R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const produtosEmPromocao = produtos.filter((produto: any) => produto.em_promocao);
  const produtosRegulares = produtos.filter((produto: any) => !produto.em_promocao);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        
        <h2 className="text-4xl font-extrabold text-orange-600 mb-6 text-center uppercase tracking-wide drop-shadow-md">
          ⚡ Promoção Relâmpago ⚡
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosEmPromocao.map((produto: any) => {
            const desconto = produto.preco_antigo ? ((1 - produto.preco / produto.preco_antigo) * 100).toFixed(0) : 0;
            
            return (
              <Card 
                key={produto.id} 
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 transition-transform duration-300"
              >
                <CardHeader className="relative">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-60 object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-md">
                    Promoção
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</CardTitle>
                  <p className="text-gray-600 mb-2">{produto.descricao}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-primary">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </p>
                      <span className="text-xs font-semibold text-orange-600">
                        {desconto}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Vendas: {formatarVendas(produto.quantidade_vendas)}
                    </p>
                  </div>

                  {produto.preco_antigo && (
                    <p className="text-md text-gray-500 line-through">
                      R$ {produto.preco_antigo.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                  <Button 
                    className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    <ShoppingCart className="mr-2" />
                    Comprar Agora
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-6 text-center uppercase tracking-wide drop-shadow-md">
            ✨ Destaques Exclusivos ✨
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosRegulares.map((produto: any) => (
              <Card 
                key={produto.id} 
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 transition-transform duration-300"
              >
                <CardHeader className="relative">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-60 object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</CardTitle>
                  <p className="text-gray-600 mb-2">{produto.descricao}</p>

                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendas: {formatarVendas(produto.quantidade_vendas)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                  <Button 
                    className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    <ShoppingCart className="mr-2" />
                    Comprar Agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accessories;