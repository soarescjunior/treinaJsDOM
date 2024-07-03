
//alteração do car conforme seleção
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')

// tempo de descanso
const displayTempo = document.querySelector('#timer');
const tempoFoco = 1500;
const tempoDescansoLongo = 900;
const tempoDescansoCurto = 300;

//opção de som ao ativar musica
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const checkMusic = document.getElementById('alternar-musica')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null;
musica.loop = true
musica.currentTime = 10; // Move para 10 segundos no áudio
musica.volume = 0.5; // Define o volume para metade (50%)

//botoes comecar e pausar
const btnComecar = document.querySelector('#start-pause')
const btnComecarOuPausar = document.querySelector('#start-pause span')
const titulo = document.querySelector('.app__title');
const somStart = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somFinished = new Audio('/sons/beep.mp3')
const btnComecarOuPausarIcone = document.querySelector('.app__card-primary-butto-icon')



//função de reprodução
checkMusic.addEventListener('change', () =>{
    if(musica.paused){
        musica.play() //Inicia a reprodução
    }else{
        musica.pause() // // Pausa a reprodução
    }
})

//função de alteração do tipo de descanso
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = tempoFoco
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = tempoDescansoCurto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = tempoDescansoLongo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//função de alteração do texto
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                titulo.innerHTML  = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

            case "descanso-curto":
                titulo.innerHTML  = ` Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

            case "descanso-longo":
                titulo.innerHTML  = ` Hora de voltar à superfice,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    
        default:
            break;
    }
}

// contagem regressiva do tempo

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somFinished.play();
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    //console.log('Temporizador: ' + tempoDecorridoEmSegundos)
    mostrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

//função do botão iniciar ou pausar
function iniciarOuPausar(){
    if(intervaloId){
        somPause.play()
        zerar();
        return
    }
    somStart.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    btnComecarOuPausar.textContent = "Pausar"
    btnComecarOuPausarIcone.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    btnComecarOuPausar.textContent = "Começar"
    btnComecarOuPausarIcone.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

//função do timer ou tempo na tela

function mostrarTempo(){
    const tempo =  new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo();