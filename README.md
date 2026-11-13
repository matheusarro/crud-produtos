# Cadastro de Produtos

Este projeto nasceu como um exercício de aprendizado de React e está sendo retomado como um espaço para experimentar tecnologias atuais e evoluir o código — por curiosidade e pelo prazer de construir.

A aplicação simula o cadastro, a edição e a exclusão de produtos, incluindo informações de estoque e preço. Ainda não há integração com API ou banco de dados; os dados são mockados e a lista inicial está em `src/utils/products.json`.

## Como Executar Localmente
É necessário ter o Node.js 20.19+ ou 22.12+ e o Yarn instalados.

Na raiz do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
yarn
yarn dev
```

A aplicação estará disponível em http://localhost:5173. O servidor atualiza a página automaticamente quando os arquivos são alterados.

Para verificar os tipos, executar o lint ou gerar o build de produção:

```bash
yarn typecheck
yarn lint
yarn build
```

## Deploys Ativos
 [![Netlify Status](https://api.netlify.com/api/v1/badges/9f02f1b6-6704-4952-8ae4-dc3bbe136b51/deploy-status)](https://ma-crud-produtos.netlify.app/)

## Tecnologias
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Grommet](https://v2.grommet.io/)
- [Grommet Icons](https://icons.grommet.io/)
- [Styled Components](https://styled-components.com/)

#### Prévia

![image](https://user-images.githubusercontent.com/68196346/159554546-854849cc-8a70-44de-adab-4b3c030d652c.png)
