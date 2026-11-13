import { ProductFormType } from "../types/product";

export function validatePriceOriginal(
  fieldValue: number,
  formValue: ProductFormType,
) {
  switch (true) {
    case fieldValue < formValue.price_sales: {
      return "O valor não pode ser menor que 'Preço Por'";
    }
    case fieldValue < 0: {
      return "O valor não pode ser negativo";
    }
    default: {
      return;
    }
  }
}

export function validatePriceSales(
  fieldValue: number,
  formValue: ProductFormType,
) {
  switch (true) {
    case fieldValue < 0: {
      return "O valor não pode ser negativo";
    }
    case fieldValue >= formValue.price_original: {
      return "O valor de venda deve ser menor que o Preço Original";
    }
    default: {
      return;
    }
  }
}
