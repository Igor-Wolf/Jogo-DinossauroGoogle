const dino = document.querySelector(".dino");
const background = document.querySelector('.background');
var score = document.getElementById('score')
var record = document.getElementById('record')

let isJumping = false;
let position = 0;
let pontuacao = 0;

score.innerHTML = 0;
record.innerHTML = 0;


function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {

    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //descendo

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false;
                }
                else {
                    position -= 20;
                    dino.style.bottom = position + 'px';

                }
            }, 20);

        }
        else {
            //subindo
            position += 20;

            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {

    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;


    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px'

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);

            pontuacao++;
            score.innerHTML = pontuacao


        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over

            clearInterval(leftInterval);
            //document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
            alert("Game Over")
            clearInterval(leftInterval);
            background.removeChild(cactus);
            score.innerHTML = 0;

            if (parseInt(record.innerHTML) < pontuacao){

                record.innerHTML = pontuacao;
            }

            pontuacao = 0;
        }
        else {

            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';


        }
    }, 20)
    setTimeout(createCactus, randomTime)
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
document.onclick = function (event) {
    if (!isJumping) {
        jump();
    }
};