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
                    6. Renderizável em iframe`
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