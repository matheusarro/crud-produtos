// react
import { useContext, useEffect, useState } from 'react';
// grommet
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Heading, Layer, Pagination, ResponsiveContext, Text, TextInput, Tip } from 'grommet';
import { AddCircle, Edit, Search, Trash } from 'grommet-icons';
// in-house
import currencyFormatter from '../utils/currencyFormatter';


/***** exported component *****/
const ProductsList = ( {setSelectedPage, allProducts, setAllProducts, setSelectedProductID} ) => {
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(allProducts);    // lista de itens com filtro
  const [pageNumber, setPageNumber] = useState(1);    // controla a página atual a ser exibida
  const [pageList, setPageList] = useState([]);   // lista de itens a ser exibida na página
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);

  const screenSize = useContext(ResponsiveContext);   // retorna o tamanho da tela

  useEffect(() => {
    if (searchText.length > 0) {
      const newList = allProducts.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()) || product.id.toString() === searchText.toLowerCase());
      setFilteredList(newList);
      setPageNumber(1);
    } else {
      setFilteredList(allProducts);
    }
  }, [searchText, allProducts]);    // atualiza os produtos filtrados

  useEffect(() => {
    const newPage = filteredList.slice((pageNumber-1)*10, pageNumber*10);
    setPageList(newPage);
  }, [filteredList, pageNumber]);   // atualiza os produtos da página

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
    <Box alignContent='center' gap='medium' direction='column'>
      <Heading alignSelf='center'>Lista de Produtos</Heading>

      {
        screenSize === 'small'

        ?   // versão MOBILE
          
          <Box gap='medium' margin={{bottom: 'xlarge'}}>
            <TextInput
              id='serach-text-input'
              placeholder='Pesquise por código ou nome'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              icon={<Search />}
            />
            <Tip content="Cadastrar novo produto">
              <Button
                primary
                label="Novo"
                size='large'
                icon={<AddCircle />}
                onClick={() => setSelectedPage('Register Product')}
              />
            </Tip>
          </Box>
          

        :   // versão PC

          <Box direction='row' gap='medium'>
            <TextInput
              id='serach-text-input'
              placeholder='Pesquise produtos por código ou nome'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              icon={<Search />}
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
      }

      {
        screenSize === 'small'

        ?   // versão MOBILE

          <Box fill gap='medium' >
            <Grid
              rows='small'
              columns='medium'
              gap={{row: "medium"}}
              justify='center'
            >
              {
                pageList.map( product =>
                  <Card height='small' width='100%' background="light-1" key={product.id}>
                    <CardHeader pad="medium" alignSelf='center'>
                      <Text weight={500}>
                        {product.name}
                      </Text>
                    </CardHeader>

                    <CardBody pad="medium" direction='row' justify='evenly'>
                      <Box>
                        <Text size='medium'>{`Código: ${product.id}`}</Text>
                        <Text size='medium'>{`Estoque: ${product.stock.total - product.stock.cutting}`}</Text>
                      </Box>
                      <Box>
                        <Text size='medium'>{`De: ${currencyFormatter(product.price.original)}`}</Text>
                        <Text size='medium'>{`Por: ${currencyFormatter(product.price.sales)}`}</Text>
                      </Box>
                    </CardBody>

                    <CardFooter pad={{horizontal: "small"}} background="light-2" justify='evenly'>
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
            <Pagination
              numberItems={filteredList.length}
              step={10}
              page={pageNumber}
              onChange={({page}) => setPageNumber(page)}
              alignSelf='end'
            />
          </Box>

        :   // versão PC

          <Box gap='medium'>
            <Grid
              rows='small'
              columns='small'
              gap={{row: "medium"}}
              justify='center'
              justifyContent='between'
            >
              {
                pageList.map( product =>
                  <Card height="small" width="small" background="light-1" key={product.id}>
                    <CardHeader pad="small">
                      <Text weight={500}>
                        {product.name}
                      </Text>
                    </CardHeader>

                    <CardBody pad="small" direction='row' gap='small'>
                      <Box>
                        <Text size='small'>{`Código: ${product.id}`}</Text>
                        <Text size='small'>{`Estoque: ${product.stock.total - product.stock.cutting}`}</Text>
                      </Box>
                      <Box>
                        <Text size='small'>{`De: ${currencyFormatter(product.price.original)}`}</Text>
                        <Text size='small'>{`Por: ${currencyFormatter(product.price.sales)}`}</Text>
                      </Box>
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
            <Pagination
              numberItems={filteredList.length}
              step={10}
              page={pageNumber}
              onChange={({page}) => setPageNumber(page)}
              alignSelf='end'
            />
          </Box>
      }

      { showDeletionDialog && ( // somente exibe quando excluindo item

        screenSize === 'small'

        ?   // versão MOBILE

          <Layer
            onEsc={() => setShowDeletionDialog(false)}
            onClickOutside={() => setShowDeletionDialog(false)}
          >
            <Box pad='medium' gap='large' fill='vertical' align='center' justify='center'>
              <Text weight='bold'>Deseja realmente excluir o produto?</Text>
              <Text>A ação não poderá ser revertida após concluída.</Text>
              <Box direction='row' justify='center' gap='medium'>
                <Button label="Confirmar" onClick={() => {setShowDeletionDialog(false); handleItemDeleteClick();}} />
                <Button label="Cancelar" onClick={() => setShowDeletionDialog(false)} />
              </Box>
            </Box>
          </Layer>

        :   // versão PC

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