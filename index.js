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


botaoFoco.addEventListener('click', () => {
    modo = "Foco"
    modoAtual = tempoFoco
    totalTime = tempoFoco
    botaoFoco.classList.add("ativo")
    botaoCurto.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()

})

botaoCurto.addEventListener('click', () => {
    modo = "Descanso Curto"
    modoAtual = tempoDescansoCurto
    totalTime = tempoDescansoCurto
    botaoCurto.classList.add("ativo")
    botaoFoco.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()

})

botaoLongo.addEventListener('click', () => {
    modo = "Descanso Longo";
    modoAtual = tempoDescansoLongo
    totalTime = tempoDescansoLongo
    botaoLongo.classList.add("ativo");
    botaoFoco.classList.remove("ativo");
    botaoCurto.classList.remove("ativo");
    resetTimer();


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

    const itemLista = document.createElement('p');
    itemLista.innerText = inputValue;

    listaItem.appendChild(inputCheckbox);
    listaItem.appendChild(itemLista);
    listaDeTarefas.appendChild(listaItem);
    input.value = "";
    checarCheckbox(inputCheckbox, itemLista)
    return {inputCheckbox, itemLista} 
}


function checarCheckbox(inputCheckbox, itemLista) {
    
    inputCheckbox.addEventListener('change', function() {
        if (inputCheckbox.checked) {
            itemLista.style.color = "#84CC16"
            
        } else {
            itemLista.style.color = "#FFFFFF"
        }
    }) 

}



atualizarDisplay();
atualizarCirculo();

