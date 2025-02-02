import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react"; 

// Dados de configuração (podem vir de um arquivo de configuração ou API)
const APP_CONFIG = {
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || "5538998622897",
    message: "Olá! Gostaria de saber mais sobre os planos."
  },
  company: {
    name: "Net",
    logo: "/logo.png"
  }
};

// Itens de navegação centralizados para fácil manutenção
const NAV_ITEMS = [
  { path: "/", label: "PLANOS" },
  { path: "/accessories", label: "ACESSÓRIOS" },
  { path: "/news", label: "NOTÍCIAS" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsapp.number}?text=${encodeURIComponent(APP_CONFIG.whatsapp.message)}`;

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
              <img 
                src={APP_CONFIG.company.logo} 
                alt={APP_CONFIG.company.name} 
                className="h-8 w-auto"
              />
              {APP_CONFIG.company.name}
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <a href={`tel:${APP_CONFIG.whatsapp.number}`} aria-label="Ligar">
              <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white/20 hover:bg-white/30">
                <Phone className="w-5 h-5" />
              </Button>
            </a>
            
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white/20 hover:bg-white/30">
                <img 
                  src="/whatsapp-icon.svg"  // Garanta que o caminho está correto
                  alt="WhatsApp" 
                  className="w-5 h-5"
                />
              </Button>
            </a>
            
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="secondary" 
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Suporte
              </Button>
            </a>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex justify-center py-2 border-t border-red-700 gap-4">
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant="ghost" 
                className="nav-button bg-red-600 text-white hover:bg-red-700"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-red-700 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button 
                  variant="ghost" 
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
