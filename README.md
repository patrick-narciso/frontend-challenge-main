# Desafio Front-end

Gerenciador de transações financeiras

## Sumário

- [Sobre o desafio](./CHALLENGE.md)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Comandos](#comandos)

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Formik](https://formik.org/docs/overview)
## Estrutura do projeto

```
📦 src
 ┣ 📂 assets (arquivos como ícones svg, png etc.)
 ┣ 📂 commons (quando não são componentes, e devem ser reutilizáveis)
 ┣ 📂 components (para componentes reutilizáveis)
 ┣ 📂 modules (módulos com lógica de negócio/duck files)
 ┣ 📂 pages (as views de fato, são chamadas pelas rotas)
 ┣ 📂 services (integração com api, separados por feature)
 ┣ 📂 stories (stories dos componentes reutilizáveis utilizando storybook, ex: Botão etc...)
 ┣ 📂 utils (helpers, ex: funções de format, config de ambiente etc...)
 ┣ 📜 App.js (componente principal, onde ficam os providers)
 ┣ 📜 reducers.js (onde ficam os reducers combinados)
 ┗ 📜 store.ts (configuração da redux store)
```

## Requisitos

- Node v12.18.2 +
- Yarn v1.22.0 +

## Instalação

Execute o comando `yarn` para instalar as dependências do projeto.

## Rodando a aplicação

1. Execute `yarn server` para executar a API;
1. Execute `yarn start` para rodar a aplicação React.

## Comandos

- `yarn start`: executa o projeto
- `yarn build`: cria o build para produção
- `yarn test`: executa os testes
- `yarn test:coverage`: executa os testes e coleta cobertura
- `yarn server`: executa a api para usar com o projeto
- `yarn run storybook`: executa storybook na porta 6006 para visulizar os componentes