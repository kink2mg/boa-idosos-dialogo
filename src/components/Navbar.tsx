import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-2xl font-bold">Net</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white">
              <Phone className="w-5 h-5 mr-2" />
              Ligar
            </Button>
            <Button variant="ghost" className="text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button variant="secondary" className="bg-secondary text-black hover:bg-yellow-400">
              Contrate
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between py-2 border-t border-red-700">
          <a href="#celular" className="text-white hover:text-gray-200">PARA SEU CELULAR</a>
          <a href="#casa" className="text-white hover:text-gray-200">PARA SUA CASA</a>
          <a href="#empresa" className="text-white hover:text-gray-200">PARA SUA EMPRESA</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;