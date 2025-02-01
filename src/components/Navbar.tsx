import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Botão de menu hamburguer */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            <Link to="/" className="text-white text-2xl font-bold">Net</Link>
          </div>

          {/* Botões de contato e suporte */}
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
              Suporte
            </Button>
          </div>
        </div>

        {/* Menu lateral (só aparece quando "isOpen" for true) */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-64 bg-red-700 text-white shadow-lg p-4 flex flex-col space-y-4">
            <Button 
              variant="ghost" 
              className="bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={() => { window.location.href = '/'; setIsOpen(false); }}
            >
              PLANOS
            </Button>
            <Button 
              variant="ghost" 
              className="bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={() => { window.location.href = '/accessories'; setIsOpen(false); }}
            >
              ACESSÓRIOS
            </Button>
            <Button 
              variant="ghost" 
              className="bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={() => { window.location.href = '/news'; setIsOpen(false); }}
            >
              NOTÍCIAS
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
