import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" className="text-white lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="text-white text-2xl font-bold">Net</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
              <Phone className="w-5 h-5 text-primary" />
            </Button>
            <Button variant="ghost" className="text-white rounded-full w-10 h-10 p-0 bg-white">
              <img 
                src="/lovable-uploads/b2f7cbf4-4974-485f-a06f-687903ad90eb.png" 
                alt="WhatsApp" 
                className="w-5 h-5"
              />
            </Button>
            <Button 
              variant="secondary" 
              className="bg-green-500 text-white hover:bg-green-600 border-none"
            >
              Contrate
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center py-2 border-t border-red-700 space-x-4">
          <Button 
            variant="ghost" 
            className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={() => window.location.href = '/accessories'}
          >
            ACESSÓRIOS
          </Button>
          <Button 
            variant="ghost" 
            className="text-white bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={() => window.location.href = '/news'}
          >
            NOTÍCIAS
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;