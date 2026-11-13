import { Box, Heading } from "grommet";
import ProductForm from "../components/ProductForm/ProductForm";
import { ProductType } from "../types/product";
import PageEnum from "../types/page";

type ProductRegisterProps = {
  setSelectedPage: (page: PageEnum) => void;
  allProducts: ProductType[];
  setAllProducts: (products: ProductType[]) => void;
  nextProdID: number;
  setNextProdID: (id: number) => void;
};

const ProductRegister = ({
  setSelectedPage,
  allProducts,
  setAllProducts,
  nextProdID,
  setNextProdID,
}: ProductRegisterProps) => {
  return (
    <Box basis="auto" alignContent="center" gap="medium">
      <Heading alignSelf="center">Cadastrar Produto</Heading>

      <ProductForm
        mode="register"
        setSelectedPage={setSelectedPage}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        nextProdID={nextProdID}
        setNextProdID={setNextProdID}
      />
    </Box>
  );
};

export default ProductRegister;
