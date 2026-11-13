import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  Layer,
  Pagination,
  ResponsiveContext,
  Text,
  TextInput,
  Tip,
} from "grommet";
import { AddCircle, Edit, Search, Trash } from "grommet-icons";
import currencyFormatter from "../utils/currencyFormatter";
import { ProductType } from "../types/product";
import PageEnum from "../types/page";

type ProductsListProps = {
  setSelectedPage: (page: PageEnum) => void;
  allProducts: ProductType[];
  setAllProducts: (products: ProductType[]) => void;
  setSelectedProductID: (id: number) => void;
};

const ProductsList = ({
  setSelectedPage,
  allProducts,
  setAllProducts,
  setSelectedProductID,
}: ProductsListProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredList, setFilteredList] = useState<ProductType[]>(allProducts);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageList, setPageList] = useState<ProductType[]>([]);
  const [idToDelete, setIdToDelete] = useState<number>();
  const [showDeletionDialog, setShowDeletionDialog] = useState<boolean>(false);

  const screenSize: string = useContext(ResponsiveContext);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      const newList = allProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // para desconsiderar acentuação das palavras
            .includes(
              searchText
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            ) || product.id.toString() === searchText.trim().toLowerCase(),
      );
      setFilteredList(newList);
      setPageNumber(1);
    } else {
      setFilteredList(allProducts);
    }
  }, [searchText, allProducts]);

  useEffect(() => {
    const newPage = filteredList.slice((pageNumber - 1) * 10, pageNumber * 10);
    setPageList(newPage);
  }, [filteredList, pageNumber]);

  const handleItemEditClick = (productID: number) => {
    setSelectedProductID(productID);
    setSelectedPage(PageEnum.EDIT);
  };

  const handleItemDeleteClick = () => {
    const newList = allProducts.filter((product) => product.id !== idToDelete);
    setAllProducts(newList);
    setIdToDelete(undefined);

    if (pageNumber * 10 - 9 >= filteredList.length) {
      if (pageNumber !== 1) setPageNumber(pageNumber - 1);
    }
  };

  return (
    <Box alignContent="center" gap="medium" direction="column">
      <Heading alignSelf="center">Lista de Produtos</Heading>

      {screenSize === "small" ? (
        <Box gap="medium" margin={{ bottom: "xlarge" }}>
          <TextInput
            id="search-text-input"
            placeholder="Pesquise por código ou nome"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            icon={<Search />}
          />
          <Tip content="Cadastrar novo produto">
            <Button
              primary
              label="Novo"
              size="large"
              icon={<AddCircle />}
              onClick={() => setSelectedPage(PageEnum.REGISTER)}
            />
          </Tip>
        </Box>
      ) : (
        <Box direction="row" gap="medium">
          <TextInput
            id="search-text-input"
            placeholder="Pesquise produtos por código ou nome"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            icon={<Search />}
          />
          <Tip content="Cadastrar novo produto">
            <Button
              primary
              label="Novo"
              size="large"
              icon={<AddCircle />}
              onClick={() => setSelectedPage(PageEnum.REGISTER)}
            />
          </Tip>
        </Box>
      )}

      {screenSize === "small" ? (
        <Box fill gap="medium">
          <Grid
            rows="small"
            columns="medium"
            gap={{ row: "medium" }}
            justify="center"
          >
            {pageList.map((product) => (
              <Card
                height="small"
                width="100%"
                background="light-1"
                key={product.id}
              >
                <CardHeader pad="medium" alignSelf="center">
                  <Text weight={500}>{product.name}</Text>
                </CardHeader>

                <CardBody pad="medium" direction="row" justify="evenly">
                  <Box>
                    <Text size="medium">{`Código: ${product.id}`}</Text>
                    <Text size="medium">{`Estoque: ${product.stock.total - product.stock.cutting}`}</Text>
                  </Box>
                  <Box>
                    <Text size="medium">{`De: ${currencyFormatter(product.price.original)}`}</Text>
                    <Text size="medium">{`Por: ${currencyFormatter(product.price.sales)}`}</Text>
                  </Box>
                </CardBody>

                <CardFooter
                  pad={{ horizontal: "small" }}
                  background="light-2"
                  justify="evenly"
                >
                  <Tip content="Editar Produto">
                    <Button
                      icon={<Edit color="plain" />}
                      hoverIndicator
                      onClick={() => handleItemEditClick(product.id)}
                    />
                  </Tip>
                  <Tip content="Excluir Produto">
                    <Button
                      icon={<Trash color="red" />}
                      hoverIndicator
                      onClick={() => {
                        setShowDeletionDialog(true);
                        setIdToDelete(product.id);
                      }}
                    />
                  </Tip>
                </CardFooter>
              </Card>
            ))}
          </Grid>
          <Pagination
            numberItems={filteredList.length}
            step={10}
            page={pageNumber}
            onChange={({ page }) => setPageNumber(page)}
            alignSelf="end"
          />
        </Box>
      ) : (
        <Box gap="medium">
          <Grid
            rows="small"
            columns="small"
            gap={{ row: "medium" }}
            justify="center"
            justifyContent="between"
          >
            {pageList.map((product) => (
              <Card
                height="small"
                width="small"
                background="light-1"
                key={product.id}
              >
                <CardHeader pad="small">
                  <Text weight={500}>{product.name}</Text>
                </CardHeader>

                <CardBody pad="small" direction="row" gap="small">
                  <Box>
                    <Text size="small">{`Código: ${product.id}`}</Text>
                    <Text size="small">{`Estoque: ${product.stock.total - product.stock.cutting}`}</Text>
                  </Box>
                  <Box>
                    <Text size="small">{`De: ${currencyFormatter(product.price.original)}`}</Text>
                    <Text size="small">{`Por: ${currencyFormatter(product.price.sales)}`}</Text>
                  </Box>
                </CardBody>

                <CardFooter pad={{ horizontal: "small" }} background="light-2">
                  <Tip content="Editar Produto">
                    <Button
                      icon={<Edit color="plain" />}
                      hoverIndicator
                      onClick={() => handleItemEditClick(product.id)}
                    />
                  </Tip>
                  <Tip content="Excluir Produto">
                    <Button
                      icon={<Trash color="red" />}
                      hoverIndicator
                      onClick={() => {
                        setShowDeletionDialog(true);
                        setIdToDelete(product.id);
                      }}
                    />
                  </Tip>
                </CardFooter>
              </Card>
            ))}
          </Grid>
          <Pagination
            numberItems={filteredList.length}
            step={10}
            page={pageNumber}
            onChange={({ page }) => setPageNumber(page)}
            alignSelf="end"
          />
        </Box>
      )}

      {showDeletionDialog &&
        (screenSize === "small" ? (
          <Layer
            onEsc={() => setShowDeletionDialog(false)}
            onClickOutside={() => setShowDeletionDialog(false)}
          >
            <Box
              pad="medium"
              gap="large"
              fill="vertical"
              align="center"
              justify="center"
            >
              <Text weight="bold">Deseja realmente excluir o produto?</Text>
              <Text>A ação não poderá ser revertida após concluída.</Text>
              <Box direction="row" justify="center" gap="medium">
                <Button
                  label="Confirmar"
                  onClick={() => {
                    setShowDeletionDialog(false);
                    handleItemDeleteClick();
                  }}
                />
                <Button
                  label="Cancelar"
                  onClick={() => setShowDeletionDialog(false)}
                />
              </Box>
            </Box>
          </Layer>
        ) : (
          <Layer
            onEsc={() => setShowDeletionDialog(false)}
            onClickOutside={() => setShowDeletionDialog(false)}
          >
            <Box pad="medium" gap="medium">
              <Text weight="bold">Deseja realmente excluir o produto?</Text>
              <Text>A ação não poderá ser revertida após concluída.</Text>
              <Box direction="row" justify="center" gap="medium">
                <Button
                  label="Confirmar"
                  onClick={() => {
                    setShowDeletionDialog(false);
                    handleItemDeleteClick();
                  }}
                />
                <Button
                  label="Cancelar"
                  onClick={() => setShowDeletionDialog(false)}
                />
              </Box>
            </Box>
          </Layer>
        ))}
    </Box>
  );
};

export default ProductsList;
