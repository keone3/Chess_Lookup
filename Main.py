from AnalysisAlgorithms import *
from LichessProject import LichessProject

#This is the main file to do all the testing from


test = LichessProject('Fleshygordon', 10)
AnalysisAlgorithms.findMostPlayedOpening(test.sortedLists)

# print("Games for user: " + test.user + "\n")
# for i in range(len(test.newGameList)):
    # print("{}, {}, {}, {}, {}, {}, {}, {}, {}\n".format(
        # test.newGameList[i].getGameID(), 
        # test.newGameList[i].getColour(), 
        # test.newGameList[i].getOpening(), 
        # test.newGameList[i].getOpeningSpecific(), 
        # test.newGameList[i].getVariant(), 
        # test.newGameList[i].getTimeControl(), 
        # str(test.newGameList[i].getIncrement()), 
        # test.newGameList[i].getOutcome(), 
        # test.newGameList[i].getMoves()
        # )
    # )