import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Accessories = () => {
  const { toast } = useToast();
  
  const [vendas, setVendas] = useState({
    1: 1200,
    2: 850,
    3: 2000,
  });

  const formatarVendas = (quantidade: number): string => {
    if (quantidade >= 1000) {
      return `${(quantidade / 1000).toFixed(1).replace('.', ',')} mil`;
    }
    return quantidade.toString();
  };

  const produtos = [
    {
      id: 1,
      nome: "MacBook Pro",
      preco: 8999.90,
      imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500",
      descricao: "MacBook Pro com processador M1, 8GB RAM",
      emPromocao: true
    },
    {
      id: 2,
      nome: "Laptop Profissional",
      preco: 4599.90,
      imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500",
      descricao: "Laptop para trabalho e estudos",
      emPromocao: false
    },
    {
      id: 3,
      nome: "Notebook Ultra",
      preco: 3299.90,
      imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500",
      descricao: "Notebook leve e portátil",
      emPromocao: true
    }
  ];

  const adicionarAoCarrinho = (nomeProduto: string) => {
    toast({
      title: "Sucesso",
      description: `${nomeProduto} foi direcionado para o WhatsApp.`
    });
  };

  const produtosEmPromocao = produtos.filter(produto => produto.emPromocao);
  const produtosRegulares = produtos.filter(produto => !produto.emPromocao);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        
        {/* Promoção Relâmpago */}
        <h2 className="text-4xl font-extrabold text-orange-600 mb-6 text-center uppercase tracking-wide drop-shadow-md">
          ⚡ Promoção Relâmpago ⚡
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosEmPromocao.map((produto) => (
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
                  <p className="text-2xl font-bold text-primary">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-500">Vendas: {formatarVendas(vendas[produto.id])}</p>
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

        {/* Destaques Exclusivos */}
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
                    <p className="text-sm text-gray-500">Vendas: {formatarVendas(vendas[produto.id])}</p>
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
      </main>
    </div>
  );
};

export default Accessories;
