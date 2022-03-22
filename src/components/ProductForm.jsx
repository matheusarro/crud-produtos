// react
import { useContext, useState } from 'react';
// grommet
import { Box, Button, Form, FormField, ResponsiveContext, TextInput } from 'grommet';
// in-house
import { validatePriceOriginal, validatePriceSales } from '../utils/productFormValidations';


/***** exported component ******/
const ProductForm = ( {mode, setSelectedPage, allProducts, setAllProducts, nextProdID, setNextProdID, selectedProduct} ) => {
  const [formValue, setFormValue] = useState({
    id: selectedProduct?.id ? selectedProduct.id : nextProdID,
    name: selectedProduct?.name ? selectedProduct.name : '',
    stock_total: selectedProduct?.stock?.total ? selectedProduct.stock.total : 0,
    stock_cutting: selectedProduct?.stock?.cutting ? selectedProduct.stock.cutting : 0,
    stock_avaiable: 0,
    price_original: selectedProduct?.price?.original ? selectedProduct.price.original : 0.00,
    price_sales: selectedProduct?.price?.sales ? selectedProduct.price.sales : 0.00
  });   // valores iniciais para controle do formulário

  const screenSize = useContext(ResponsiveContext);   // retorna o tamanho da tela

  return (
    <Box>
      <Form
        value={formValue}
        messages={{ invalid: "Inválido", required: "Obrigatório" }}
        onChange={nextValue => setFormValue(nextValue)}
        onReset={() => setFormValue({
          id: nextProdID,
          name: '',
          stock_total: 0,
          stock_cutting: 0,
          stock_avaiable: 0,
          price_original: 0.00,
          price_sales: 0.00
        })}
        onSubmit={() => {
          const productInfo = {
            id: formValue.id,
            name: formValue.name,
            stock: {
              total: parseFloat(formValue.stock_total),
              cutting: parseFloat(formValue.stock_cutting)
            },
            price: {
              original: parseFloat(formValue.price_original),
              sales: parseFloat(formValue.price_sales)
            }
          };

          if (mode === 'register') {  // cadastrando
            const newProductList = allProducts;
            newProductList.push(productInfo);
            setAllProducts(newProductList);
            setNextProdID(nextProdID + 1);
          } else {    // editando
            const newProductList = allProducts.filter(product => product.id !== productInfo.id);  // todos os produtos, exceto o editado
            newProductList.push(productInfo);
            newProductList.sort((a,b) => a.id - b.id);    // reordena já com a edição inclusa
            setAllProducts(newProductList);
          }

          setSelectedPage('');  // muda o estado para voltar a página inicial
        }}
      >

        {
          screenSize === 'small'

          ?   // versão MOBILE

            <>
              <Box>
                <FormField name="id" htmlFor="product-id" label="Código" disabled>
                  <TextInput id="product-id" name="id" type='number' disabled />
                </FormField>

                <FormField name="name" htmlFor="product-name" label="Nome" required>
                  <TextInput id="product-name" name="name" placeholder='Nome do Produto' />
                </FormField>

                <FormField name="stock_total" htmlFor="product-stock-total" label="Estoque Total" required>
                  <TextInput id="product-stock-total" name="stock_total" type='number' min={0} />
                </FormField>

                <FormField name="stock_cutting" htmlFor="product-stock-cutting" label="Estoque Corte" required>
                  <TextInput id="product-stock-cutting" name="stock_cutting" type='number' min={0} />
                </FormField>

                <FormField name="stock_avaiable" htmlFor="product-stock-avaiable" label="Estoque Disponível" disabled >
                  <TextInput id="product-stock-avaiable" name="stock_avaiable" disabled value={formValue.stock_total - formValue.stock_cutting} />
                </FormField>

                <FormField name="price_original" htmlFor="product-price-original" label="Preço De" required validate={(fieldData, formData) => validatePriceOriginal(fieldData, formData)}>
                  <TextInput id="product-price-original" name="price_original" type='number' min={0} step={0.01} />
                </FormField>

                <FormField name="price_sales" htmlFor="product-price-sales" label="Preço Por" required validate={(fieldData, formData) => validatePriceSales(fieldData, formData)}>
                  <TextInput id="product-price-sales" name="price_sales" type='number' min={0} step={0.01} />
                </FormField>
              </Box>

              <Box justify='center' gap="medium" pad={{top: 'medium'}}>
                <Button type="submit" primary label="Salvar" />
                {
                  mode === 'register'
                  ?
                    <Button type="reset" label="Limpar" />
                  : 
                    ''
                }
                <Button type="button" label="Cancelar" onClick={() => setSelectedPage('')} />
              </Box>
            </>

          :   // versão PC

            <Box align='center'>
              <Box>
                <Box direction='row' gap='medium'>
                  <FormField name="id" htmlFor="product-id" label="Código" disabled>
                    <TextInput id="product-id" name="id" type='number' disabled />
                  </FormField>

                  <FormField name="name" htmlFor="product-name" label="Nome" required flex='grow'>
                    <TextInput id="product-name" name="name" placeholder='Nome do Produto' />
                  </FormField>
                </Box>

                <Box direction='row' gap='medium'>
                  <FormField name="stock_total" htmlFor="product-stock-total" label="Estoque Total" required>
                    <TextInput id="product-stock-total" name="stock_total" type='number' min={0} />
                  </FormField>

                  <FormField name="stock_cutting" htmlFor="product-stock-cutting" label="Estoque Corte" required>
                    <TextInput id="product-stock-cutting" name="stock_cutting" type='number' min={0} />
                  </FormField>

                  <FormField name="stock_avaiable" htmlFor="product-stock-avaiable" label="Estoque Disponível" disabled >
                    <TextInput id="product-stock-avaiable" name="stock_avaiable" disabled value={formValue.stock_total - formValue.stock_cutting} />
                  </FormField>
                </Box>

                <Box direction='row' gap='medium'>
                  <FormField name="price_original" htmlFor="product-price-original" label="Preço De" required validate={(fieldData, formData) => validatePriceOriginal(fieldData, formData)}>
                    <TextInput id="product-price-original" name="price_original" type='number' min={0} step={0.01} />
                  </FormField>

                  <FormField name="price_sales" htmlFor="product-price-sales" label="Preço Por" required validate={(fieldData, formData) => validatePriceSales(fieldData, formData)}>
                    <TextInput id="product-price-sales" name="price_sales" type='number' min={0} step={0.01} />
                  </FormField>
                </Box>
              </Box>

              <Box direction="row" justify='center' gap="medium" pad={{top: 'medium'}}>
                <Button type="submit" primary label="Salvar" />
                {
                  mode === 'register'
                  ?
                    <Button type="reset" label="Limpar" />
                  : 
                    ''
                }
                <Button type="button" label="Cancelar" onClick={() => setSelectedPage('')} />
              </Box>
            </Box>
        }
        
      </Form>
    </Box>
  );
};

export default ProductForm;