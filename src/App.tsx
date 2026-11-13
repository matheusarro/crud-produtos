import { useState } from "react";
import { Box } from "grommet";
import { ProductEditing, ProductRegister, ProductsList } from "./pages";
import PageEnum from "./types/page";
import productListMock from "./utils/mock";
import { ProductType } from "./types/product";

function App() {
  const [selectedPage, setSelectedPage] = useState<PageEnum>(PageEnum.LIST);
  const [allProducts, setAllProducts] = useState<ProductType[]>(
    productListMock.products,
  );
  const [selectedProductID, setSelectedProductID] = useState<
    number | undefined
  >();
  const [nextProdID, setNextProdID] = useState<number>(productListMock.next_id);

  const handlePageChange = () => {
    switch (selectedPage) {
      case PageEnum.REGISTER:
        return (
          <ProductRegister
            setSelectedPage={setSelectedPage}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            nextProdID={nextProdID}
            setNextProdID={setNextProdID}
          />
        );
      case PageEnum.EDIT:
        return (
          <ProductEditing
            setSelectedPage={setSelectedPage}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            nextProdID={nextProdID}
            setNextProdID={setNextProdID}
            selectedProductID={selectedProductID}
          />
        );
      default:
        return (
          <ProductsList
            setSelectedPage={setSelectedPage}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            setSelectedProductID={setSelectedProductID}
          />
        );
    }
  };

  return (
    <Box fill>
      <Box
        fill="vertical"
        alignSelf="center"
        alignContent="center"
        width="xlarge"
        pad="medium"
      >
        {handlePageChange()}
      </Box>
    </Box>
  );
}

export default App;
