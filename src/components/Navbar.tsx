import { Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const whatsappNumber = "5538998622897";
  const whatsappMessage = "Olá! Gostaria de saber mais sobre os planos.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const facebookUser = "marcosviniciusmg03";
  const facebookUrl = `https://www.facebook.com/${facebookUser}`;

  const instagramUser = "m.vinizxxp1";
  const instagramUrl = `https://www.instagram.com/${instagramUser}`;

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

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-gray-700 lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-orange-500 text-2xl font-bold">Net</Link>
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

            {/* Botão de Compartilhar (laranja) */}
            <Button 
              variant="secondary" 
              className="bg-orange-500 text-white hover:bg-orange-600 border-none flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center py-2 border-t border-gray-300 space-x-4">
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

        <div className="mt-4 flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-full max-w-md">
            <p className="text-lg font-semibold text-gray-700">
              👋 Bem-vindo(a) à <span className="font-bold text-orange-500">Net</span>!
            </p>
            <p className="text-gray-600">Conectando você ao melhor da internet! 🚀</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
