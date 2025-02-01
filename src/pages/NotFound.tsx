import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar uma rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-700 mt-2">Oops! Página não encontrada</p>
        <p className="text-gray-500 mt-2">
          A URL <span className="font-mono text-red-500">{location.pathname}</span> não existe.
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition">
            Voltar para Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
