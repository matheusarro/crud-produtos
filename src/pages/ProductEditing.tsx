import { Box, Heading } from "grommet";
import ProductForm from "../components/ProductForm/ProductForm";
import { ProductType } from "../types/product";
import PageEnum from "../types/page";

type ProductEditingProps = {
  setSelectedPage: (page: PageEnum) => void;
  allProducts: ProductType[];
  setAllProducts: (products: ProductType[]) => void;
  nextProdID: number;
  setNextProdID: (id: number) => void;
  selectedProductID: number | undefined;
};

const ProductEditing = ({
  setSelectedPage,
  allProducts,
  setAllProducts,
  nextProdID,
  setNextProdID,
  selectedProductID,
}: ProductEditingProps) => {
  const prodForEdit: ProductType = allProducts.filter(
    (product) => product.id === selectedProductID,
  )[0];

  return (
    <Box basis="auto" alignContent="center" gap="medium">
      <Heading alignSelf="center">Editar Produto</Heading>

      <ProductForm
        mode="edit"
        setSelectedPage={setSelectedPage}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        nextProdID={nextProdID}
        setNextProdID={setNextProdID}
        selectedProduct={prodForEdit}
      />
    </Box>
  );
};

export default ProductEditing;
