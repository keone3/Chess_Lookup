//used to represent the important data about one game

class Game {
    constructor(
        gameID,
        username,
        colour,
        opponentColour,
        openingGeneral,
        openingSpecific,
        variant,
        speed,
        outcome,
        userRating,
        opponentRating,
        opponentName,
        datePlayed
    ) {
        //TODO: comment these with specifics
        this.gameID = gameID;
        this.username = username;
        this.colour = colour;
        this.openingGeneral = openingGeneral;
        this.openingSpecific = openingSpecific;
        this.variant = variant;
        this.speed = speed;
        this.outcome = outcome;
        this.userRating = userRating;
        this.datePlayed = datePlayed;
        this.opponentColour = opponentColour;
        this.opponentName = opponentName;
        this.opponentRating = opponentRating;
    }

    //getters
    getGameID() {
        return this.gameID;
    }

    getColour() {
        return this.colour;
    }

    getOpeningGeneral() {
        return this.openingGeneral;
    }

    getOpeningSpecific() {
        return this.openingSpecific;
    }

    getVariant() {
        return this.variant;
    }

    getSpeed() {
        return this.speed;
    }

    getOutcome() {
        return this.outcome;
    }

    getUserRating() {
        return this.userRating;
    }

    getDatePlayed() {
        return this.formatDate(this.datePlayed);
    }

    getTimestamp() {
        return this.datePlayed;
    }

    getUser() {
        let temp = "";
        temp = " " + this.username + " (" + this.userRating + ")";
        return temp;
    }

    getOpponent() {
        let temp = "";
        temp = " " + this.opponentName + " (" + this.opponentRating + ")";
        return temp;
    }

    formatDate(timestamp) {
        var x = new Date(timestamp);
        var dd = x.getDate();
        var mm = x.getMonth() + 1;
        var yy = x.getFullYear();
        return mm + "/" + dd + "/" + yy;
    }

    toString() {
        //TO DO: Implement this
        return "na";
    }

    // returns a list of strings in the order we need them to display on the game history table.
    toTableFormat() {
        let tableList = [];
        tableList.push(this.formatDate(this.datePlayed));
        tableList.push(this.username + "(" + this.userRating + ")");
        tableList.push("vs.");
        tableList.push(this.opponentName + "(" + this.opponentRating + ")");
        tableList.push(this.speed);
        tableList.push(this.openeingGeneral);
        tableList.push(outcome);
    }
}
