import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Accessories = () => {
  const { toast } = useToast();
  
  const products = [
    {
      id: 1,
      name: "MacBook Pro",
      price: 8999.90,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500",
      description: "MacBook Pro com processador M1, 8GB RAM"
    },
    {
      id: 2,
      name: "Laptop Profissional",
      price: 4599.90,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500",
      description: "Laptop para trabalho e estudos"
    },
    {
      id: 3,
      name: "Notebook Ultra",
      price: 3299.90,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500",
      description: "Notebook leve e portátil"
    }
  ];

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Sucesso",
      description: `${productName} foi direcionado para o WhatsApp.`
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Acessórios</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <CardHeader className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-60 object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-md">
                  Promoção
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{product.name}</CardTitle>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                <Button 
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 rounded-lg py-2 shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => handleAddToCart(product.name)}
                >
                  <ShoppingCart className="mr-2" />
                  Compre Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Accessories;
