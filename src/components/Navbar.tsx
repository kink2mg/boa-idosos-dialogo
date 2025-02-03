import { Menu, Share2, Facebook, Instagram } from "lucide-react";
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
    <nav className="bg-gradient-to-r from-gray-900 to-emerald-900 backdrop-blur-lg border-b border-emerald-500/20">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-emerald-400 lg:hidden hover:bg-emerald-500/10"
            >
              <Menu className="w-7 h-7" />
            </Button>
            <Link 
              to="/" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 text-3xl font-bold tracking-wide"
            >
              Net
            </Link>
          </div>
          
          {/* Social and Actions */}
          <div className="flex items-center gap-3">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 p-0 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-lime-400/50 transition-all"
              >
                <Facebook className="w-6 h-6 text-lime-400" />
              </Button>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 p-0 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-lime-400/50 transition-all"
              >
                <Instagram className="w-6 h-6 text-lime-400" />
              </Button>
            </a>

            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-450 hover:to-emerald-600 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all group"
            >
              <Share2 className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex justify-center py-3 space-x-4 border-t border-emerald-500/10">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 text-lime-400 px-6 py-3 rounded-xl hover:bg-emerald-500/20 hover:border-lime-400/50 hover:scale-105 transition-all"
            >
              🌟 PLANOS
            </Button>
          </Link>
          <Link to="/accessories">
            <Button 
              variant="ghost" 
              className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 text-lime-400 px-6 py-3 rounded-xl hover:bg-emerald-500/20 hover:border-lime-400/50 hover:scale-105 transition-all"
            >
              🛍️ ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button 
              variant="ghost" 
              className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 text-lime-400 px-6 py-3 rounded-xl hover:bg-emerald-500/20 hover:border-lime-400/50 hover:scale-105 transition-all"
            >
              📰 NOTÍCIAS
            </Button>
          </Link>
        </div>

        {/* Welcome Banner */}
        <div className="mt-4 flex justify-center animate-float">
          <div className="bg-gradient-to-r from-emerald-500/30 to-lime-400/30 p-4 rounded-2xl backdrop-blur-sm border border-emerald-500/20 text-center max-w-md">
            <p className="text-lg font-bold bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
              👋 Bem-vindo(a) à <span className="font-black">Net</span>!
            </p>
            <p className="text-lime-100 mt-1">Conexão ultrarrápida com tecnologia de ponta 🚀</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
