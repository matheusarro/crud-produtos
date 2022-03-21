// grommet
import { Box, Heading} from 'grommet';
import ProductForm from '../components/ProductForm';


/***** exported component *****/
const ProductEditing = ( {setSelectedPage, allProducts, setAllProducts, nextProdID, setNextProdID, selectedProductID} ) => {

  const selectProductForEditing = () => {
    const prodForEdit = allProducts.filter( product => product.id === selectedProductID)[0];
    return prodForEdit;
  }

  return (
    <Box basis='auto' alignContent='center' gap='medium'>
      <Heading alignSelf='center'>Editar Produto</Heading>

      <ProductForm mode='editing'
        setSelectedPage={setSelectedPage}
        allProducts={allProducts} setAllProducts={setAllProducts}
        nextProdID={nextProdID} setNextProdID={setNextProdID}
        selectedProduct={selectProductForEditing()}
      />
    </Box>
  )
};

export default ProductEditing;