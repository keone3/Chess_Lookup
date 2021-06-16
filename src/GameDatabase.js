class GameDatabase {
    constructor() {
        this.fullGameList = new LinkedList();
        this.minRating = 0;
        this.maxRating = 3500;
    }

    addGame(game) {
        // game is of type Game
        if (this.fullGameList.empty() == true) {
            this.minRating = game.userRating;
            this.maxRating = game.userRating;
        }
        if (this.minRating > game.userRating) {
            this.minRating = game.userRating;
        }
        if (this.maxRating < game.userRating) {
            this.maxRating = game.userRating;
        }

        let gameNode = new ListNode(game, null, null); //creates node for the game
        this.fullGameList.addBack(gameNode); //adds game the master list
    }

    generateGameList(speed, colour) {
        // generates and returns a list of game of the specified game speed and colour

        let partitionedList = new LinkedList();
        let curr = this.fullGameList.head;
        while (curr != null) {
            if (speed == "all" && colour == "all") {
                let newNode = new ListNode(curr.game, null, null);
                partitionedList.addBack(newNode);
            } else if (speed == "all") {
                if (curr.game.colour == colour) {
                    let newNode = new ListNode(curr.game, null, null);
                    partitionedList.addBack(newNode);
                }
            } else if (colour == "all") {
                if (curr.game.speed == speed) {
                    let newNode = new ListNode(curr.game, null, null);
                    partitionedList.addBack(newNode);
                }
            } else {
                if (curr.game.colour == colour && curr.game.speed == speed) {
                    let newNode = new ListNode(curr.game, null, null);
                    partitionedList.addBack(newNode);
                }
            }
            curr = curr.next;
        }

        return partitionedList;
    }

    clearGames() {
        this.fullGameList.clear();
        this.maxRating = 3500;
        this.minRating = 0;
    }

    generateChartData(speed, color) {
        let gameList = this.generateGameList(speed, color);
        let chartData = [];
        let currentGame = gameList.head;
        chartData.push({
            x: new Date(),
            y: currentGame.game.userRating,
        });
        while (currentGame != null) {
            chartData.push({
                x: new Date(currentGame.game.datePlayed),
                y: currentGame.game.userRating,
            });
            currentGame = currentGame.next;
        }

        return chartData;
    }
}
