import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Accessory } from "./AccessoryForm"; // Interface dos acessórios

const Accessories = () => {
  const { toast } = useToast();
  
  const formatarVendas = (quantidade: number): string =>
    quantidade >= 1000 ? `${(quantidade / 1000).toFixed(1).replace(".", ",")} mil` : quantidade.toString();

  const produtos: Accessory[] = [
    {
      id: 1,
      nome: "MacBook Pro",
      preco: 8999.9,
      precoAntigo: 9999.9,
      descricao: "MacBook Pro com processador M1, 8GB RAM",
      imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      categoria: "Eletrônicos",
      emPromocao: true,
      quantidadeVendas: 1200,
      videoUrl: "https://youtube.com/watch?v=exemplo1",
    },
    {
      id: 2,
      nome: "Laptop Profissional",
      preco: 4599.9,
      descricao: "Laptop para trabalho e estudos",
      imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      categoria: "Informática",
      emPromocao: false,
      quantidadeVendas: 850,
    },
    {
      id: 3,
      nome: "Notebook Ultra",
      preco: 3299.9,
      precoAntigo: 3999.9,
      descricao: "Notebook leve e portátil",
      imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      categoria: "Promoções",
      emPromocao: true,
      quantidadeVendas: 2000,
      videoUrl: "https://youtube.com/watch?v=exemplo2",
    },
  ];

  const adicionarAoCarrinho = (nomeProduto: string) => {
    toast({
      title: "✅ Sucesso",
      description: `${nomeProduto} adicionado ao carrinho!`,
    });
  };

  const ProdutoCard = ({ produto }: { produto: Accessory }) => {
    const desconto = produto.precoAntigo
      ? ((1 - produto.preco / produto.precoAntigo) * 100).toFixed(0)
      : null;

    return (
      <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <CardHeader className="relative p-0">
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {produto.emPromocao && (
              <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-md animate-pulse">
                Promoção
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-gray-800">{produto.nome}</CardTitle>
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">{produto.categoria}</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{produto.descricao}</p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </span>
                {desconto && <span className="text-sm font-semibold text-orange-600">{desconto}% OFF</span>}
              </div>
              <span className="text-sm text-gray-500">🚀 {formatarVendas(produto.quantidadeVendas)}</span>
            </div>

            {produto.precoAntigo && (
              <p className="text-sm text-gray-500 line-through">
                De R$ {produto.precoAntigo.toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 bg-gray-50 border-t">
          <Button 
            className="w-full bg-orange-600 hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
            onClick={() => adicionarAoCarrinho(produto.nome)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Comprar Agora
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Seção de Promoções */}
        <section>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
              ⚡ Promoções Imperdíveis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos
              .filter(produto => produto.emPromocao)
              .map(produto => <ProdutoCard key={produto.id} produto={produto} />)}
          </div>
        </section>

        {/* Seção de Todos os Produtos */}
        <section>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
              🛒 Nossos Acessórios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map(produto => <ProdutoCard key={produto.id} produto={produto} />)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Accessories;
