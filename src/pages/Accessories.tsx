import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Accessories = () => {
  const { toast } = useToast();
  
  const [sales, setSales] = useState({
    1: 1200, // Alterado para demonstrar o formato
    2: 850,   // Alterado para demonstrar o formato
    3: 2000,  // Alterado para demonstrar o formato
  });

  // Função para formatar o número de vendas
  const formatSales = (salesNumber: number): string => {
    if (salesNumber >= 1000) {
      return `${(salesNumber / 1000).toFixed(1).replace('.', ',')}mil`;
    }
    return salesNumber.toString();
  };

  // ... (restante do código permanece igual)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* ... */}

        {/* Produtos em Promoção */}
        <div>
          {/* ... */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map((product) => (
              <Card key={product.id}>
                {/* ... */}
                <CardContent className="p-4">
                  {/* ... */}
                  <div className="flex justify-between items-center">
                    {/* ... */}
                    <p className="text-sm text-gray-500">
                      Vendas: {formatSales(sales[product.id])}
                    </p>
                  </div>
                </CardContent>
                {/* ... */}
              </Card>
            ))}
          </div>
        </div>

        {/* Produtos Regulares */}
        <div className="mt-8">
          {/* ... */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProducts.map((product) => (
              <Card key={product.id}>
                {/* ... */}
                <CardContent className="p-4">
                  {/* ... */}
                  <div className="flex justify-between items-center">
                    {/* ... */}
                    <p className="text-sm text-gray-500">
                      Vendas: {formatSales(sales[product.id])}
                    </p>
                  </div>
                </CardContent>
                {/* ... */}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accessories;
