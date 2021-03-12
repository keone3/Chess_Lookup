//used to represent the important data about one game

class Game{

constructor(gameID, username, colour,opponentColour, openingGeneral, openingSpecific, variant, timeControl, outcome, userRating, opponentRating, 
               opponentName, datePlayed){

    //TODO: comment these with specifics
    this.gameID = gameID
    this.username = username
    this.colour = colour
    this.openingGeneral = openingGeneral
    this.openingSpecific = openingSpecific
    this.variant = variant
    this.timeControl = timeControl
    this.outcome = outcome
    this.userRating = userRating
    this.datePlayed = this.formatDate(datePlayed)
    this.opponentColour = opponentColour
    this.opponentName = opponentName
    this.opponentRating = opponentRating
    

}

//getters
getGameID(){
    return this.gameID
}
getColour(){
    return this.colour
}
getOpeningGeneral(){
    return this.openingGeneral
}
getOpeningSpecific(){
    return this.openingSpecific
}
getVariant(){
    return this.variant
}
getTimeControl(){
    return this.timeControl
}
getOutcome(){
    return this.outcome
}
getUserRating(){
    return this.userRating
}
getDatePlayed(){
    return this.datePlayed
}
getUser(){
    let temp = ''
    temp = this.colour + ': ' + this.username + ' (' + this.userRating + ')'
    return temp 
}
getOpponent(){
    let temp = ''
    temp = this.opponentColour + ': ' + this.opponentName + ' (' + this.opponentRating + ')'
    return temp 
}

formatDate(timestamp){
    var x=new Date(timestamp);
    var dd = x.getDate();
    var mm = x.getMonth()+1;
    var yy = x.getFullYear();
    return mm +"/" + dd+"/" + yy;
 }

toString(){
    //TO DO: Implement this
    return "na"
}

}