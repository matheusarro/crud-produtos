// grommet
import { Box, Heading} from 'grommet';
import ProductForm from '../components/ProductForm';


/***** exported component *****/
const ProductRegister = ( {setSelectedPage, allProducts, setAllProducts, nextProdID, setNextProdID} ) => {

  return (
    <Box basis='auto' alignContent='center' gap='medium'>
      <Heading alignSelf='center'>Cadastrar Produto</Heading>

      <ProductForm mode='register' setSelectedPage={setSelectedPage} allProducts={allProducts} setAllProducts={setAllProducts} nextProdID={nextProdID} setNextProdID={setNextProdID} />
    </Box>
  )
};

export default ProductRegister;