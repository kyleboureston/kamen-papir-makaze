// Define core inputs
let userWins = 0;
let computerWins = 0;

// Listen for user input, if heard, runRound
document.getElementById("rpc-submit").addEventListener("click", runGame);

// Run the game
function runGame() {
    // Run the round
    runRound();

    // End game?
    let gameWinner = checkForEndGame();
    if(gameWinner) endGame(gameWinner);
}




// CORE FUNCTION
function runRound() {
    // Get user's response
    let userResponse = getUserResponse();

    // If response is blank, promt user to enter response and end
    if(!userResponse) {
        requestResponse();
        return;
    } else {
        clearResponsePrompt();
    }
        
    // Update the user response on the front end
    displayResponse(userResponse,"user");
    
    // Get computer's response
    let computerResponse = getComputerChoice();

    // Update the user response on the front end
    displayResponse(computerResponse,"computer");
    
    // Compare results of computer vs user input
    let winner = determineWinner(userResponse,computerResponse);

    // Declare winner of the round
    declareWinner(winner);

    // Clear your radio buttons
    clearRadio(elName = "rpc");

    // If tie, ends here
    if(winner !== "tie") {
        // Update totalWins
        let totalWins = updateTotalWins(winner);

        // Update totalWins on front end
        updateFrontEndWins(winner,totalWins)
    }

    // End game?
    let gameOver = checkForEndGame();
    if(gameOver) endGame();
}

// HELPER FUNCTIONS
// Function to getUserReponse
function getUserResponse() {
    let resp;
    let radioButtons = document.getElementsByName("rpc");
    for (let i = 0; i < radioButtons.length; i++ ) {
        if(radioButtons[i].checked) {
            resp = radioButtons[i].value;
        }
    }
    return resp;
}

// Function to generate a computer response
function getComputerChoice() {
    let choices = ["rock","paper","scissors"];
    let totalChoices = choices.length; // 3
    let rand = getRandomInt(totalChoices); // returns 0-2
    
    let computerChoice = choices[rand];
    return computerChoice;
}

// Function to display a response on the frontend. Works for different responders.
function displayResponse(resp,responder) {
    if(responder === "user") {
        document.getElementById("user-response-output").innerHTML = `You selected <b>${resp}</b>`;
    } else if (responder === "computer") {
        document.getElementById("computer-response-output").innerHTML = `I selected <b>${resp}</b>`;
    }
}

// Function to generate a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Function to generate error message if user response is blank
function requestResponse() {
    document.getElementById("rpc-selection-message").innerText = "*Please select an option.";
}

// Function to clear message after successful response
function clearResponsePrompt() {
    document.getElementById("rpc-selection-message").innerText = "";
}

// Function to determine winner
function determineWinner(userResponse,computerResponse) {
    if(userResponse === computerResponse) return "tie";
    else if(userResponse === "rock" && computerResponse === "scissors") return "user";
    else if(userResponse === "scissors" && computerResponse === "paper") return "user";
    else if(userResponse === "paper" && computerResponse === "rock") return "user";
    else return "computer"
}

// Function to declare the winner
function declareWinner(winner) {
    let declareWinnerElement = document.getElementById("round-winner");
    if(winner === "tie") {
        declareWinnerElement.innerText = `It's a draw! Play again!`;
        declareWinnerElement.style.backgroundColor = "#84C7D0"; 
    }
    else if(winner === "user") {
        declareWinnerElement.innerText = `You win! Darn!`;
        declareWinnerElement.style.backgroundColor = "#00ce00";
    }
    else if(winner === "computer") {
        declareWinnerElement.innerText = `I win! You stink!`;
        declareWinnerElement.style.backgroundColor = "#e26e6e";
    }
}

// Function to clear radio buttons
function clearRadio(elName) {
    let radioButtons = document.getElementsByName(elName);
    for (let i = 0; i < radioButtons.length; i++ ) {
        if(radioButtons[i].checked) {
            radioButtons[i].checked = false;
        }
    }
}

// Function to update total wins
function updateTotalWins(winner) {
    if(winner === "user") {
        userWins++;
        console.log(userWins)
        return userWins;
    } else if(winner === "computer") {
        computerWins++
        return computerWins;
    }
}

// Function to update wins on frontend
function updateFrontEndWins(winner,totalWins) {
    let el = document.getElementById(`${winner}-wins`);
    el.innerText = el.innerText.replace(/\d/g,totalWins);
}

// Function to check for gameOver
function checkForEndGame() {
    if(userWins === 3) return "userWins";
    if(computerWins === 3) return "computerWins";
}

// Function to fully end the game
function endGame(gameWinner) {
    if(gameWinner === "userWins") window.alert("YOU WIN! At least my first loss ever was to a worthy oponent.");
    if(gameWinner === "computerWins") window.alert("I WIN! No surpsise there. You weren't even much competition.");
    
    resetGame();
}

// Function to reset the game to the starting point
function resetGame() {
    // Reset the original rpc-selection-message
    document.getElementById("rpc-selection-message").innerText = "*Pick rock, paper, or scissors above to get started";

    // Update both front end wins
    updateFrontEndWins("user",0);
    updateFrontEndWins("computer",0);

    // Clear the Round Results Section
    document.getElementById("user-response-output").innerText = '';
    document.getElementById("computer-response-output").innerText = '';
    document.getElementById("round-winner").innerText = '';
    document.getElementById("round-winner").style.backgroundColor = '';
}