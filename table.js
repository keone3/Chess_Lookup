/* Get the url parameters */
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username").trim();

var api_url =
    "https://lichess.org/api/games/user/" +
    username +
    "?max=10&opening=true"; /* The default game request url until we update it inside getData */
var newGames; /* New list of games created from request url */
var newGamesTrimed = []; /* One individual match's information to populate a single row of our table */
var gameCounter = 0; /* Used to keep track of row number/how many games we have in the table */
var loadingGames = false; /* Checks if we are in getData and won't let us enter it again until the last one is finished, 
							this stops problems with spamming the get games button  */
var timesQueried = 0;
/* Load the first 10 games right away */

getData();

var database = new GameDatabase();

function updateGamesByDate() {
    if (document.getElementById("byDate").hidden) {
        document.getElementById("byDate").hidden = false;
        document.getElementById("byDateLable").hidden = false;
        document.getElementById("byNumber").hidden = true;
        document.getElementById("byNumberLable").hidden = true;
    } else {
    }
}

function updateGamesByNumber() {
    if (document.getElementById("byNumber").hidden) {
        document.getElementById("byNumber").hidden = false;
        document.getElementById("byNumberLable").hidden = false;
        document.getElementById("byDate").hidden = true;
        document.getElementById("byDateLable").hidden = true;
    } else {
    }
}

function newUser() {
    if (document.getElementById("byNumber").hidden) {
        let dateSince = document.getElementById("byDate").value;
        //date code here
    } else {
        let numberOfGames = document.getElementById("byNumber").value;
        api_url =
            "https://lichess.org/api/games/user/" +
            username +
            "?max=" +
            numberOfGames +
            "&opening=true";
    }
    getData();
}

async function getData() {
    timesQueried++;
    if (loadingGames == false) {
        loadingGames = true;

        // Request json data from lichess api
        let response = await fetch(api_url, {
            headers: {
                Accept: "application/x-ndjson",
            },
        });
        newGames = (await response.text()).match(/.+/g).map(JSON.parse);
        console.log(newGames);

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

                //gets game date
                let gameTimeAgo = timeSince(specificMatch["createdAt"]);

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

                currentGame = new Game(
                    gameID,
                    userName,
                    userColour,
                    opponentColour,
                    fullOpening,
                    "NA",
                    "NA",
                    "NA",
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

            database.addGame(currentGame);
        }

        addRows();
        loadingGames = false;
    }
}

/* Fetch 10 games and desplay them on the table, then on button click, fetch 10 more games starting from the oldest game time in the last request, 
then desplay those on the table too

Use this to change information you are requesting: https://lichess.org/api#operation/apiGamesUser 
*/

/* Games will be JSON Data, we will need some way to remember where we are in the list of games when populating the table so we dont repeat (maybe using time of game or some sort of counter?) */

/* If you are able to request games before a certain time that could be a solution to this problem. 
Save the latest time in the first query, start the next request with that value as the earliest time to start the query at */

function addRows() {
    var numNewRows = 10;

    let game = database.fullGameList.getHead();
    let i = 1;
    let table = document.getElementById("tbody");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    // for (let j = 0; j < (timesQueried-1)*(10); j++){
    // 	game = game.getNext()
    // }
    while (game != null) {
        let row = document.getElementById("tbody").insertRow();
        let cell = row.insertCell();
        cell.appendChild(document.createTextNode(i));
        cell = row.insertCell();
        cell.appendChild(
            document.createTextNode(game.getGame().getDatePlayed())
        ); //dated played
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.getGame().getUser())); //user
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("vs.")); //vs
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.getGame().getOpponent())); //Opponent
        cell = row.insertCell();
        cell.appendChild(
            document.createTextNode(game.getGame().getOpeningGeneral())
        ); //opening
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.getGame().getOutcome())); //result
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("na")); //not used

        game = game.getNext();
        i++;
    }
}

/* https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site */
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
