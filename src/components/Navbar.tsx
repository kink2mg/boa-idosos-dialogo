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
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white lg:hidden hover:bg-white/10 transition-all duration-300"
            >
              <Menu className="w-7 h-7" />
            </Button>
            <Link 
              to="/" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold tracking-wide hover:scale-105 transition-transform"
            >
              Net
            </Link>
          </div>
          
          {/* Social and Share */}
          <div className="flex items-center gap-3">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 p-0 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Facebook className="w-6 h-6 text-cyan-400" />
              </Button>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 p-0 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300"
              >
                <Instagram className="w-6 h-6 text-purple-400" />
              </Button>
            </a>

            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group"
            >
              <Share2 className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-center py-3 space-x-4 border-t border-white/10">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300"
            >
              🌟 PLANOS PREMIUM
            </Button>
          </Link>
          <Link to="/accessories">
            <Button 
              variant="ghost" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-300"
            >
              🛍️ ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button 
              variant="ghost" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-blue-400/50 hover:scale-105 transition-all duration-300"
            >
              📰 NOTÍCIAS
            </Button>
          </Link>
        </div>

        {/* Welcome Banner */}
        <div className="mt-6 flex justify-center animate-float">
          <div className="bg-gradient-to-r from-cyan-500/30 to-blue-600/30 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 w-full max-w-2xl text-center">
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-2">
              🚀 Bem-vindo(a) à Net!
            </p>
            <p className="text-cyan-100 text-lg">
              Conexão ultrarrápida | Tecnologia de ponta | Suporte 24/7
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
