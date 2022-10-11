//STEP #1: Listen for user input
document.getElementById("rpc-submit").addEventListener("click", runRound);

//STEP #2: Run the round
function runRound() {
    // Get user's response
    let userResponse = getUserResponse();

    // Update the user response on the front end
    displayResponse(userResponse,"user");
    
    // Get computer's response
    let computerResponse = getComputerChoice();
    
    // Compare results of computer vs user input
    let winner = determineWinner(userResponse,computerResponse);


    // Declare winner of round
    // Keep running total round wins
}

//STEP #3: Watch for winner of game. Declare Winner.

// HELPER FUNCTIONS USED
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
    if(responder = "user") {
        document.getElementById("user-response-output").innerHTML = `You selected <b>${resp}</b>`;
    } else {
        document.getElementById("computer-response-output").innerHTML = `I selected <b>${resp}</b>`;
    }
}

// Function to generate a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Function to determine winner
function determineWinner(userResponse,computerResponse) {
    if(userResponse === computerResponse) return "tie"
    if
}