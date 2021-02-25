class DataSorter():

    def __init__(self, gameList):
        
        self.gameList = gameList
        self.gamesAsBlack = []
        self.gamesAsWhite = []
        self.gamesWon = []
        self.gamesLost = []
        
        self.setAsWhite()
        self.setAsBlack()
        self.setWon()
        self.setLost()
        
    #makes a list of all the games where the user played as white
    def setAsWhite(self):
        
        for game in self.gameList:
        
            if (game.getColour() == 'white'):
                
                self.gamesAsWhite.append(game)
                
    #makes a list of all the games where the user played as black
    def setAsBlack(self):
        
        for game in self.gameList:
        
            if (game.getColour() == 'black'):
                
                self.gamesAsBlack.append(game)
                
    #makes a list of the games the user won
    def setWon(self):
        
        for game in self.gameList:
        
            if (game.getOutcome() == 'win'):
                
                self.gamesWon.append(game)
                
    #makes a list of the games the user lost
    def setLost(self):
        
        for game in self.gameList:
        
            if (game.getOutcome() == 'loss'):
                
                self.gamesLost.append(game)
                
    
    
    #for testing purposes to see the contents of the lists
    def printOBJ(self):
        for thing in self.gamesLost:
            print(thing.getOutcome())
            
        print('\n')
        for thing in self.gamesWon:
            print(thing.getOutcome())
            
        print('\n')
        for thing in self.gamesAsBlack:
            print(thing.getColour())
            
        print('\n')
        for thing in self.gamesAsWhite:
            print(thing.getColour())
           
    
    
    
    
    
    
    
    
    
    