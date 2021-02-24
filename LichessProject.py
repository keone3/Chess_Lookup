import berserk
import time

class LichessProject:
    
    # Takes valid Lichess username and max number of games, then queries them to gameList
    def __init__(self, user, maxGames):
        self.user = user
        self.maxGames = maxGames
        self.gameList = []
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
        
        self.totalGames = len(shortGameList)
        print("Obtained " + str(self.totalGames) + " games in "+ str(time.time() - start_time) + " seconds")

    
    # Returns a list openings from loaded games
    def getOpenings(self):
        print("----------------- Getting Openings ----------------")
        openings = []

        for game in self.gameList:
            if ('opening' in game):
                openings.append(game['opening']['name'])
        return openings

    # Prints list of openings
    def printOpenings(self):
        print(self.getOpenings())

    

test = LichessProject('DrNykterstein', 10)
test.printOpenings()
print(test.gameList)