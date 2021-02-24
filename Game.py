class Game():

    def __init__(self, gameID, colour, openingGeneral, openingSpecific, variant, timeControl, winner):
        
        self.gameID = gameID
        self.colour = colour
        self.openingGeneral = openingGeneral
        self.openingSpecific = openingSpecific
        self.variant = variant
        self.timeControl = timeControl
        self.winner = winner
    
    def getGameID(self):
        return self.gameID
        
    def getColour(self):
        return self.colour
        
    def getOpening(self):
        return self.openingGeneral
        
    def getOpeningSpecific(self):
        return self.openingSpecific
        
    def getVariant(self):
        return self.variant
        
    def getTimeControl(self):
        return self.timeControl
        
    def getWinner(self):
        return self.winner
    