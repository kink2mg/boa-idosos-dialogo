import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const whatsappNumber = "5538998622897"; // Número do WhatsApp
  const whatsappMessage = "Olá! Gostaria de saber mais sobre os planos.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const facebookUser = "marcosviniciusmg03"; // Nome de usuário do Facebook
  const facebookUrl = `https://www.facebook.com/${facebookUser}`; // Link do Facebook

  const instagramUser = "m.vinizxxp1"; // Nome de usuário do Instagram
  const instagramUrl = `https://www.instagram.com/${instagramUser}`; // Link do Instagram

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-white text-2xl font-bold">Net</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb2.png" 
                  alt="Facebook" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png"
                  alt="Instagram" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="secondary" 
                className="bg-green-500 text-white hover:bg-green-600 border-none"
              >
                Suporte
              </Button>
            </a>
          </div>
        </div>
        
        <div className="flex justify-center py-2 border-t border-red-700 space-x-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              PLANOS
            </Button>
          </Link>
          <Link to="/accessories">
            <Button 
              variant="ghost" 
              className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button 
              variant="ghost" 
              className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              NOTÍCIAS
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
