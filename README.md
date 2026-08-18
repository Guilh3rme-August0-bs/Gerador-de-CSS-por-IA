# Gerador de CSS integrado com llama AI

![Node.js](https://img.shields.io/badge/node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23CB3837?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css3&logoColor=white)

## Visão geral

Este projeto é uma aplicação web com duas partes:

- frontend: interface estática da aplicação
- backend: servidor Node.js responsável por fornecer dados e lógica de negócio

Estrutura do projeto:

- frontend
  - `index.html`
  - `script.js`
  - `styles.css`
  - `src/assets/`
- backend
  - .env
  - `.gitignore`
  - `package.json`
  - `server.js`

## Requisitos

- Node.js instalado (recomendado v16 ou superior)
- NPM ou Yarn
- Navegador moderno

## Estrutura do frontend

- `index.html`: ponto de entrada da aplicação frontend
- `script.js`: lógica de interação e comunicação com o backend
- `styles.css`: estilos visuais da interface
- `src/assets/`: recursos estáticos

## Estrutura do backend

- `server.js`: servidor Node.js com rotas e configuração
- `package.json`: dependências e scripts
- .env: variáveis de ambiente para configuração do servidor

## Configuração

1. Abra o terminal.
2. Navegue até a pasta principal do backend:

```bash
cd backend
```

3. Instale as dependências:

```bash
npm install
```

4. Crie e configure o arquivo .env.

A variável obrigatória no arquivo .env deve ser:

```env
API_KEY=seu_valor_aqui
```

## Executando o backend

Inicie o servidor backend:

```bash
npm start
```

Se o `package.json` usar um script diferente, execute:

```bash
npm run dev
```

O servidor deve ficar disponível no endereço configurado no .env, por exemplo:

```bash
http://localhost:3000
```

## Executando o frontend

### Opção 1: Abrir diretamente

Abra index.html no navegador.

### Opção 2: Usar um servidor local

Navegue até a pasta do frontend:

```bash
cd frontend
```

Em seguida, use uma extensão como Live Server ou execute:

```bash
npx http-server
```

## Uso

- O frontend consome o backend por meio de requisições HTTP.
- Ajuste a URL da API no script.js para apontar para o backend em execução.
- Verifique se o servidor backend está ativo antes de usar o frontend.

## Rotas do backend

Verifique o conteúdo de server.js para entender os endpoints disponíveis. Normalmente estarão em forma de:

- `GET /`
- `GET /api/...`
- `POST /api/...`

## Licença

Projeto sugerido como MIT. Ajuste conforme necessário no arquivo `LICENSE`.
