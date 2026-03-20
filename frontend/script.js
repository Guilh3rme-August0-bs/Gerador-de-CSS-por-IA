// Elementos da interface
let blocoCodigo = document.querySelector('.bloco-codigo') // onde o código será exibido
let resultadoCodigo = document.querySelector('.resultado-codigo') // iframe onde o código será renderizado

let botao = document.getElementById('botao');
let prompt_box = document.getElementById('prompt-box');

// URL do backend (agora você não chama mais a API direto)
let endereco = "https://gerador-de-css-por-ia.onrender.com/generate"
//"http://localhost:3000/generate"

async function gerarCodigo() {

    // Requisição para o SEU backend (não mais para a API externa)
    let resposta = await fetch(endereco, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        // Envia o prompt digitado pelo usuário
        body: JSON.stringify({
            prompt: prompt_box.value
        })
    })

    // Converte resposta do backend
    let dados = await resposta.json();

    // Recebe o resultado já processado pelo backend
    let resultado = dados.resultado;

    // Exibe o código como texto
    blocoCodigo.textContent = resultado

    // Renderiza o HTML dentro do iframe
    resultadoCodigo.srcdoc = resultado

    //Erro caso o código não puder ser gerado
    if (!resposta.ok) {
    alert("Erro ao gerar código")
    return
}
}

// Evento de clique no botão
botao.addEventListener('click', function () {

    // Validação simples para evitar requisição vazia
    if (prompt_box.value === "") {
        alert("Prompt Vazio!")
    } else {
        gerarCodigo()
    }
})