class GameDatabase {
    constructor() {
        this.fullGameList = new LinkedList();
    }

    addGame(game) {
        // game is of type Game

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
}
