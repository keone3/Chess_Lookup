from Game import Game
from DataSorter import DataSorter
import berserk
import time

class LichessProject:
    
    # Takes valid Lichess username and max number of games
    def __init__(self, user, maxGames):
        self.user = user.lower()
        self.maxGames = maxGames
        self.newGameList = []
        self.totalGames = 0
        self.loadGames()

        #initialized an object of type DataSorter which creates and stored more specific subsets of the games 
        self.sortedLists = DataSorter(self.newGameList)

    # Loads games to gameList
    def loadGames(self):
        print("------------------ Getting Games ------------------")
        start_time = time.time()
        client = berserk.Client()
        shortGameList = list(client.games.export_by_player(self.user, max=self.maxGames))
        loadingPercentage = 0
        
        
        for game in shortGameList:
            percent = loadingPercentage/len(shortGameList)
            print('Loading Games: ' + str(int(percent)) + '%' , end='\r')
            
            # Using the game ID, fetch the dict object of that game
            specificGame = client.games.export(game['id'])
            
            #--------Opening and specific variation
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

            #--------Users colour
            colour = 'na'
            if('user' in specificGame['players']['white']):
                if(specificGame['players']['white']['user']['id'] == self.user):
                    colour = 'white'

            if('user' in specificGame['players']['black']): 
                if(specificGame['players']['black']['user']['id'] == self.user):
                    colour = 'black'
            
            #--------Increment time of game
            increment = 0
            if('clock' in specificGame):
                increment = specificGame['clock']['increment']

            #--------Outcome of game
            outcome = 'na'
            if('winner' in specificGame):
                if(specificGame['winner'] == colour):
                    outcome = 'win'
                else:
                    outcome = 'loss'
            else:
                outcome = specificGame['status']

            #--------All game moves
            moves = []
            if('moves' in specificGame):
                moves = specificGame['moves'].split()
            
            currGame = Game(
                specificGame['id'], 
                colour, 
                opening, 
                openingSpecific, 
                specificGame['variant'], 
                specificGame['speed'], 
                increment, 
                outcome, 
                str(moves)
            )
            self.newGameList.append(currGame)
            
            loadingPercentage = loadingPercentage + 100

        print('Loading Games: 100%' , end='\r')
        self.totalGames = len(shortGameList)
        print("Obtained " + str(self.totalGames) + " games from user " + self.user + " in "+ str(time.time() - start_time) + " seconds")
        print("---------------------------------------------------")
  

# All tests that were here have been moved to the Main file