let blocoCodigo = document.querySelector('.bloco-codigo')
let resultadoCodigo = document.querySelector('.resultado-codigo')

let botao = document.getElementById('botao');
let prompt_box = document.getElementById('prompt-box');
//let chave = '' //chave desativada por segurança
//let endereco = "https://api.groq.com/openai/v1/chat/completions"
let endereco = "http://localhost:3000/generate"

async function gerarCodigo() {

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": "Bearer " + chave
        },
        body: JSON.stringify({
            prompt: prompt_box.value
        })
    })
    let dados = await resposta.json();
    let resultado = dados.resultado;

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado
    

}

botao.addEventListener('click', function () {

    if (prompt_box.value === "") { 
alert("Prompt Vazio!")
    } else {
        gerarCodigo()
    }
})