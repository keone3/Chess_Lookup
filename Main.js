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
    convertDateToUnix(dateSince);
var newGames; //New list of games created from request url
var newGamesTrimed = []; // One individual match's information to populate a single row of our table
var loadingGames = false; //Checks if we are in updateGameDatabase and won't let us enter it again until the last one is finished, this stops problems with spamming the get games button
let database = new GameDatabase();

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

        database.clearGames();

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
                currentGame.speed == "bullet" ||
                currentGame.speed == "blitz" ||
                currentGame.speed == "rapid" ||
                currentGame.speed == "classical"
            ) {
                database.addGame(currentGame);
            }
        }

        let filteredGameList = database.generateGameList(speed, color);
        updateGameHistory(filteredGameList.head);
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
        convertDateToUnix(dateSince);
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
        if (game.game.colour == "white") {
            userIMG.src = "img/white.png";
            opIMG.src = "img/black.png";
        } else {
            userIMG.src = "img/black.png";
            opIMG.src = "img/white.png";
        }
        let row = document.getElementById("tbody").insertRow();
        let cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.game.getDatePlayed())); //dated played
        cell = row.insertCell();
        cell.appendChild(userIMG);
        cell.appendChild(document.createTextNode(game.game.getUser())); //user
        cell = row.insertCell();
        cell.appendChild(document.createTextNode("vs.")); //vs
        cell = row.insertCell();
        cell.appendChild(opIMG);
        cell.appendChild(document.createTextNode(game.game.getOpponent())); //Opponent
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.game.speed));
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.game.openingGeneral)); //opening
        cell = row.insertCell();
        cell.appendChild(document.createTextNode(game.game.outcome)); //result
        cell = row.insertCell();

        game = game.next;
    }
}

function updateAnalytics() {
    // update the chart or whatever we have displayed in the main analytics container
}

//converts date in the format "yyyy-mm-dd" to unix timestamp + 86399 to get 11:59:59
function convertDateToUnix(myDate) {
    myDate = myDate.split("-");
    let convertedDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    return Math.floor(convertedDate.getTime());
}

function convertDate(myDate) {
    myDate = myDate.split("-");
    let convertedDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    return convertedDate;
}

function testChart() {
    document.getElementById("dataArea").innerHTML = "";
    console.log("here");
    let margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width =
            document.getElementById("dataArea").offsetWidth -
            margin.right -
            margin.left,
        height = 500 - margin.top - margin.bottom;
    let svG = d3
        .select("#dataArea")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = database.generateChartData(speed, color);
    console.log(data);
    console.log(new Date());

    // X scale and Axis
    let x = d3
        .scaleTime()
        .domain([convertDate(dateSince), new Date()]) // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]); // This is the corresponding value I want in Pixel
    svG.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y scale and Axis
    let y = d3
        .scaleLinear()
        .domain([database.minRating - 100, database.maxRating + 100]) // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]); // This is the corresponding value I want in Pixel
    svG.append("g").call(d3.axisLeft(y));

    // Add 3 dots for 0, 50 and 100%
    // svG.selectAll("whatever")
    //     .data(data)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function (d) {
    //         return x(d.x);
    //     })
    //     .attr("cy", function (d) {
    //         return y(d.y);
    //     })
    //     .attr("r", 3)
    //     .style("fill", "blue");
    // console.log("gottem");

    svG.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1)
        .attr(
            "d",
            d3
                .line()
                .x(function (d) {
                    return x(d.x);
                })
                .y(function (d) {
                    return y(d.y);
                })
        );
}
