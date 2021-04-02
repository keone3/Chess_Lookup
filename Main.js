/* Get the url parameters */
const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username").trim();

let speed = "all";
let color = "all";
let dateSince = "2021-01-01";

var api_url =
    "https://lichess.org/api/games/user/" +
    username +
    "?opening=true&since=" +
    convertDate(dateSince);
var newGames; //New list of games created from request url
var newGamesTrimed = []; // One individual match's information to populate a single row of our table
var gameCounter = 0; // Used to keep track of row number/how many games we have in the table
var loadingGames = false; //Checks if we are in updateGameDatabase and won't let us enter it again until the last one is finished, this stops problems with spamming the get games button
var database = new GameDatabase();

updateGameDatabase();

async function usernameTest() {
    try {
        let test_url = "https://lichess.org/api/user/" + username;
        let response = await fetch(test_url, {
            headers: {
                Accept: "application/x-ndjson",
            },
        });
        let userTest = (await response.text()).match(/.+/g).map(JSON.parse);
        document.getElementById("username").className = "form-control";
        updateGameDatabase();
    } catch (error) {
        document.getElementById("username").className =
            "form-control is-invalid";
    }
}

async function updateGameDatabase() {
    if (loadingGames == false) {
        loadingGames = true;

        // Request json data from lichess api
        let response = await fetch(api_url, {
            headers: {
                Accept: "application/x-ndjson",
            },
        });
        newGames = (await response.text()).match(/.+/g).map(JSON.parse);
        // Update the url for the next request
        //api_url = "https://lichess.org/api/games/user/" + username + "?max=10&opening=true&until=" + (newGames[9]['createdAt'] - 1)

        database.fullGameList.clear();

        for (let i = 0; i < newGames.length; i++) {
            let specificMatch = newGames[i];
            try {
                let userColour = "";
                let opponentColour = "";
                let userName = username;
                let opponentName = "";
                let speed = "";

                if ("user" in specificMatch["players"]["white"]) {
                    if (
                        userName.toUpperCase() ==
                        specificMatch["players"]["white"]["user"][
                            "name"
                        ].toUpperCase()
                    ) {
                        userColour = "white";
                        opponentColour = "black";
                    } else {
                        userColour = "black";
                        opponentColour = "white";
                    }
                } else if ("user" in specificMatch["players"]["black"]) {
                    if (
                        userName.toUpperCase() ==
                        specificMatch["players"]["black"]["user"][
                            "name"
                        ].toUpperCase()
                    ) {
                        userColour = "black";
                        opponentColour = "white";
                    } else {
                        userColour = "white";
                        opponentColour = "black";
                    }
                }
                opponentName =
                    specificMatch["players"][opponentColour]["user"]["name"];

                //gets game ID
                let gameID = specificMatch["id"];

                //gets opening
                let fullOpening = specificMatch["opening"]["name"];

                //calculates if the user won or lost
                let outcome = "";
                if (userColour == specificMatch["winner"]) {
                    outcome = "win";
                } else {
                    outcome = "loss";
                }

                //gets ratings
                let userRating = 0;
                let opponentRating = 0;
                if (userColour == "white") {
                    userRating = specificMatch["players"]["white"]["rating"];
                    opponentRating =
                        specificMatch["players"]["black"]["rating"];
                } else {
                    userRating = specificMatch["players"]["black"]["rating"];
                    opponentRating =
                        specificMatch["players"]["white"]["rating"];
                }

                speed = specificMatch["speed"]; // get game speed ie. bullet, blitz, rapid, classical

                currentGame = new Game(
                    gameID,
                    userName,
                    userColour,
                    opponentColour,
                    fullOpening,
                    "NA",
                    "NA",
                    speed,
                    outcome,
                    userRating,
                    opponentRating,
                    opponentName,
                    specificMatch["createdAt"]
                );
            } catch (error) {
                currentGame = new Game(
                    -1,
                    "NA",
                    "NA",
                    "NA",
                    "NA",
                    "NA",
                    "NA",
                    "NA",
                    "NA",
                    -1,
                    -1,
                    "NA",
                    0
                );
            }
            if (
                currentGame.getSpeed() == "bullet" ||
                currentGame.getSpeed() == "blitz" ||
                currentGame.getSpeed() == "rapid" ||
                currentGame.getSpeed() == "classical"
            ) {
                database.addGame(currentGame);
            }
        }

        let filteredGameList = database.generateGameList(speed, color);
        updateGameHistory(filteredGameList.getHead());
        //update the graph/chart here
        loadingGames = false;
    }
}

// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
// currently unused. left in if we decide to reuse again in the future.
function timeSince(date) {
    if (typeof date !== "object") {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = "year";
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = "month";
        } else {
            interval = Math.floor(seconds / 604800);
            if (interval >= 1) {
                intervalType = "week";
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = "day";
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = "hour";
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = seconds;
                            intervalType = "second";
                        }
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += "s";
    }

    return interval + " " + intervalType + " ago";
}

function updatePage() {
    fetchPageData();
    api_url =
        "https://lichess.org/api/games/user/" +
        username +
        "?opening=true&since=" +
        convertDate(dateSince);
    usernameTest();
}

function fetchPageData() {
    speed = document.getElementById("variant").value;
    color = document.getElementById("color").value;
    username = document.getElementById("username").value;
    dateSince = document.getElementById("dateSince").value;
}

function updateGameHistory(gameListHead) {
    let game = gameListHead;
    let table = document.getElementById("tbody");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    while (game != null) {
        let userIMG = document.createElement("img");
        let opIMG = document.createElement("img");
        if (game.getGame().getColour() == "white") {
            userIMG.src = "img/white.png";
            opIMG.src = "img/black.png";
        } else {
            userIMG.src = "img/black.png";
            opIMG.src = "img/white.png";
        }
        let row = document.getElementById("tbody").insertRow();
        let cell = row.insertCell();
        cell.appendChild(
            document.createTextNode(game.getGame().getDatePlayed())
        ); //dated played
        cell = row.insertCell();
        cell.appendChild(userIMG);
        cell.appendChild(document.createTextNode(game.getGame().getUser())); //user
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("vs.")); //vs
        cell = row.insertCell();
        cell.appendChild(opIMG);
        cell.appendChild(document.createTextNode(game.getGame().getOpponent())); //Opponent
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.getGame().getSpeed()));
        cell = row.insertCell();
        cell.appendChild(
            document.createTextNode(game.getGame().getOpeningGeneral())
        ); //opening
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.getGame().getOutcome())); //result
        cell = row.insertCell();

        game = game.getNext();
    }
}

function updateAnalytics() {
    // update the chart or whatever we have displayed in the main analytics container
}

//converts date in the format "yyyy-mm-dd" to unix timestamp + 86399 to get 11:59:59
function convertDate(myDate) {
    myDate = myDate.split("-");
    let convertedDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    return Math.floor(convertedDate.getTime());
}
