const express = require('express')
const app = express()
//const fetch = require('node-fetch') // usado apenas se seu Node não tiver fetch nativo (Node < 18)
const PORT = 3000

// CORS: permite que o frontend (rodando em outra porta/origem) consiga fazer requisições para este backend
const cors = require('cors')
app.use(cors())

// dotenv: carrega variáveis do arquivo .env para dentro do process.env
// Aqui é onde sua API_KEY fica protegida
require('dotenv').config()

// Middleware para permitir que o servidor entenda JSON no corpo das requisições
app.use(express.json())

// Rota principal da API
app.post('/generate', async (req, res) => {

    // Captura o prompt enviado pelo frontend
    const prompt = req.body.prompt

    // Requisição para a API externa (Groq)
    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {

        // Método POST porque estamos enviando dados
        method: "POST",

        // Cabeçalhos da requisição
        headers: {

            // Informa que estamos enviando JSON
            "Content-Type": "application/json",

            // AUTENTICAÇÃO da API
            // "Bearer" é o tipo de autenticação
            // process.env.API_KEY pega a chave do arquivo .env
            "Authorization": "Bearer " + process.env.API_KEY
        },

        // Corpo da requisição enviado para a IA
        body: JSON.stringify({

            // Modelo da IA que será usado
            model: "llama-3.3-70b-versatile",

            // Estrutura de conversa (padrão OpenAI-like)
            messages: [

                {
                    role: "system",
                    // Define o comportamento da IA (muito importante)
                    // Aqui você controla COMO a IA responde
                    content: `Você é um gerador de código HTML e CSS. Regras obrigatórias:
                    1. Sempre retorne um documento HTML completo
                    2. Deve conter elemento visual
                    3. CSS dentro de <style>
                    4. Sem explicações
                    5. Sem markdown
                    6. Renderizável em iframe
                    7. Se necessário gerar botões "Home" (ou com href="#home" ou somente "#"), coloque o atributo disabled neles, para evitar bugs, pois nenhum elemento gerado deve interagir com a pagina do gerador 
                    8. Sempre que receber palavras ilegíveis, sequências de números ou letras aleatórias, ou até mesmo 
                    requisições com menos de 4 caracteres, retorne uma mensagem dizendo que aquilo não pode ser gerado, 
                    sem nenhum elemento html incluso 
                    9. Nunca gerar código que dependa de internet externa (CDN, APIs, fontes online
                    10. NÃO permitir interação com a página pai:
                    - não usar window.parent
                    - não usar window.top
                    - não usar target="_top" ou "_parent"

                    11. Não utilizar:
                    - <iframe>
                    - <embed>
                    - <object>

                    12. Evitar qualquer comportamento potencialmente malicioso ou inesperado

                    13. Todos os botões devem funcionar apenas dentro do próprio documento

                    14. O layout deve ser simples, funcional e organizado

                    15. Se a entrada do usuário:
                    - tiver menos de 4 caracteres
                    - for ilegível
                    - for composta por caracteres aleatórios
                    - ou não fizer sentido

                    Retorne APENAS:
                    "Não foi possível gerar um layout válido com essa entrada."

                    (sem HTML, sem código, apenas texto puro)

                    16. O código gerado deve ser estável e não causar erros no navegador

                    17. Evitar loops infinitos, eventos excessivos ou qualquer coisa que prejudique performance

                    18. Sempre priorizar segurança e previsibilidade do código
                    
                    19. Se o prompt solicitar a criação de uma PÁGINA ou SITE, faça com que ela seja responsiva tanto em telas de celulares (abaixo de 650px de largura), quanto telas de computadores de mesa ou notebooks`
                },

                {
                    role: "user",
                    // Aqui entra o prompt do usuário vindo do frontend
                    content: prompt
                }
            ]
        })
    })

    // Converte a resposta da API para JSON
    const dados = await resposta.json();

    // Caminho padrão da resposta da IA
    // choices[0] = primeira resposta gerada
    // message.content = conteúdo da resposta
    const resultado = dados.choices[0].message.content

    // Envia o resultado de volta para o frontend
    res.json({ resultado })

})

// Inicializa o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})