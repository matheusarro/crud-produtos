import { ProductFormType, ProductType } from "../types/product";

const convertProductToProductFormType = (
  product: ProductType,
): ProductFormType => {
  return {
    id: product.id,
    name: product.name,
    stock_total: product.stock.total,
    stock_cutting: product.stock.cutting,
    price_original: product.price.original,
    price_sales: product.price.sales,
  };
};

export default convertProductToProductFormType;
