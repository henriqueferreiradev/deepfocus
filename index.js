const timerDisplay = document.getElementById('timer')
const botaoFoco = document.querySelector('.focus_btn')
const botaoCurto = document.querySelector('.short_btn')
const botaoLongo = document.querySelector('.long_btn')
const botaoStart = document.getElementById('start_btn')
const botaoPause = document.getElementById('pause_btn')
const botaoReset = document.getElementById('reset_btn')
const progressCircle = document.getElementById('progress')
const botaoAdicionar = document.getElementById('add_tarefa')
const checkbox = document.getElementById('checkbox-1')
const alerta = document.querySelector('.alerta')
const corAtivo = document.querySelector('.ativo')
const botaoMudarModo = document.getElementById('dark-light')
const botoes = document.querySelectorAll('.botao')
const botaoGithub = document.getElementById('github_btn')


let tempoFoco = 25 * 60;
let tempoDescansoCurto = 5 * 60
let tempoDescansoLongo = 15 * 60
let timerAtivo = false;
let intervalo;
let modo = "Foco"
let modoAtual = tempoFoco
let totalTime = modoAtual
let contador = 0


function startTimer() {
    if (!timerAtivo) {
        timerAtivo = true;
        intervalo = setInterval(() => {
            if (modoAtual > 0) {
                modoAtual--;

                atualizarDisplay();
                atualizarCirculo();

                botaoStart.classList.add("ativo")
            } else {
                clearInterval(intervalo);
                timerAtivo = false;
                alert("Tempo acabou!");
                alterarModo()
                startTimer()
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(intervalo)
    timerAtivo = false
    botaoPause.classList.add("ativo")
    botaoStart.classList.remove("ativo")
}

function resetTimer() {
    clearInterval(intervalo)
    modoAtual = (modo === "Foco") ? tempoFoco :
        (modo === "Descanso Curto") ? tempoDescansoCurto :
            tempoDescansoLongo;
    atualizarDisplay();
    atualizarCirculo();
    botaoPause.classList.remove("ativo")
    botaoStart.classList.remove("ativo")
}

function atualizarDisplay() {
    let minutos = Math.floor(modoAtual / 60).toString().padStart(2, '0')
    let segundos = modoAtual % 60;
    let minutosFormatado = minutos.toString().padStart(2, '0')
    let segundosFormatado = segundos.toString().padStart(2, '0')
    timerDisplay.innerText = `${minutosFormatado}:${segundosFormatado}`
    document.title = `DeepFocus | ${minutosFormatado}:${segundosFormatado} | ${modo}`
}

function alterarModo() {
    if (modo === "Foco") {

        modo = "Descanso Curto";

        modoAtual = tempoDescansoCurto
        totalTime = tempoDescansoCurto


    } else if (modo === "Descanso Curto") {
        modo = "Descanso Longo"
        totalTime = tempoDescansoLongo
        modoAtual = tempoDescansoLongo

    } else {
        modo = "Foco"
        totalTime = tempoFoco
        modoAtual = tempoFoco

    }
    atualizarDisplay();
    atualizarCirculo();

}

function editaEstilos(corBordaBotao, corFundoBotao) {

    document.documentElement.style.setProperty('--cor-borda-botao', corBordaBotao)
    document.documentElement.style.setProperty('--cor-fundo-botao', corFundoBotao)

}
botaoFoco.addEventListener('click', () => {
    modo = "Foco"
    modoAtual = tempoFoco
    totalTime = tempoFoco

    botaoFoco.classList.add("ativo")
    botaoCurto.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()
    editaEstilos('#84CC16', '#82cb151a');

})

botaoCurto.addEventListener('click', () => {
    modo = "Descanso Curto"
    modoAtual = tempoDescansoCurto
    totalTime = tempoDescansoCurto

    botaoCurto.classList.add("ativo")
    botaoFoco.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()
    editaEstilos('#06B6D4', '#06b5d41a');
})

botaoLongo.addEventListener('click', () => {
    modo = "Descanso Longo";
    modoAtual = tempoDescansoLongo
    totalTime = tempoDescansoLongo

    botaoLongo.classList.add("ativo");
    botaoFoco.classList.remove("ativo");
    botaoCurto.classList.remove("ativo");
    resetTimer();
    editaEstilos('#FF755C', '#ff745c1a');

})

function atualizarCirculo() {
    let progresso = (modoAtual / totalTime) * 282.74
    progressCircle.style.strokeDashoffset = progresso
}


function adicionarTarefa() {
    const listaDeTarefas = document.getElementById('lista-de-tarefas');
    const input = document.getElementById('tarefa-input');
    const inputValue = input.value;

    if (inputValue === "") {
        ;
        return;
    }

    const listaItem = document.createElement('li');
    listaItem.classList.add('lista-item-container');

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox" + contador++;

    const divItem = document.createElement('div')
    divItem.classList.add('')
    const itemLista = document.createElement('p');
    itemLista.innerText = inputValue;

    const botaoExcluir = document.createElement('button')
    botaoExcluir.classList.add("botao", "botao_excluir")
    botaoExcluir.innerText = '❌'
    botaoExcluir.addEventListener('click', function () {
        listaItem.remove();
    })
    listaItem.appendChild(inputCheckbox);
    listaItem.appendChild(itemLista);
    listaItem.appendChild(botaoExcluir)
    listaDeTarefas.appendChild(listaItem);
    input.value = "";
    checarCheckbox(inputCheckbox, itemLista)

    if (listaDeTarefas.children.length > 1) {
        alerta.style.display = 'none'
    } else {
        alerta.style.display = 'block'
    }

    return { inputCheckbox, itemLista }
}


function checarCheckbox(inputCheckbox, itemLista) {

    inputCheckbox.addEventListener('change', function () {
        if (inputCheckbox.checked) {


        } else {
            itemLista.style.color = "#FFFFFF"
        }
    })

}

function trocarModo() {
    botaoMudarModo.addEventListener('click', () => {
        document.body.classList.toggle("light")
        botoes.forEach(botao => {
            botao.classList.toggle('light')
        }) 
        
    })
}

botaoGithub.addEventListener('click', () => {
    window.open('https://github.com/henriqueferreiradev')
})
atualizarDisplay();
atualizarCirculo();
trocarModo();
