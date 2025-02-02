import { Airplane, Map } from "lucide-react"; // Ícones de turismo
import { Card } from "@/components/ui/card";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-50 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Painel Administrativo Turístico</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex items-center space-x-4 shadow-md">
          <Airplane className="w-12 h-12 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Gerenciar Pacotes</h2>
            <p className="text-gray-500 text-sm">Adicione, edite ou remova pacotes de viagem.</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4 shadow-md">
          <Map className="w-12 h-12 text-green-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Destinos Turísticos</h2>
            <p className="text-gray-500 text-sm">Gerencie os melhores destinos disponíveis.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
