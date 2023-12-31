// Wait for the Dom to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName('button');
  for(let button of buttons){
    button.addEventListener('click', function() {
      if ( this.getAttribute('data-type') === 'submit'){
        checkAnswer();
      }else {
        let gameType =  this.getAttribute('data-type');
        runGame(gameType);
      }
    })
  }
  document.getElementById('answer-box').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      checkAnswer()
    }

  })
  runGame('addition');
})

/**
 * The main game "loop", called when the script is first load
 * and after the user's answer has been processed
*/
function runGame(gameType) {
  // Clear input box
  document.getElementById('answer-box').value = '';
  document.getElementById('answer-box').focus();

  // Creates two random number between 1 - 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;
  
  if (gameType === 'addition'){
    displayAdditionQuestion(num1, num2);  
    console.log(num1 + num2)
  }else if (gameType === 'subtract') {
    displaySubtractQuestion(num1, num2)
    console.log(num1 - num2)
  }else if (gameType === 'multiply'){
    displayMultiplyQuestion(num1, num2)
    console.log(num1 * num2)
  }else if (gameType === 'division'){
    displayDivisionQuestion(num1, num2)
   console.log(num1 , num2,)
  }else{
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }

}

/**
 * Checks the answer against the first element in the returned
 * calculatedCorrectAnswer array.
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);
  let calculateAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculateAnswer[0];

  if(isCorrect){
    alert('Hey you got it right! :D');
    incrementScore()
    
  }else {
    alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculateAnswer[0]}!`)
    incrementWrongAnswer()
    document.getElementById('answer-box').value = ''
  }
  runGame(calculateAnswer[1]);
}

/** 
 * Get the operands (the numbers) and the operator symbols directly from the dom,
 * and returns the correct answer.
 * */ 
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').innerText );
  let operand2 = parseInt(document.getElementById('operand2').innerText );
  let operator = document.getElementById('operator').innerText;

  if(operator === '+'){
    return [operand1 + operand2, 'addition'];
  }else if(operator === 'x'){
    return [operand1 * operand2, 'multiply'];
  }else if(operator === '-'){
    return [operand1 - operand2, 'subtract'];
  }else if(operator === '/'){
      return [operand1 / operand2, 'division'];
    } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting!`;
  }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
  let oldScore  = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;  
}

/**
 * Gets the current incorrect from the DOM and increments it by 1
 */

function incrementWrongAnswer() {
  let oldScore  = parseInt(document.getElementById('incorrect').innerText);
  document.getElementById('incorrect').innerText = ++oldScore;
}

/**
 * Displays addition math questions
 */
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '+';

}
/**
 * Displays substaction and check so not to return a negative number, math questions
 */
function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = '-';
}
/**
 * Displays mulitplication math questions
 */
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = 'x';

}
/**
 * Displays division and insures not to return a remainder math questions
 */
function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 * operand2;
    document.getElementById('operand2').textContent = operand1;
    document.getElementById('operator').textContent = '/';

}