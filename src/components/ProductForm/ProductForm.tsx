import { useContext, useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  TextInput,
} from "grommet";
import {
  validatePriceOriginal,
  validatePriceSales,
} from "../../utils/productFormValidations";
import { ProductType, ProductFormType } from "../../types/product";
import convertProductToProductFormType from "../../utils/convertProductToProductFormType";
import PageEnum from "../../types/page";

const formInitialValue: ProductFormType = {
  id: 0,
  name: "",
  stock_total: 0,
  stock_cutting: 0,
  price_original: 0.0,
  price_sales: 0.0,
};

type ProductFormProps = {
  mode: "register" | "edit";
  setSelectedPage: (page: PageEnum) => void;
  allProducts: ProductType[];
  setAllProducts: (products: ProductType[]) => void;
  nextProdID: number;
  setNextProdID: (id: number) => void;
  selectedProduct?: ProductType;
};

const ProductForm = ({
  mode,
  setSelectedPage,
  allProducts,
  setAllProducts,
  nextProdID,
  setNextProdID,
  selectedProduct,
}: ProductFormProps) => {
  const [formValue, setFormValue] = useState<ProductFormType>(
    selectedProduct
      ? convertProductToProductFormType(selectedProduct)
      : { ...formInitialValue, id: nextProdID },
  );

  const screenSize: string = useContext(ResponsiveContext);

  const handleSave = () => {
    const productInfo: ProductType = {
      id: formValue.id,
      name: formValue.name,
      stock: {
        total: formValue.stock_total,
        cutting: formValue.stock_cutting,
      },
      price: {
        original: formValue.price_original,
        sales: formValue.price_sales,
      },
    };

    if (mode === "register") {
      const newProductList = allProducts;
      newProductList.push(productInfo);
      setAllProducts(newProductList);
      setNextProdID(nextProdID + 1);
    } else {
      const newProductList = allProducts.filter(
        (product) => product.id !== productInfo.id,
      );
      newProductList.push(productInfo);
      newProductList.sort((a, b) => a.id - b.id);
      setAllProducts(newProductList);
    }

    setSelectedPage(PageEnum.LIST);
  };

  return (
    <Box>
      <Form
        value={formValue}
        messages={{ invalid: "Inválido", required: "Obrigatório" }}
        onChange={(nextValue) => setFormValue(nextValue)}
        onReset={() =>
          setFormValue({
            id: nextProdID,
            name: "",
            stock_total: 0,
            stock_cutting: 0,
            price_original: 0.0,
            price_sales: 0.0,
          })
        }
        onSubmit={() => handleSave()}
      >
        {screenSize === "small" ? (
          <>
            <Box>
              <FormField name="id" htmlFor="product-id" label="Código" disabled>
                <TextInput id="product-id" name="id" type="number" disabled />
              </FormField>

              <FormField
                name="name"
                htmlFor="product-name"
                label="Nome"
                required
              >
                <TextInput
                  id="product-name"
                  name="name"
                  placeholder="Nome do Produto"
                />
              </FormField>

              <FormField
                name="stock_total"
                htmlFor="product-stock-total"
                label="Estoque Total"
                required
              >
                <TextInput
                  id="product-stock-total"
                  name="stock_total"
                  type="number"
                  min={0}
                />
              </FormField>

              <FormField
                name="stock_cutting"
                htmlFor="product-stock-cutting"
                label="Estoque Corte"
                required
              >
                <TextInput
                  id="product-stock-cutting"
                  name="stock_cutting"
                  type="number"
                  min={0}
                />
              </FormField>

              <FormField
                name="stock_available"
                htmlFor="product-stock-available"
                label="Estoque Disponível"
                disabled
              >
                <TextInput
                  id="product-stock-available"
                  name="stock_available"
                  disabled
                  value={formValue.stock_total - formValue.stock_cutting}
                />
              </FormField>

              <FormField
                name="price_original"
                htmlFor="product-price-original"
                label="Preço De"
                required
                validate={(fieldData: number, formData: ProductFormType) =>
                  validatePriceOriginal(fieldData, formData)
                }
              >
                <TextInput
                  id="product-price-original"
                  name="price_original"
                  type="number"
                  min={0}
                  step={0.01}
                />
              </FormField>

              <FormField
                name="price_sales"
                htmlFor="product-price-sales"
                label="Preço Por"
                required
                validate={(fieldData: number, formData: ProductFormType) =>
                  validatePriceSales(fieldData, formData)
                }
              >
                <TextInput
                  id="product-price-sales"
                  name="price_sales"
                  type="number"
                  min={0}
                  step={0.01}
                />
              </FormField>
            </Box>

            <Box justify="center" gap="medium" pad={{ top: "medium" }}>
              <Button type="submit" primary label="Salvar" />
              {mode === "register" ? (
                <Button type="reset" label="Limpar" />
              ) : (
                ""
              )}
              <Button
                type="button"
                label="Cancelar"
                onClick={() => setSelectedPage(0)}
              />
            </Box>
          </>
        ) : (
          <Box align="center">
            <Box>
              <Box direction="row" gap="medium">
                <FormField
                  name="id"
                  htmlFor="product-id"
                  label="Código"
                  disabled
                >
                  <TextInput id="product-id" name="id" type="number" disabled />
                </FormField>

                <FormField
                  name="name"
                  htmlFor="product-name"
                  label="Nome"
                  required
                  flex="grow"
                >
                  <TextInput
                    id="product-name"
                    name="name"
                    placeholder="Nome do Produto"
                  />
                </FormField>
              </Box>

              <Box direction="row" gap="medium">
                <FormField
                  name="stock_total"
                  htmlFor="product-stock-total"
                  label="Estoque Total"
                  required
                >
                  <TextInput
                    id="product-stock-total"
                    name="stock_total"
                    type="number"
                    min={0}
                  />
                </FormField>

                <FormField
                  name="stock_cutting"
                  htmlFor="product-stock-cutting"
                  label="Estoque Corte"
                  required
                >
                  <TextInput
                    id="product-stock-cutting"
                    name="stock_cutting"
                    type="number"
                    min={0}
                  />
                </FormField>

                <FormField
                  name="stock_available"
                  htmlFor="product-stock-available"
                  label="Estoque Disponível"
                  disabled
                >
                  <TextInput
                    id="product-stock-available"
                    name="stock_available"
                    disabled
                    value={formValue.stock_total - formValue.stock_cutting}
                  />
                </FormField>
              </Box>

              <Box direction="row" gap="medium">
                <FormField
                  name="price_original"
                  htmlFor="product-price-original"
                  label="Preço De"
                  required
                  validate={(fieldData: number, formData: ProductFormType) =>
                    validatePriceOriginal(fieldData, formData)
                  }
                >
                  <TextInput
                    id="product-price-original"
                    name="price_original"
                    type="number"
                    min={0}
                    step={0.01}
                  />
                </FormField>
                0
                <FormField
                  name="price_sales"
                  htmlFor="product-price-sales"
                  label="Preço Por"
                  required
                  validate={(fieldData: number, formData: ProductFormType) =>
                    validatePriceSales(fieldData, formData)
                  }
                >
                  <TextInput
                    id="product-price-sales"
                    name="price_sales"
                    type="number"
                    min={0}
                    step={0.01}
                  />
                </FormField>
              </Box>
            </Box>

            <Box
              direction="row"
              justify="center"
              gap="medium"
              pad={{ top: "medium" }}
            >
              <Button type="submit" primary label="Salvar" />
              {mode === "register" ? (
                <Button type="reset" label="Limpar" />
              ) : (
                ""
              )}
              <Button
                type="button"
                label="Cancelar"
                onClick={() => setSelectedPage(0)}
              />
            </Box>
          </Box>
        )}
      </Form>
    </Box>
  );
};

export default ProductForm;
