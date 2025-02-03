import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Rocket } from "lucide-react";

const Index = () => {
  const plans = [
    {
      title: "NET PÓS",
      category: "Plano Premium",
      price: 119.90,
      gb: 50,
      sales: 1200,
      features: [
        { text: "Passaporte Américas para usar seu celular no exterior", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
        { text: "GB para redes sociais e vídeos", icon: <Rocket className="w-5 h-5 text-purple-400" /> },
        { text: "WhatsApp ilimitado", icon: <MessageCircle className="w-5 h-5 text-green-400" /> },
        { text: "Internet de uso livre", icon: <Zap className="w-5 h-5 text-blue-400" /> }
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
    },
    {
      title: "NET CONTROLE",
      category: "Plano Essencial",
      price: 54.90,
      gb: 25,
      sales: 800,
      features: [
        { text: "5G mais rápido do Brasil", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
        { text: "Ligações ilimitadas", icon: <Rocket className="w-5 h-5 text-purple-400" /> },
        { text: "YouTube ilimitado", icon: <MessageCircle className="w-5 h-5 text-green-400" /> },
        { text: "+2GB bônus todo mês", icon: <Zap className="w-5 h-5 text-blue-400" /> }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Planos de Internet
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Escolha o plano ideal para sua conexão ultrarrápida 🚀
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              isPopular={index === 0}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/30 hover:scale-[1.02]"
              buttonClassName="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
              salesText={
                <span className="text-sm bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">
                  {plan.sales >= 1000 ? 
                    `${(plan.sales/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                    `${plan.sales} vendas`}
                </span>
              }
              priceClassName="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              titleClassName="text-2xl font-bold text-slate-100"
              categoryClassName="text-sm font-semibold text-cyan-400 uppercase tracking-wide"
            />
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 animate-float">
        <a 
          href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Gostaria de suporte.")}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl border border-white/20">
            <MessageCircle className="w-7 h-7" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
