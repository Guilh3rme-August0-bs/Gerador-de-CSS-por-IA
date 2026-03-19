const express = require('express')
const app = express()
//const fetch = require('node-fetch')
const PORT = 3000

//CORS (para se conectar com o front)
const cors = require('cors')
app.use(cors())

//proteger a chave da API
require('dotenv').config()

//JSON para receber dados
app.use(express.json())

//rota para gerar código
app.post('/generate', async (req, res) => {
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
                    content: `Você é um gerador de código HTML e CSS. Regras obrigatórias: 1. Sempre retorne um documento HTML completo (com a estrutura: <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> </head> <body> </body> </html> ) 2. O HTML deve conter um elemento visual que represente o pedido do usuário. 3. O CSS deve estar dentro da tag <style>. 4. Nunca retorne explicações. 5. Nunca use markdown ou crases. 6. Sempre garanta que o resultado seja renderizável em um iframe.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    })

    const dados = await resposta.json();
    const resultado = dados.choices[0].message.content

    res.json({ resultado })

})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})