import { useMemo } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const whatsappNumber = "5538998622897";
  const whatsappMessage = "Olá! Gostaria de saber mais sobre os planos.";

  // Memoiza a URL do WhatsApp
  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  }, [whatsappNumber, whatsappMessage]);

  const menuLinks = [
    { label: "PLANOS", path: "/" },
    { label: "ACESSÓRIOS", path: "/accessories" },
    { label: "NOTÍCIAS", path: "/news" },
  ];

  return (
    <header className="bg-primary">
      <div className="container mx-auto px-4">
        {/* Navbar principal */}
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden" aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-white text-2xl font-bold">Net</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white rounded-full w-10 h-10 p-0 bg-white"
              aria-label="Telefone"
            >
              <Phone className="w-5 h-5 text-primary" />
            </Button>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                className="text-white rounded-full w-10 h-10 p-0 bg-white"
                aria-label="WhatsApp"
              >
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png" 
                  alt="WhatsApp" 
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
        </nav>

        {/* Menu de navegação */}
        <nav className="flex justify-center py-2 border-t border-red-700 space-x-4">
          {menuLinks.map(({ label, path }) => (
            <Link key={path} to={path}>
              <Button 
                variant="ghost" 
                className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
