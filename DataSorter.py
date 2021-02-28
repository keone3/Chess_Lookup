class DataSorter():

    def __init__(self, gameList):
        #params
        # list - gameList, stores a list of obJects of type Game
        
        self.gameList = gameList
        self.gamesAsBlack = []
        self.gamesAsWhite = []
        self.gamesWon = []
        self.gamesLost = []
        
        self.setAsWhite()
        self.setAsBlack()
        self.setWon()
        self.setLost()
        
    def createGameListByFirstMove(self,move):#takes parameter move of type string, contains move to sort by
    
        gamesByMove = []
        for game in self.gamesAsBlack:
            if(game.getMoves()[0] == move):
                gamesByMove.append(game)
        return gamesByMove

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

    # getters
    def getGameList(self):
        return self.gameList

    def getGamesAsBlack(self):
        return self.gamesAsBlack
        
    def getGamesAsWhite(self):
        return self.gamesAsWhite

    def getGamesLost(self):
        return self.gamesLost

    def getGamesWon(self):
        return self.gamesWon

    #__str__
    def __str__(self):
        return 'Won '+str(len(self.gamesWon)) +' games\nLost '+str(len(self.gamesLost))  +' games\nPlayed ' + str(len(self.gamesAsWhite))+' games as white\n' + 'Played ' + str(len(self.gamesAsBlack))+' games as black\n'
           
    
    
    
    
    
    
    
    
    
    