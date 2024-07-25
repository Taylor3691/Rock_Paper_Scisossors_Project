let score = JSON.parse(localStorage.getItem('history')) || {
    win: 0,
    lose:0,
    tie:0
};

let isStillPlaying = false;
let setIntervalId;
function autoPlay(){
    if(!isStillPlaying){
        setIntervalId = setInterval(function(){
            isStillPlaying = true;
            let playerMove = pickMove();
            playGame(playerMove);
            document.querySelector('.auto-play-button').innerHTML = 'Stop playing';
        },1000);
    }else{
        clearInterval(setIntervalId);
        isStillPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.score-annouce').innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;

function showScore(){
    document.querySelector('.score-annouce').innerHTML =`Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function showResult(computerMove, playerMove, result){
    showScore();
    document.querySelector('.announce').innerHTML = `You picked  <img src="images/${playerMove}-emoji.png" alt="" class="button-icon">, Computer picked  <img src="images/${computerMove}-emoji.png" alt="" class="button-icon">. You ${result}`;
}

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }else if(event.key==='s'){
        playGame('Scissors');
    }else if(event.key==='p'){
        playGame('Paper');
    }
});

function pickMove(){
    let random = Math.random();
    let computerMove;
    if(random<1/3&& random>=0){
        computerMove = 'Rock';
    }else if(random>=1/3&& random<2/3){
        computerMove = 'Paper';
    }else{
        computerMove = 'Scissors';
    }
    return computerMove;
}

function playGame(playerMove){
    let random = Math.random();
    let computerMove = pickMove();
    let result;
    if(playerMove === computerMove){
        score.tie++;
        result = 'tie';
    }else if((playerMove==='Scissors'&&computerMove==='Paper')||(playerMove==='Paper'&&computerMove==='Rock')||(playerMove==='Rock'&&computerMove==='Scissors')){
        score.win++;
        result = 'win';
    }else{
        score.lose++;
        result = 'lose';
    }
    showResult(computerMove,playerMove,result);
    localStorage.removeItem('history');
    localStorage.setItem('history',JSON.stringify(score));
}
