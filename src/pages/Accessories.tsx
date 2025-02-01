const categories = [
  {
    title: "Destaques para Você",
    products: [
      { id: 1, name: "Nichos e Prateleiras", price: 120.00, sales: 14320, image: "URL_DA_IMAGEM" },
      { id: 2, name: "Escorredor de Cozinha", price: 89.90, sales: 6400, image: "URL_DA_IMAGEM" },
      { id: 3, name: "Acessórios de Pia", price: 45.90, sales: 11940, image: "URL_DA_IMAGEM" }
    ]
  },
  {
    title: "Descobertas do Dia",
    products: [
      { id: 4, name: "Colchão Solteiro", price: 599.00, sales: 104, image: "URL_DA_IMAGEM" },
      { id: 5, name: "Parafusadeira 25V", price: 178.21, sales: 1700, image: "URL_DA_IMAGEM" }
    ]
  }
];

return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Categorias</h1>
      
      {categories.map((category) => (
        <div key={category.title} className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <Card key={product.id} className="overflow-hidden rounded-lg shadow-lg">
                <CardHeader className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{product.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">Vendas: {product.sales}</p>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                  <Button className="w-full bg-orange-600 text-white">Comprar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </main>
  </div>
);
