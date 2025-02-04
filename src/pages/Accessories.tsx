import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface Accessory {
  id: number;
  nome: string;
  preco: number;
  precoAntigo?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  emPromocao: boolean;
  quantidadeVendas: number;
}

const Accessories = () => {
  const { toast } = useToast();
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  
  useEffect(() => {
    const storedAccessories = localStorage.getItem('accessories');
    if (storedAccessories) {
      console.log("Acessórios carregados:", JSON.parse(storedAccessories));
      setAccessories(JSON.parse(storedAccessories));
    }
  }, []);

  const formatarVendas = (quantidade: number): string => {
    if (quantidade >= 1000) {
      return `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil`;
    }
    return quantidade.toString();
  };

  const adicionarAoCarrinho = (nomeProduto: string) => {
    toast({
      title: "Sucesso",
      description: `${nomeProduto} foi direcionado para o WhatsApp.`
    });
  };

  const produtosEmPromocao = accessories.filter(produto => produto.emPromocao);
  const produtosRegulares = accessories.filter(produto => !produto.emPromocao);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {accessories.length > 0 ? (
          <>
            <h2 className="text-4xl font-extrabold text-orange-600 mb-6 text-center uppercase tracking-wide drop-shadow-md">
              ⚡ Promoção Relâmpago ⚡
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtosEmPromocao.map((produto) => {
                const desconto = produto.precoAntigo ? ((1 - produto.preco / produto.precoAntigo) * 100).toFixed(0) : 0;
                
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
                          {desconto && (
                            <span className="text-xs font-semibold text-orange-600">
                              {desconto}% OFF
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Vendas: {formatarVendas(produto.quantidadeVendas)}
                        </p>
                      </div>

                      {produto.precoAntigo && (
                        <p className="text-md text-gray-500 line-through">
                          R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </CardContent>

                    <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                      <Button 
                        className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200"
                        onClick={() => adicionarAoCarrinho(produto.nome)}
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
                {produtosRegulares.map((produto) => (
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
                          Vendas: {formatarVendas(produto.quantidadeVendas)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                      <Button 
                        className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200"
                        onClick={() => adicionarAoCarrinho(produto.nome)}
                      >
                        <ShoppingCart className="mr-2" />
                        Comprar Agora
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              Nenhum Acessório cadastrado ainda
            </h2>
            <p className="text-gray-500 mt-2">
              Os Acessórios serão exibidos aqui após serem adicionados pelo painel administrativo
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Accessories;