class Game():

    #fixed spelling from incriment -> increment everywhere I could find it
    
    def __init__(self, gameID, colour, openingGeneral, openingSpecific, variant, timeControl, increment, outcome, moves):
        # params----------------------------------------------------------------------------------------------
        # string gameID, stores the game ID
        # string colour, stores the colour the user played as 
        # string openingGeneral, stores the broad opening the game followed 
        # string openingSpecific, stores the specific line of the opening if applicable 
        # string variant, stores the varint played ie. 'standard', 'bughouse' etc. 
        # string timeControl, stores the time control ie. 'bullet', 'rapid' 
        # int increment, stores the time increment per move in seconds  
        # string outcome, stores the outcome ie 'win' or 'loss' if the user won or lost and 'status' is neither 
        # list moves, stores a list of the game moves  

        self.gameID = gameID 
        self.colour = colour 
        #Stores the two portions of the opening name. ex) if the opening is 'Queens Gambit Accepted: Two Knights Variation' then v
        self.openingGeneral = openingGeneral #stores 'Queens Gambit Accepted'
        self.openingSpecific = openingSpecific #stores 'Two Knights Variation'
        # Note: if there is no second part of the opening then openingSpecific is set to 'na'
        self.variant = variant 
        self.timeControl = timeControl  
        self.increment = increment 
        self.outcome = outcome 
        self.moves = moves 

    # getters
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
        
    def getOutcome(self):
        return self.outcome

    def getMoves(self):
        return self.moves
    
    def __str__(self):
        return 'ID: ' + self.gameID + ' Colour: ' + self.colour + ' Opening: ' + self.openingGeneral + ' Specific: ' + self.openingSpecific + ' Outcome: ' + self.outcome