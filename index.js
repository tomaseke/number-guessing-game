const guessButton = document.getElementById('guess-button');
const result = document.getElementById('random-num');
const probability = document.getElementById('probability-error');
const resetButton = document.getElementById('reset-button');
const score = document.getElementById('score');
let wifeMode = false;
let guessOutOfRange;
let wrong = 0;
let right = 0;

// main function
guessButton.addEventListener("click", (e) => e.preventDefault())
guessButton.addEventListener("click", main)

// reset button funcionality
resetButton.addEventListener("click", (e) => e.preventDefault())
resetButton.addEventListener('click', reset)


window.addEventListener("keydown", e => {
    if(e.key == 'w' && wifeMode == false){
        return wifeMode = true;
    }
    if(e.key == 'w' && wifeMode == true){
        wifeMode = false;
    }
})

function reset(){
    wrong = 0;
    right = 0;
    guessOutOfRange = '';
    wifeMode = false;
    probability.innerHTML = '';
    result.innerHTML = '';
    score.innerHTML = '';
    document.getElementById('guess').value = '';
    document.getElementById('range').value = '';
}


function isGuessInRange(guess, range){
    if(guess < 0 || guess > range){
        probability.innerHTML = "Your guess isn't in your range. Select a different number dumbass.";
        result.innerHTML = "";
        guessOutOfRange = true;
    }
    else{
        guessOutOfRange = false;
    }
}

function guessOutcome(guess, randomNum){
    if(randomNum === guess){
        right++
        result.innerHTML = `Correct, the number was ${randomNum} indeed.`
    }
    else{
        wrong++
        result.innerHTML = `Wrong, the number was ${randomNum}.`
    }
}

function calculateProbability(range){
    return "The probability that you will guess the number is " + Math.round((1/(range+1) * 1000))/10 + "%."
}

function generateRandomNum(range){
    return Math.floor(Math.random() * (range + 1))
}

function generateNumOtherThanGuess(range, guess){
    let randomNum = generateRandomNum(range)
    while(randomNum == guess){
        randomNum = generateRandomNum(range)
    }
    return randomNum
}

function main(){
    let guess = Number(document.getElementById('guess').value)
    let range = Number(document.getElementById('range').value)
    if(guess && range || guess == 0 && range){
        isGuessInRange(guess, range)
        if(!guessOutOfRange){
            if(!wifeMode){
                let randomNum = generateRandomNum(range)
                guessOutcome(guess, randomNum)
            }
            if(wifeMode){
                let notSoRandomNum = generateNumOtherThanGuess(range, guess)
                guessOutcome(guess, notSoRandomNum)
            }
        probability.innerHTML = calculateProbability(range)
        }
        score.innerHTML = `Your score is ${right}/${wrong + right}`
    }
}

// document.querySelector('#test').addEventListener('click', () => {
//     if(wifeMode)  return wifeMode = false
//     if(!wifeMode) wifeMode = true;
// })