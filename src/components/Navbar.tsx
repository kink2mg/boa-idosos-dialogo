
import { Menu, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/" className="text-orange-500 text-2xl font-bold">NETMAX</Link>
          </div>
          
          <div className="flex items-center space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
