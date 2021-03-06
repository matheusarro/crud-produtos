export function validatePriceOriginal (fieldValue, formValue) {
  switch (true) {
    case parseFloat(fieldValue) < parseFloat(formValue.price_sales): {
      return `O valor não pode ser menor que 'Preço Por'`
    }
    case parseFloat(fieldValue) < 0: {
      return `O valor não pode ser negativo`
    }
    default: {
      return
    }
  }
}

export function validatePriceSales (fieldValue, formValue) {
  switch (true) {
    case parseFloat(fieldValue) < 0: {
      return `O valor não pode ser negativo`
    }
    default: {
      return
    }
  }
}