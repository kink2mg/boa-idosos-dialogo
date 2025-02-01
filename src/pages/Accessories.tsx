import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Accessories = () => {
  const { toast } = useToast();
  
  const [sales, setSales] = useState({
    1: 1200,
    2: 850,
    3: 2000,
    4: 1500,
    5: 750,
    6: 1800
  });

  const saleProducts: Product[] = [
    {
      id: 1,
      name: "Smartphone Case Pro",
      price: 29.99,
      description: "Premium protective case for smartphones",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 89.99,
      description: "High-quality wireless earbuds with noise cancellation",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Power Bank 10000mAh",
      price: 49.99,
      description: "Fast-charging portable power bank",
      image: "/placeholder.svg"
    }
  ];

  const regularProducts: Product[] = [
    {
      id: 4,
      name: "Screen Protector",
      price: 19.99,
      description: "Tempered glass screen protector",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Phone Stand",
      price: 15.99,
      description: "Adjustable phone stand for desk use",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Car Phone Mount",
      price: 24.99,
      description: "Universal car phone mount holder",
      image: "/placeholder.svg"
    }
  ];

  // Função para formatar o número de vendas
  const formatSales = (salesNumber: number): string => {
    if (salesNumber >= 1000) {
      return `${(salesNumber / 1000).toFixed(1).replace('.', ',')}mil`;
    }
    return salesNumber.toString();
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Produtos em Promoção</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-green-600">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendas: {formatSales(sales[product.id])}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Produtos Regulares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendas: {formatSales(sales[product.id])}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
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