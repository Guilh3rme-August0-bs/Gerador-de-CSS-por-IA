// Elementos da interface
let blocoCodigo = document.querySelector('.bloco-codigo')
let resultadoCodigo = document.querySelector('.resultado-codigo') 

let botao = document.getElementById('botao');
let prompt_box = document.getElementById('prompt-box');
const loading = document.getElementById('spinner');

let endereco = "https://gerador-de-css-por-ia.gsilva12401321.workers.dev"
//let endereco = "http://localhost:8787"

async function gerarCodigo() {

    botao.style.display = 'none';
    loading.style.display = 'block';

    try {
        let resposta = await fetch(`${endereco}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt_box.value
            })
        });

        if (!resposta.ok) {
            const textoErro = await resposta.text()
            console.error("Erro do servidor:", textoErro)
            alert("Erro no servidor. Tente novamente.")
            return
        }

        let dados = await resposta.json();
        let resultado = dados.resultado

        blocoCodigo.textContent = resultado
        resultadoCodigo.srcdoc = resultado

        const telaCheia = document.getElementsByClassName('fullScreen')[0]
        telaCheia.style.display = 'flex'
    } finally {
        botao.style.display = 'initial';
        loading.style.display = 'none';
    }
}

botao.addEventListener('click', function () {
    if (prompt_box.value === "") {
        alert("Prompt Vazio!")
    } else {
        gerarCodigo()
    }
})

prompt_box.addEventListener('keydown', function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        if (prompt_box.value === "") {
            alert("Prompt Vazio!")
        } else {
            e.preventDefault();
            gerarCodigo()
        }
    }
})

function criarModal() {
    const modal = document.createElement('div')
    const modalDiv = document.createElement('div')
    const modalIframe = document.createElement('iframe')
    const fecharBotao = document.createElement('button')

    modal.classList.add('modal')
    fecharBotao.classList.add('fecharBotao')
    fecharBotao.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    modalDiv.classList.add('modalDiv')
    modalIframe.classList.add('modalIframe')

    document.body.appendChild(modal)
    modalDiv.appendChild(fecharBotao)
    modal.appendChild(modalDiv)
    modalDiv.appendChild(modalIframe)

    fecharBotao.addEventListener('click', function () { modal.remove() })
    modalIframe.srcdoc = resultadoCodigo.srcdoc
}