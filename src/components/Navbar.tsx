
import { Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavbarSettings {
  whatsappNumber: string;
  whatsappMessage: string;
  instagramUser: string;
  facebookUser: string;
  welcomeMessages: {
    greeting: string;
    brandName: string;
    tagline: string;
  };
  menuLabels: {
    plans: string;
    accessories: string;
    news: string;
    brand: string;
    share: string;
  };
}

const defaultSettings: NavbarSettings = {
  whatsappNumber: "5538998622897",
  whatsappMessage: "Olá! Gostaria de saber mais sobre os planos.",
  instagramUser: "m.vinizxxp1",
  facebookUser: "marcosviniciusmg03",
  welcomeMessages: {
    greeting: "👋 Bem-vindo(a) à",
    brandName: "NETMAX",
    tagline: "Conectando você ao melhor da internet! 🚀"
  },
  menuLabels: {
    plans: "PLANOS",
    accessories: "ACESSÓRIOS",
    news: "NOTÍCIAS",
    brand: "NETMAX",
    share: "Compartilhar"
  }
};

const Navbar = () => {
  const [settings, setSettings] = useState<NavbarSettings>(defaultSettings);

  useEffect(() => {
    const storedSettings = localStorage.getItem('navbar_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      localStorage.setItem('navbar_settings', JSON.stringify(defaultSettings));
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Confira este site!",
          text: "Dá uma olhada nesse site incrível!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Seu navegador não suporta compartilhamento nativo.");
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const facebookUrl = `https://www.facebook.com/${settings.facebookUser}`;
  const instagramUrl = `https://www.instagram.com/${settings.instagramUser}`;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-gray-700 lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-orange-500 text-2xl font-bold">{settings.menuLabels.brand}</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="bg-gray-100 text-gray-700 rounded-full w-10 h-10 p-0">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb2.png" 
                  alt="Facebook" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="bg-gray-100 text-gray-700 rounded-full w-10 h-10 p-0">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png"
                  alt="Instagram" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            <Button 
              variant="secondary" 
              className="bg-orange-500 text-white hover:bg-orange-600 border-none flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              {settings.menuLabels.share}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center py-2 border-t border-gray-300 space-x-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              {settings.menuLabels.plans}
            </Button>
          </Link>
          <Link to="/accessories">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              {settings.menuLabels.accessories}
            </Button>
          </Link>
          <Link to="/news">
            <Button 
              variant="ghost" 
              className="text-white bg-orange-500 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              {settings.menuLabels.news}
            </Button>
          </Link>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-full max-w-md">
            <p className="text-lg font-semibold text-gray-700">
              {settings.welcomeMessages.greeting} <span className="font-bold text-orange-500">{settings.welcomeMessages.brandName}</span>
            </p>
            <p className="text-gray-600">{settings.welcomeMessages.tagline}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
