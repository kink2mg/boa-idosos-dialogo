export const usePlanFormatter = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatSales = (sales: number) => {
    if (sales >= 1000000) {
      return `${(sales / 1000000).toFixed(1).replace('.', ',')}M vendas`;
    } else if (sales >= 1000) {
      return `${(sales / 1000).toFixed(1).replace('.', ',')}k vendas`;
    }
    return `${sales} vendas`;
  };

  return { formatPrice, formatSales };
};
