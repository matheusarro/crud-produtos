// react
import { useState } from 'react';
// grommet
import { Box } from 'grommet';
// in-house
import { ProductEditing, ProductRegister, ProductsList } from './pages';
import PRODS_INFO from './utils/products.json';


function App() {
  const [selectedPage, setSelectedPage] = useState('');
  const [allProducts, setAllProducts] = useState(PRODS_INFO.products);
  const [selectedProductID, setSelectedProductID] = useState();
  const [nextProdID, setNextProdID] = useState(PRODS_INFO.next_id);

  const handlePageChange = () => {
    switch (selectedPage) {
      case 'Register Product':
        return <ProductRegister
          setSelectedPage={setSelectedPage}
          allProducts={allProducts} setAllProducts={setAllProducts}
          nextProdID={nextProdID} setNextProdID={setNextProdID} />
      case 'Edit Product':
        return <ProductEditing
          setSelectedPage={setSelectedPage}
          allProducts={allProducts} setAllProducts={setAllProducts}
          nextProdID={nextProdID} setNextProdID={setNextProdID}
          selectedProductID={selectedProductID} />
      default:
        return <ProductsList setSelectedPage={setSelectedPage} allProducts={allProducts} setAllProducts={setAllProducts} setSelectedProductID={setSelectedProductID} />
    }
  }

  return (
    <Box fill>
      <Box fill='vertical' alignSelf='center' alignContent='center' width='xlarge' pad='medium'>
        {
          handlePageChange()
        }
      </Box>
    </Box>
  );
}

export default App;
