import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Rocket, ShieldCheck, Globe } from "lucide-react";

const Index = () => {
  const plans = [
    {
      title: "NET PÓS",
      category: "Plano Premium",
      price: 119.90,
      gb: 50,
      sales: 1200,
      features: [
        { text: "Passaporte Américas para usar seu celular no exterior", icon: <Globe className="w-5 h-5 text-emerald-400" /> },
        { text: "GB para redes sociais e vídeos", icon: <Zap className="w-5 h-5 text-lime-300" /> },
        { text: "WhatsApp ilimitado", icon: <MessageCircle className="w-5 h-5 text-white" /> },
        { text: "Internet de uso livre", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> }
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
        { text: "5G mais rápido do Brasil", icon: <Zap className="w-5 h-5 text-lime-300" /> },
        { text: "Ligações ilimitadas", icon: <Rocket className="w-5 h-5 text-emerald-400" /> },
        { text: "YouTube ilimitado", icon: <MessageCircle className="w-5 h-5 text-white" /> },
        { text: "+2GB bônus todo mês", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-300 to-emerald-500 bg-clip-text text-transparent mb-4">
            Planos de Internet
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Conecte-se ao futuro com nossa rede de alta velocidade 🚀
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              {...plan} 
              isPopular={index === 0}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-800 rounded-3xl p-6 transform transition-all duration-300 hover:border-emerald-500/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
              buttonClassName="bg-gradient-to-r from-lime-300 to-emerald-500 hover:from-lime-400 hover:to-emerald-600 text-gray-900 font-semibold rounded-xl"
              salesText={
                <span className="text-sm bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                  {plan.sales >= 1000 ? 
                    `${(plan.sales/1000).toFixed(1).replace('.', ',')} mil vendas` : 
                    `${plan.sales} vendas`}
                </span>
              }
              priceClassName="text-4xl font-bold bg-gradient-to-r from-lime-300 to-emerald-500 bg-clip-text text-transparent"
              titleClassName="text-2xl font-bold text-white"
              categoryClassName="text-sm font-semibold text-lime-300 uppercase tracking-wide"
              featureClassName="text-gray-300 hover:text-white transition-colors"
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
          <Button className="bg-gradient-to-r from-lime-300 to-emerald-500 hover:from-lime-400 hover:to-emerald-600 text-gray-900 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl shadow-emerald-500/20 border-2 border-white/10">
            <MessageCircle className="w-7 h-7" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
