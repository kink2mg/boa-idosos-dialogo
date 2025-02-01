import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <a href="/" className="text-white text-2xl font-bold">Net</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white/10">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white/10">
              <img 
                src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png" 
                alt="WhatsApp" 
                className="w-5 h-5"
              />
            </Button>
            <Button 
              variant="secondary" 
              className="bg-[#1EAEDB] text-white hover:bg-[#0FA0CE] border-none"
            >
              Contrate
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between py-2 border-t border-red-700">
          <a href="#celular" className="text-white hover:text-gray-200 text-sm">PARA SEU CELULAR</a>
          <a href="#casa" className="text-white hover:text-gray-200 text-sm">PARA SUA CASA</a>
          <a href="#empresa" className="text-white hover:text-gray-200 text-sm">PARA SUA EMPRESA</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;