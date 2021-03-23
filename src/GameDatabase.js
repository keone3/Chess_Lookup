class GameDatabase {
    constructor() {
        this.fullGameList = new LinkedList();
        this.gameListAsWhite = new LinkedList();
        this.gameListAsBlack = new LinkedList();
        this.gameListWon = new LinkedList();
        this.gameListLost = new LinkedList();
    }

    addGame(game) {
        // game is of type Game

        let gameNode = new ListNode(game, null, null); //creates node for the game

        //adds game to various lists depending on the information about the game
        this.fullGameList.addBack(gameNode);
        if (game.getColour() == "white") {
            gameNode = new ListNode(game, null, null); //creates node for the game
            this.gameListAsWhite.addBack(gameNode);
        }
        if (game.getColour() == "black") {
            gameNode = new ListNode(game, null, null); //creates node for the game
            this.gameListAsBlack.addBack(gameNode);
        }
        if (game.getOutcome() == "win") {
            gameNode = new ListNode(game, null, null); //creates node for the game
            this.gameListWon.addBack(gameNode);
        }
        if (game.getOutcome() == "loss") {
            gameNode = new ListNode(game, null, null); //creates node for the game
            this.gameListLost.addBack(gameNode);
        }
    }
}
