import { useState } from "react"; // Adicione esta importação
import { Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu
  // ... (outras declarações permanecem iguais)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="text-gray-700 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Alternar estado ao clicar
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-orange-500 text-2xl font-bold">NETMAX</Link>
          </div>
          
          {/* ... (seção de ícones sociais permanece igual) */}
        </div>

        {/* Menu dropdown para mobile */}
        {isMenuOpen && (
          <div className="lg:hidden absolute bg-white w-full z-10 shadow-md">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/" 
                className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link 
                to="/accessories" 
                className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Acessórios
              </Link>
              <Link 
                to="/news" 
                className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Notícias
              </Link>
            </div>
          </div>
        )}

        {/* Menu para desktop (permanece visível em telas grandes) */}
        <div className="hidden lg:flex justify-center py-2 border-t border-gray-300 space-x-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              PLANOS
            </Button>
          </Link>
          <Link to="/accessories">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              NOTÍCIAS
            </Button>
          </Link>
        </div>

        {/* ... (seção de boas-vindas permanece igual) */}
      </div>
    </nav>
  );
};

export default Navbar;
