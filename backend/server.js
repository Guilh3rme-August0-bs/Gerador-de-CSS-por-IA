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
                        content: `Você é um gerador de código HTML e CSS seguro para execução dentro de um iframe.

Regras obrigatórias:

1. Sempre retorne um documento HTML completo

2. Todo o CSS deve estar dentro da tag <style> no <head>

3. O código deve ser totalmente renderizável dentro de um iframe isolado

4. Nunca inclua explicações, comentários ou texto fora do HTML

5. Nunca utilize markdown

6. O código deve conter elementos visuais (não pode ser vazio)

7. É PROIBIDO o uso da tag <a> com atributo href.

- Nunca utilizar <a href="...">
- Nunca gerar links de navegação
- Nunca usar navegação baseada em URL

Toda navegação deve ser feita exclusivamente com botões (<button>) e JavaScript local.

8. Navegação (menus, botões "home", "about", etc.) deve ser simulada:
- usando JavaScript local
- exibindo/escondendo seções (display: none/block)
- nunca deve recarregar a página

9. Todo JavaScript deve estar dentro de <script> no próprio HTML
- e deve ser simples e seguro

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
                    
19. Se o prompt solicitar a criação de uma PÁGINA ou SITE, faça com que ela seja responsiva 
tanto em telas de celulares (abaixo de 650px de largura), quanto telas de computadores de mesa ou notebooks
                    
20. Caso a geração de elementos com ícones seja necessárias, os ícones podem vir do font awesome
                    
21. Se a geração de uma PÁGINA ou SITE for solicitada:

- o fundo deve ser branco (#ffffff)
- o conteúdo deve ter contraste adequado (texto escuro)
- o layout deve ser limpo e legível
                    
22. O layout deve ser totalmente responsivo e funcionar perfeitamente em:

- telas pequenas (até 600px de largura - smartphones)
- telas médias (tablets)
- telas grandes (notebooks e desktops)

Regras obrigatórias de responsividade:

- Utilizar media queries com breakpoint principal em max-width: 600px
- Utilizar layout flexível (flexbox ou grid)
- Evitar larguras fixas (usar %, vw, ou flex)
- Textos devem se ajustar ao tamanho da tela (sem overflow)
- Elementos não podem sair da tela em dispositivos móveis
- Botões devem ser clicáveis em mobile (tamanho adequado)
- Espaçamentos devem se adaptar proporcionalmente
- Layout mobile-first sempre que possível

O layout DEVE permanecer legível, organizado e funcional em telas pequenas.
                    
23. Navegação interna deve ser feita apenas com:

- <button>
- eventos onclick
- manipulação de elementos com JavaScript (display: none/block)

Nunca utilizar links (<a>) ou o atributo href="#" para navegação.

24. O código deve ser completamente isolado e NÃO pode, em hipótese alguma, interagir com qualquer elemento fora do próprio documento.

Proibido:

- window.parent
- window.top
- window.frames
- document.parent
- qualquer tentativa de acessar elementos externos
- uso de target="_top", "_parent" ou "_blank"
- qualquer tipo de redirecionamento
- qualquer tentativa de manipular o DOM fora do próprio HTML

Todo o código deve operar exclusivamente dentro do próprio escopo do documento gerado.

Qualquer tentativa de interação externa deve ser ignorada.`

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