# Gerador de CSS integrado com IA

![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

<a href="https://groq.com" target="_blank" rel="noopener noreferrer">
  <img
    src="https://console.groq.com/powered-by-groq-light.svg"
    alt="Powered by Groq for fast inference."
    width="180"
  />
</a>

#

Aplicação web que utiliza inteligência artificial para gerar interfaces HTML e CSS a partir de descrições fornecidas pelo usuário.

O projeto possui um backend desenvolvido com Express e adaptado para uma **arquitetura serverless utilizando Cloudflare Workers**, responsável pela comunicação com a API da Groq.

## Links

**Aplicação:**
[https://gerador-de-css-por-ia.vercel.app/](https://gerador-de-css-por-ia.vercel.app/)

**Backend:**
[https://gerador-de-css-por-ia.gsilva12401321.workers.dev/](https://gerador-de-css-por-ia.gsilva12401321.workers.dev/)

## Demonstração

[**Acessar aplicação →**](https://gerador-de-css-por-ia.vercel.app/)

## Sobre o projeto

A aplicação permite descrever uma interface utilizando linguagem natural e receber como resultado um documento HTML completo, contendo estrutura, estilos e comportamentos.

O backend foi originalmente desenvolvido para execução em um servidor Node.js tradicional e posteriormente adaptado para o ambiente serverless do Cloudflare Workers, mantendo a API REST e a integração com a Groq.

## Funcionalidades

- Geração de interfaces HTML e CSS a partir de prompts.
- Integração com a API da Groq.
- Renderização do código gerado em ambiente isolado.
- Validação e restrição de conteúdo potencialmente inseguro.
- Geração de layouts responsivos.
- Backend serverless executado sob demanda.

## Segurança

Como a aplicação executa código gerado por inteligência artificial, foram implementadas restrições para reduzir comportamentos inesperados durante a renderização.

Entre elas:

- Bloqueio de `iframe`, `embed` e `object`.
- Restrição de acesso ao documento pai.
- Bloqueio de navegação e redirecionamentos externos.
- Restrição de conteúdos inadequados.
- Limitação de comportamentos que possam prejudicar o desempenho.

A chave da API da Groq é armazenada como **secret no Cloudflare Worker** e não é exposta ao frontend.

## Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express
- Cloudflare Workers
- Wrangler

### Integrações

- Groq API

## Estrutura do projeto

```text
frontend/
├── index.html
├── script.js
├── styles.css
└── src/
    └── assets/

backend/
├── server.js
├── wrangler.toml
├── package.json
└── .gitignore
````

## API

### `POST /generate`

Recebe um prompt e solicita à API da Groq a geração da interface.

**Requisição:**

```json
{
  "prompt": "Crie uma página inicial para uma cafeteria"
}
```

**Resposta:**

```json
{
  "resultado": "..."
}
```

## Configuração

### Requisitos

* Node.js
* NPM
* Conta na Cloudflare
* Chave da API da Groq

### Instalação

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Faça login na Cloudflare:

```bash
npx wrangler login
```

Configure a chave da Groq como secret:

```bash
npx wrangler secret put API_KEY
```

### Desenvolvimento local

Inicie o Worker:

```bash
npx wrangler dev
```

Por padrão, o backend estará disponível em:

```text
http://localhost:8787
```

Execute o frontend utilizando um servidor HTTP local, como o Live Server.

### Deploy

Dentro da pasta `backend`, execute:

```bash
npx wrangler deploy
```

## Aprendizados

O projeto permitiu aprofundar conhecimentos em:

* Desenvolvimento de APIs REST.
* Integração com APIs de inteligência artificial.
* Node.js e Express.
* CORS e gerenciamento de secrets.
* Arquitetura serverless.
* Cloudflare Workers.
* Deploy de aplicações em cloud.
* Segurança na execução de conteúdo gerado por IA.
* Adaptação de uma aplicação Node.js tradicional para um ambiente serverless.
