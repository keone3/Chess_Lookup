from Game import Game
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
            
            #--------Added check for our users colour
            colour = 'na'
            if('user' in specificGame['players']['white']):
                if(specificGame['players']['white']['user']['name'] == self.user):
                    colour = 'white'
            if('user' in specificGame['players']['black']):    
                if(specificGame['players']['black']['user']['name'] == self.user):
                    colour = 'black'
            
            #--------Added check for increment time of game
            increment = 'na'
            if('clock' in specificGame):
                increment = specificGame['clock']['increment']

            
            #--------Fixed using 'game' from for loop instead of 'specificGame' to pull data from
            currGame = Game(specificGame['id'], colour, opening, 'NEED TO ADD', specificGame['variant'], specificGame['speed'], increment, 'NEED TO ADD')
            self.newGameList.append(currGame)

        
        self.totalGames = len(shortGameList)
        print("Obtained " + str(self.totalGames) + " games in "+ str(time.time() - start_time) + " seconds")
        print("---------------------------------------------------")
    

test = LichessProject('keone3', 10)
print(test.newGameList[5].getColour())
print(test.newGameList[5].getIncrement())