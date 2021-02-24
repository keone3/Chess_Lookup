class Game():

    #fixed spelling from incriment -> increment everywhere I could find it
    
    def __init__(self, gameID, colour, openingGeneral, openingSpecific, variant, timeControl, increment, winner):
        
        self.gameID = gameID #Stores the game ID
        self.colour = colour #Stores the colour the user played as
        
        #Stores the two portions of the opening name. ex) if the opening is 'Queens Gambit Accepted: Two Knights Variation' then v
        self.openingGeneral = openingGeneral #stores 'Queens Gambit Accepted'
        self.openingSpecific = openingSpecific #stores 'Two Knights Variation'
        #Note: if there is no second part of the opening then openingSpecific is initialized to -1
        
        self.variant = variant #stores the variant ex) 'standard' 'bughouse' etc.
        self.timeControl = timeControl #stores the time control ex) 'bullet' 
        self.increment = increment #stores the time increment
        self.winner = winner #stores the winner. True if user won, false otherwise
    
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
    
    def getIncrement(self):
        return self.increment
        
    def getWinner(self):
        return self.winner
    
