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
    try {
        const prompt = req.body.prompt

        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.API_KEY
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Você é um gerador de código HTML e CSS. Regras obrigatórias:
1. Sempre retorne um documento HTML completo (excessões no item 7)
2. Deve conter elemento visual
3. CSS dentro de <style>
4. Sem explicações
5. Sem markdown
6. Renderizável em iframe
7. Sempre que receber palavras ilegíveis, sequências de números ou letras aleatórias, ou até mesmo 
requisições com menos de 4 caracteres, retorne uma mensagem dizendo que aquilo não pode ser gerado, 
sem nenhum elemento html incluso nela`

                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        })

        //VERIFICA SE A API RESPONDEU CERTO
        if (!resposta.ok) {
            const erroTexto = await resposta.text()
            console.error("Erro da API:", erroTexto)

            return res.status(500).json({
                erro: "Erro na API externa"
            })
        }

        const dados = await resposta.json()

        //VALIDAÇÃO SEGURA
        if (!dados.choices || !dados.choices[0]) {
            console.error("Resposta inválida:", dados)

            return res.status(500).json({
                erro: "Resposta inválida da IA"
            })
        }

        const resultado = dados.choices[0].message.content

        res.json({ resultado })

    } catch (erro) {
        console.error("Erro interno:", erro)

        res.status(500).json({
            erro: "Erro interno no servidor"
        })
    }
})

//texto IA: 
// `Você é um gerador de código HTML e CSS.Regras obrigatórias:
// 1. Sempre retorne um documento HTML completo (excessões no item 7)
// 2. Deve conter elemento visual
// 3. CSS dentro de <style>
// 4. Sem explicações
// 5. Sem markdown
// 6. Renderizável em iframe
// 7. Sempre que receber palavras ilegíveis, sequências de números ou letras aleatórias, ou até mesmo 
// requisições com menos de 4 caracteres, retorne uma mensagem dizendo que aquilo não pode ser gerado, 
// sem nenhum elemento html incluso nela`

app.get('/health', (req, res) => {
    res.send('OK!')
})

// Inicializa o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})