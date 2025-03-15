const timerDisplay = document.getElementById('timer')
const botaoFoco = document.querySelector('.focus_btn')
const botaoCurto = document.querySelector('.short_btn')
const botaoLongo = document.querySelector('.long_btn')
const botaoStart = document.getElementById('start_btn')
const botaoPause = document.getElementById('pause_btn')
const botaoReset = document.getElementById('reset_btn')

let tempoFoco = 25 * 60;
let tempoDescansoCurto = 5 * 60
let tempoDescansoLongo = 15 * 60
let timerAtivo = false;
let intervalo;
let modo = "Foco"
let modoAtual = tempoFoco


function startTimer() {
    if (!timerAtivo) {
        timerAtivo = true;
        intervalo = setInterval(() => {
            if (modoAtual > 0) {
                modoAtual--;
                 
                atualizarDisplay();
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
}

function resetTimer() {
    clearInterval(intervalo)
    modoAtual = (modo === "Foco") ? tempoFoco :
        (modo === "Descanso Curto") ? tempoDescansoCurto :
            tempoDescansoLongo;
    atualizarDisplay()
}

function atualizarDisplay() {
    let minutos = Math.floor(modoAtual / 60).toString().padStart(2, '0')
    let segundos = modoAtual % 60;
    let minutosFormatado = minutos.toString().padStart(2, '0')
    let segundosFormatado = segundos.toString().padStart(2, '0')
    timerDisplay.innerText = `${minutosFormatado}:${segundosFormatado}`
    document.title = `DeepFocus | ${minutosFormatado}:${segundosFormatado} | Modo: ${modoAtual}`
}

function alterarModo() {
    if (modo === "Foco") {
        modo = "Descanso Curto";
        modoAtual = tempoDescansoCurto
    } else if (modo === "Descanso Curto") {
        modo = "Descanso Longo"
        modoAtual = tempoDescansoLongo
    } else {
        modo = "Foco"
        modoAtual = tempoFoco
    }
}


botaoFoco.addEventListener('click', () => {
    modo = "Foco"
    modoAtual = tempoFoco
    botaoFoco.classList.add("ativo")
    botaoCurto.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()
})

botaoCurto.addEventListener('click', () => {
    modo = "Descanso Curto"
    modoAtual = tempoDescansoCurto
    botaoCurto.classList.add("ativo")
    botaoFoco.classList.remove("ativo")
    botaoLongo.classList.remove("ativo")
    resetTimer()
})

botaoLongo.addEventListener('click', () => {
    modo = "Descanso Longo";
    modoAtual = tempoDescansoCurto
    botaoLongo.classList.add("ativo");
    botaoFoco.classList.remove("ativo");
    botaoCurto.classList.remove("ativo");
    resetTimer();

})

function atualizarProgress() {
    
}
atualizarDisplay();