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
        
    
    def setAsWhite(self):
        
        for game in self.gameList:
        
            if (game.getColour() == 'white'):
                
                self.gamesAsWhite.append(game)
                
    def setAsBlack(self):
        
        for game in self.gameList:
        
            if (game.getColour() == 'black'):
                
                self.gamesAsBlack.append(game)
                
    def setWon(self):
        
        for game in self.gameList:
        
            if (game.getOutcome() == 'win'):
                
                self.gamesWon.append(game)
                
    def setLost(self):
        
        for game in self.gameList:
        
            if (game.getOutcome() == 'loss'):
                
                self.gamesLost.append(game)
                
    
    def getListOfLost(self):
        return self.gamesWon
    
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
           
    
    
    
    
    
    
    
    
    
    