// react
import { useEffect, useState } from 'react';
// grommet
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Heading, Layer, Text, TextInput, Tip } from 'grommet';
import { AddCircle, Edit, Trash } from 'grommet-icons';
// in-house
import currencyFormatter from '../utils/currencyFormatter';


/***** exported component *****/
const ProductsList = ( {setSelectedPage, allProducts, setAllProducts, setSelectedProductID} ) => {
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(allProducts);
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);

  useEffect(() => {
    const newList = allProducts.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()) || product.id.toString() === searchText.toLowerCase());
    setFilteredList(newList);
  }, [searchText, allProducts]);

  const handleItemEditClick = (productID) => {
    setSelectedProductID(productID);
    setSelectedPage('Edit Product');
  };

  const handleItemDeleteClick = () => {
    const newList = allProducts.filter(product => product.id !== idToDelete);    // retorna todos, exceto o código a ser excluído
    setAllProducts(newList);
    setIdToDelete(undefined);
  };

  return (
    <Box basis='auto' alignContent='center' gap='medium'>
      <Heading alignSelf='center'>Lista de Produtos</Heading>

      <Box direction='row' gap='medium'>
        <TextInput
          placeholder="Pesquise o produto por código ou nome"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />
        <Tip content="Cadastrar novo produto">
          <Button primary
            label="Novo"
            size='large'
            icon={<AddCircle />}
            onClick={() => setSelectedPage('Register Product')}
          />
        </Tip>
      </Box>

      <Box>
        <Grid
          rows='small'
          columns='small'
          gap={{row: "medium"}}
          justify='center'
          justifyContent='between'
        >
          {
            filteredList.map( product =>
              <Card height="small" width="small" background="light-1" key={product.id}>
                <CardHeader pad="small">{product.name}</CardHeader>

                <CardBody pad="small">
                  <Text size='xsmall'>{`Código: ${product.id}`}</Text>
                  <Text size='xsmall'>{`Estoque: ${product.stock.total - product.stock.cutting}`}</Text>
                  <Text size='xsmall'>{`De: ${currencyFormatter(product.price.original)}`}</Text>
                  <Text size='xsmall'>{`Por: ${currencyFormatter(product.price.sales)}`}</Text>
                </CardBody>

                <CardFooter pad={{horizontal: "small"}} background="light-2">
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
                      onClick={() => {setShowDeletionDialog(true); setIdToDelete(product.id)}}
                    />
                  </Tip>
                </CardFooter>
              </Card>
            )
          }
        </Grid>
      </Box>

      {showDeletionDialog && (
        <Layer
          onEsc={() => setShowDeletionDialog(false)}
          onClickOutside={() => setShowDeletionDialog(false)}
        >
          <Box pad='medium' gap='medium'>
            <Text weight='bold'>Deseja realmente excluir o produto?</Text>
            <Text>A ação não poderá ser revertida após concluída.</Text>
            <Box direction='row' justify='center' gap='medium'>
              <Button label="Confirmar" onClick={() => {setShowDeletionDialog(false); handleItemDeleteClick();}} />
              <Button label="Cancelar" onClick={() => setShowDeletionDialog(false)} />
            </Box>
          </Box>
        </Layer>
      )}

    </Box>
  )
};

export default ProductsList;