type ProductType = {
  id: number;
  name: string;
  stock: {
    total: number;
    cutting: number;
  };
  price: {
    original: number;
    sales: number;
  };
};

type ProductMockType = {
  next_id: number;
  products: ProductType[];
};

type ProductFormType = {
  id: number;
  name: string;
  stock_total: number;
  stock_cutting: number;
  price_original: number;
  price_sales: number;
};

export type { ProductType, ProductMockType, ProductFormType };
