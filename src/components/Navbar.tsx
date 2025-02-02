import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {
  instagramUrl: string;
  facebookUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ instagramUrl, facebookUrl }) => {
  const whatsappNumber = "5538998622897"; // Número do WhatsApp
  const whatsappMessage = "Olá! Gostaria de saber mais sobre os planos.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text"
            >
              Net
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Botão do Facebook */}
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 flex items-center justify-center bg-white"
              >
                <img
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb2.png"
                  alt="Facebook"
                  className="w-7 h-7"
                />
              </Button>
            </a>

            {/* Botão do Instagram */}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 flex items-center justify-center bg-white"
              >
                <img
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png"
                  alt="Instagram"
                  className="w-7 h-7"
                />
              </Button>
            </a>

            {/* Botão do WhatsApp - Suporte */}
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
            <Button className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
              PLANOS
            </Button>
          </Link>
          <Link to="/accessories">
            <Button className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
              ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
              NOTÍCIAS
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
