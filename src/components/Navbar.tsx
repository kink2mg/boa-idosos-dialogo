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
    <nav className="bg-gradient-to-r from-[#051A2D] to-[#0D0745] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-white text-2xl font-bold tracking-wide">
              Net<span className="text-[#438BD3]">.</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full w-10 h-10 bg-[#5E72EB] hover:bg-[#438BD3] shadow-[0_0_10px_#438BD3]">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb2.png" 
                  alt="Facebook" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full w-10 h-10 bg-[#EE4392] hover:bg-[#FF9DDA] shadow-[0_0_10px_#FF9DDA]">
                <img 
                  src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png"
                  alt="Instagram" 
                  className="w-5 h-5"
                />
              </Button>
            </a>

            {/* Botão de Compartilhar */}
            <Button 
              className="bg-[#5E72EB] hover:bg-[#438BD3] text-white shadow-[0_0_10px_#438BD3] flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex justify-center py-2 border-t border-[#5E72EB] space-x-4">
          <Link to="/">
            <Button className="text-white bg-[#438BD3] px-4 py-2 rounded-lg shadow-[0_0_10px_#438BD3] hover:bg-[#5E72EB] transition">
              PLANOS
            </Button>
          </Link>
          <Link to="/accessories">
            <Button className="text-white bg-[#438BD3] px-4 py-2 rounded-lg shadow-[0_0_10px_#438BD3] hover:bg-[#5E72EB] transition">
              ACESSÓRIOS
            </Button>
          </Link>
          <Link to="/news">
            <Button className="text-white bg-[#438BD3] px-4 py-2 rounded-lg shadow-[0_0_10px_#438BD3] hover:bg-[#5E72EB] transition">
              NOTÍCIAS
            </Button>
          </Link>
        </div>

        {/* Mensagem de boas-vindas */}
        <div className="mt-4 flex justify-center">
          <div className="bg-[#FF9190]/90 p-4 rounded-lg shadow-[0_0_15px_#FF9190] text-center w-full max-w-md backdrop-blur-lg">
            <p className="text-lg font-semibold text-white">
              👋 Bem-vindo(a) à <span className="font-bold">Net</span>!
            </p>
            <p className="text-white">Conectando você ao melhor da internet! 🚀</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
