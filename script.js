//Palavras chave:

//1. Improvável;
//2. RedBull;
//3. DevClub;


// Algoritmo Receita do Bolo
// Lógica de Programação - Fazer o bolo

// Algoritmo

// [x] Saber quem é o botão
// [x] Saber quando o botão foi clicado
// [x] Saber quem é o textarea
// [x] Pegar o que tem dentro dele
// [x] Enviar para a IA
// [x] Pegar a resposta da IA e colocar na tela

let blocoCodigo = document.querySelector('.bloco-codigo')
let resultadoCodigo =  document.querySelector('.resultado-codigo')

let botao = document.getElementById('botao');
let prompt_box = document.getElementById('prompt-box');
let chave = ''  //chave desativada por segurança
let endereco = "https://api.groq.com/openai/v1/chat/completions"


async function gerarCodigo() {

let resposta = await fetch(endereco, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + chave
    },
    body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
            role: "system",
            content: `Você é um gerador de código HTML e CSS.

Regras obrigatórias:
1. Sempre retorne um documento HTML completo.
2. O HTML deve conter um elemento visual que represente o pedido do usuário.
3. O CSS deve estar dentro da tag <style>.
4. Nunca retorne explicações.
5. Nunca use markdown ou crases.
6. Sempre garanta que o resultado seja renderizável em um iframe.`,
        },
            {role:"user",
            content: prompt_box.value,}]
    })
})
    let dados = await resposta.json();
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado
    //console.log(resultado)

}

botao.addEventListener('click', gerarCodigo)