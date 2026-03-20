// Elementos da interface
let blocoCodigo = document.querySelector('.bloco-codigo') // onde o código será exibido
let resultadoCodigo = document.querySelector('.resultado-codigo') // iframe onde o código será renderizado

let botao = document.getElementById('botao');
let prompt_box = document.getElementById('prompt-box');
const loading = document.getElementById('spinner');

// URL do backend (agora você não chama mais a API direto)
let endereco = "https://gerador-de-css-por-ia.onrender.com/generate" 

async function gerarCodigo() {

    botao.style.display = 'none';
    loading.style.display = 'block';

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

    // VERIFICA SE DEU ERRO
    if (!resposta.ok) {
        const textoErro = await resposta.text()
        console.error("Erro do servidor:", textoErro)
        alert("Erro no servidor. Tente novamente.")

        botao.style.display = 'initial';
        loading.style.display = 'none';

        return
    }

    // Converte resposta do backend
    let dados = await resposta.json();

    // Recebe o resultado já processado pelo backend
    let resultado = dados.resultado

    botao.style.display = 'initial';
    loading.style.display = 'none';

    // Exibe o código como texto
    blocoCodigo.textContent = resultado

    // Renderiza o HTML dentro do iframe
    resultadoCodigo.srcdoc = resultado
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