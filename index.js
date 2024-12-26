//all elements
const sound = new Audio("./sound/game-start-6104.mp3");
const heading = document.getElementById("heading");
const levelLabel = document.getElementById("level-heading");
let levelCounter = document.getElementById("level-counter");
const allButtons = document.querySelectorAll("button");
const choicePara = document.getElementById("choice-para");
const gameOverPara = document.getElementById("game-over");

//user press any key to start 
window.addEventListener("keypress",()=>{
    startGame();
    heading.textContent = ""   
},{ once: true });

//disabling all button before computer choice, enable in startGame function
allButtons.forEach(element =>  element.disabled = true);
let counter = 0;
let computerChoiceArray = [];
let userInput = [];

//start game function for computer
function startGame(){   
    let randomNum = Math.floor(Math.random()*4);
    // console.log(allButtons[randomNum]);
    computerChoiceArray.push(randomNum);
    allButtons[randomNum].classList.add("hover");
    let buttonSound = new Audio(`./sound/sound${randomNum+1}.mp3`);
    setTimeout(() => allButtons[randomNum].classList.remove("hover"),200);
    buttonSound.play();   
    counter += 1;
    levelCounter.textContent = counter;
    allButtons.forEach(element => element.disabled = false);
    
}

function userchoiceFunction(e){
    userInput.push(e);  
    //adding audio based on button
    let buttonSound = new Audio(`./sound/sound${e+1}.mp3`);
        buttonSound.play(); 
        checkChoiceArray();   
}
let startGameAgain = true
function checkChoiceArray(){
    for(let i = 0; i < userInput.length; i++){
        if(userInput[i] !== computerChoiceArray[i]){
            choicePara.textContent = `you have missed at ${i}'s`;
            // console.log(userInput,computerChoiceArray)
            resetGame();      
            startGameAgain = false  
        }
    }
    // starting computer game again if userInputchoice === computer choice 
    // checking startGameAgain variable to prevent from start game executing 

    if(startGameAgain && computerChoiceArray.length !=0 && computerChoiceArray.length === userInput.length){
        // console.log(userInput,computerChoiceArray)
        setTimeout(()=>startGame(),1000); // delay startGame function for 1 sec
        userInput = [];    // emptying array to next game
       
    } 
    // console.log(userInput)
    // console.log(computerChoiceArray) 
}

function resetGame(){
    sound.play();
    gameOverPara.textContent = "Game Over, Press any key to restart"; 
    document.body.style.backgroundColor = "rgb(27, 228, 195)";
    setTimeout(()=>{
        document.body.style.backgroundColor = "rgb(45, 45, 110)"
    },300)
    levelLabel.textContent = " ";
    allButtons.forEach(element => 
        element.disabled = true
    )
    window.addEventListener("keypress",()=>{
        document.location.reload();
    })
}




