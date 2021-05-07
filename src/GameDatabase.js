class GameDatabase {
    constructor() {
        this.fullGameList = new LinkedList();
        this.minRating = 0;
        this.maxRating = 3500;
    }

    addGame(game) {
        // game is of type Game
        if (this.fullGameList.empty() == true) {
            this.minRating = game.getUserRating();
            this.maxRating = game.getUserRating();
        }
        if (this.minRating > game.getUserRating()) {
            this.minRating = game.getUserRating();
        }
        if (this.maxRating < game.getUserRating()) {
            this.maxRating = game.getUserRating();
        }

        let gameNode = new ListNode(game, null, null); //creates node for the game
        this.fullGameList.addBack(gameNode); //adds game the master list
    }

    generateGameList(speed, colour) {
        // generates and returns a list of game of the specified game speed and colour

        let partitionedList = new LinkedList();
        let curr = this.fullGameList.getHead();
        while (curr != null) {
            if (speed == "all" && colour == "all") {
                let newNode = new ListNode(curr.getGame(), null, null);
                partitionedList.addBack(newNode);
            } else if (speed == "all") {
                if (curr.getGame().getColour() == colour) {
                    let newNode = new ListNode(curr.getGame(), null, null);
                    partitionedList.addBack(newNode);
                }
            } else if (colour == "all") {
                if (curr.getGame().getSpeed() == speed) {
                    let newNode = new ListNode(curr.getGame(), null, null);
                    partitionedList.addBack(newNode);
                }
            } else {
                if (
                    curr.getGame().getColour() == colour &&
                    curr.getGame().getSpeed() == speed
                ) {
                    let newNode = new ListNode(curr.getGame(), null, null);
                    partitionedList.addBack(newNode);
                }
            }
            curr = curr.getNext();
        }

        return partitionedList;
    }

    getMaxRating() {
        return this.maxRating;
    }

    getMinRating() {
        return this.minRating;
    }

    clearGames() {
        this.fullGameList.clear();
        this.maxRating = 3500;
        this.minRating = 0;
    }

    generateChartData(speed, color) {
        let gameList = this.generateGameList(speed, color);
        let chartData = [];
        let currentGame = gameList.getHead();
        chartData.push({
            x: new Date(),
            y: currentGame.getGame().getUserRating(),
        });
        while (currentGame != null) {
            chartData.push({
                x: new Date(currentGame.getGame().getTimestamp()),
                y: currentGame.getGame().getUserRating(),
            });
            currentGame = currentGame.getNext();
        }

        return chartData;
    }
}
