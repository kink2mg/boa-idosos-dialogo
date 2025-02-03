import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Globe, Shield, InfinityIcon } from "lucide-react";

const Index = () => {
  const plans = [
    {
      title: "NET EVOLUTION",
      category: "Plano Premium",
      price: 119.90,
      features: [
        { text: "Roaming Internacional Premium", icon: <Globe className="w-6 h-6 text-emerald-600" /> },
        { text: "Velocidade 5G Ultra", icon: <Zap className="w-6 h-6 text-lime-500" /> },
        { text: "WhatsApp Ilimitado Global", icon: <MessageCircle className="w-6 h-6 text-emerald-500" /> },
        { text: "Proteção Digital Total", icon: <Shield className="w-6 h-6 text-lime-400" /> }
      ],
      highlight: "Mais vendido",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500"
    },
    {
      title: "NET ESSENTIAL",
      category: "Plano Básico",
      price: 54.90,
      features: [
        { text: "5G Nacional", icon: <Zap className="w-6 h-6 text-lime-500" /> },
        { text: "Ligações Ilimitadas", icon: <InfinityIcon className="w-6 h-6 text-emerald-500" /> },
        { text: "YouTube Premium", icon: <MessageCircle className="w-6 h-6 text-emerald-500" /> },
        { text: "Bônus Mensal de Dados", icon: <Shield className="w-6 h-6 text-lime-400" /> }
      ],
      highlight: "Econômico",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-800 to-lime-600 bg-clip-text text-transparent">
            Conecte-se ao Futuro
          </h1>
          <p className="text-emerald-800/80 text-lg md:text-xl max-w-2xl mx-auto">
            Internet de alta performance com tecnologia de última geração
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-100 hover:border-lime-200 transition-all duration-300 group"
              contentClassName="p-8 space-y-6"
              headerClassName="mb-6"
              titleClassName="text-2xl font-black text-emerald-900 group-hover:text-lime-700 transition-colors"
              categoryClassName="text-sm font-semibold text-lime-600 uppercase tracking-wide"
              priceClassName="text-4xl font-bold text-emerald-900"
              featureClassName="text-emerald-800/90 hover:text-emerald-900 transition-colors"
              buttonClassName="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-lime-200"
              highlight={
                <div className="absolute top-4 right-4 bg-emerald-900 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  {plan.highlight}
                </div>
              }
              imageWrapperClassName="relative h-48 overflow-hidden bg-emerald-50"
              imageClassName="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-emerald-900/5 px-6 py-3 rounded-full border border-emerald-100">
            <Shield className="w-5 h-5 text-emerald-700 mr-2" />
            <span className="text-sm text-emerald-800">
              Todos os planos incluem garantia de conexão 24h
            </span>
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-8 animate-float">
        <a
          href={`https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Gostaria de contratar um plano.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-emerald-900 hover:bg-emerald-800 text-white h-14 w-14 rounded-full shadow-xl flex items-center justify-center border-2 border-white/20">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Index;
