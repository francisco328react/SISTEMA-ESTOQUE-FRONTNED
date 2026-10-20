
# Sistema de Estoque: Frontend

Interface web do Sistema de Estoque, desenvolvida com **React**, **TypeScript** e **Vite**, com componentes visuais do **HeroUI** e estilização com **Tailwind CSS**.

<!-- TODO: descreva em 1 ou 2 frases o objetivo do sistema (ex.: controle de entrada e saída de produtos, categorias, fornecedores). -->

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Integração com o back-end](#integração-com-o-back-end)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Autor](#autor)

## Funcionalidades

<!-- TODO: liste as telas e funcionalidades reais do sistema. Exemplos:
- Login e autenticação
- Dashboard com indicadores de estoque
- Cadastro, edição e exclusão de produtos
- Movimentações de entrada e saída
- Cadastro de categorias e fornecedores
- Relatórios -->

## Tecnologias

| Categoria     | Tecnologia                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | [React 19](https://react.dev/)                                |
| Linguagem     | [TypeScript](https://www.typescriptlang.org/)                 |
| Build         | [Vite 7](https://vite.dev/)                                   |
| Estilização   | [Tailwind CSS 4](https://tailwindcss.com/)                    |
| Componentes   | [HeroUI](https://www.heroui.com/)                             |
| Rotas         | [React Router 7](https://reactrouter.com/)                    |
| Requisições   | [Axios](https://axios-http.com/)                              |
| Validação     | [Zod](https://zod.dev/)                                       |
| Animações     | [Framer Motion](https://www.framer.com/motion/)               |
| Ícones        | [Lucide React](https://lucide.dev/)                           |
| Qualidade     | [ESLint 9](https://eslint.org/) com typescript-eslint         |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (o projeto possui `package-lock.json`)
- O back-end do sistema em execução, para as telas que consomem a API

## Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/francisco328react/SISTEMA-ESTOQUE-FRONTNED.git
cd SISTEMA-ESTOQUE-FRONTNED
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` (porta padrão do Vite).

## Scripts disponíveis

| Comando           | Descrição                                              |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento                   |
| `npm run build`   | Verifica os tipos com `tsc` e gera o build de produção |
| `npm run preview` | Serve localmente o build de produção                   |
| `npm run lint`    | Executa o ESLint em todo o projeto                     |

## Estrutura do projeto

```
SISTEMA-ESTOQUE-FRONTNED/
├── public/                 # Arquivos estáticos
├── src/                    # Código-fonte da aplicação
├── index.html              # Ponto de entrada HTML
├── vite.config.ts          # Configuração do Vite (React + Tailwind)
├── eslint.config.js        # Configuração do ESLint
├── tsconfig.json           # Configuração do TypeScript
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

<!-- TODO: detalhe as subpastas de src/ (ex.: pages, components, services, hooks, routes, schemas). -->

## Integração com o back-end

A aplicação usa o Axios para consumir a API do sistema.

<!-- TODO: informe a URL base da API e como configurá-la. Se usar variável de ambiente, documente-a aqui. Exemplo:

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```
-->

Link do repositório do back-end: <!-- TODO -->

## Roadmap

- [x] Configuração inicial com Vite, React, TypeScript e Tailwind CSS
- [x] Integração com HeroUI, React Router, Axios e Zod
- [ ] <!-- TODO: próxima funcionalidade -->
- [ ] <!-- TODO: testes automatizados -->
- [ ] <!-- TODO: deploy -->

## Contribuindo

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das alterações (`git commit -m "feat: minha feature"`)
4. Envie para o seu fork (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## Licença

<!-- TODO: defina a licença (ex.: MIT) e adicione um arquivo LICENSE. -->

## Autor

**Francisco**, [@francisco328react](https://github.com/francisco328react)
