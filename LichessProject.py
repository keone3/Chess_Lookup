from Game import Game
from DataSorter import DataSorter
import berserk
import time

class LichessProject:
    
    # Takes valid Lichess username and max number of games, then queries them to gameList
    def __init__(self, user, maxGames):
    
        self.user = user
        self.maxGames = maxGames
        self.gameList = []
        self.newGameList = []
        self.totalGames = 0
        
        
        self.loadGames()
        self.sortedLists = DataSorter(self.newGameList)
        

    # Loads games to gameList
    def loadGames(self):
    
        print("------------------ Getting Games ------------------")
        start_time = time.time()
        client = berserk.Client()
        shortGameList = list(client.games.export_by_player(self.user, max=self.maxGames))

        for game in shortGameList:
        
            # Using the game ID, fetch the dict object of that game and append it to gameList
            specificGame = client.games.export(game['id'])
            self.gameList.append(specificGame)
            
            opening = 'na'
            if('opening' in specificGame):
            
                opening = specificGame['opening']['name']
            
            #--------Added check for opening and specific variation
            opening = 'na'
            openingSpecific = 'na'
            if('opening' in specificGame):
            
                # Split opening name into two parts if possible, split between the delimiter ':'
                splitOpening = specificGame['opening']['name'].split(":", 1)
                if(len(splitOpening) == 2):
                
                    opening = (splitOpening[0]).strip()
                    openingSpecific = (splitOpening[1]).strip()
                    
                else:
                
                    opening = (splitOpening[0]).strip()

            #--------Added check for our users colour
            colour = 'na'
            if('user' in specificGame['players']['white']):
            
                if(specificGame['players']['white']['user']['name'] == self.user):
                
                    colour = 'white'
                    
            if('user' in specificGame['players']['black']):    
            
                if(specificGame['players']['black']['user']['name'] == self.user):
                
                    colour = 'black'
            
            #--------Added check for increment time of game
            increment = 0
            if('clock' in specificGame):
            
                increment = specificGame['clock']['increment']

            #--------Added check for outcome of game
            outcome = 'na'
            if('winner' in specificGame):
            
                if(specificGame['winner'] == colour):
                
                    outcome = 'win'
                    
                else:
                
                    outcome = 'loss'
                    
            else:
            
                outcome = specificGame['status']
                
            #--------Fixed using 'game' from for loop instead of 'specificGame' to pull data from
            currGame = Game(specificGame['id'], colour, opening, openingSpecific, specificGame['variant'], specificGame['speed'], increment, outcome)
            self.newGameList.append(currGame)

        
        self.totalGames = len(shortGameList)
        print("Obtained " + str(self.totalGames) + " games from user " + self.user + " in "+ str(time.time() - start_time) + " seconds")
        print("---------------------------------------------------")
    
   

#-----------------------------------------TESTING BELOW-----------------------------------------------------------------------

test = LichessProject('keone3', 10)

test.sortedLists.printOBJ()



#print(test.newGameList[0].getVariant())
#print(test.newGameList[0].getOpening())
#print(test.newGameList[0].getOpeningSpecific())
#print(test.newGameList[0].getOutcome())

# print("Games for user: " + test.user + "\n")
# for i in range(len(test.newGameList)):

    # print(test.newGameList[i].getGameID() + ", " + test.newGameList[i].getColour() + ", " + test.newGameList[i].getOpening() + ", " + test.newGameList[i].getOpeningSpecific() + ", " + test.newGameList[i].getVariant() + ", " + test.newGameList[i].getTimeControl() + ", " + str(test.newGameList[i].getIncrement())  + ", " + test.newGameList[i].getOutcome())