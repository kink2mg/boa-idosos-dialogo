import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <a href="/" className="text-white text-2xl font-bold">Net</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
              <Phone className="w-5 h-5 text-primary" />
            </Button>
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
              <img 
                src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png" 
                alt="WhatsApp" 
                className="w-5 h-5"
              />
            </Button>
            <Button 
              variant="secondary" 
              className="bg-green-500 text-white hover:bg-green-600 border-none"
            >
              Contrate
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center py-2 border-t border-red-700 space-x-4">
          <Button 
            variant="ghost" 
            className={`text-white px-4 py-2 rounded-lg shadow-md transition ${
              activeButton === "acessorios" ? "bg-green-600" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={() => setActiveButton("acessorios")}
          >
            ACESSÓRIOS
          </Button>
          <Button 
            variant="ghost" 
            className={`text-white px-4 py-2 rounded-lg shadow-md transition ${
              activeButton === "noticias" ? "bg-green-600" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={() => setActiveButton("noticias")}
          >
            NOTÍCIAS
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
