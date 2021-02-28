import AnalysisAlgorithms 
from LichessProject import LichessProject

#This is the main file to do all the testing from


test = LichessProject('fleshygordon', 5)
AnalysisAlgorithms.findMostPlayedOpening(test.gameDatabase)
AnalysisAlgorithms.findMostCommonRespose('d4',test.gameDatabase)

# print("Games for user: " + test.user + "\n")
# for i in range(len(test.refinedGameList)):
    # print("{}, {}, {}, {}, {}, {}, {}, {}, {}\n".format(
        # test.refinedGameList[i].getGameID(), 
        # test.refinedGameList[i].getColour(), 
        # test.refinedGameList[i].getOpening(), 
        # test.refinedGameList[i].getOpeningSpecific(), 
        # test.refinedGameList[i].getVariant(), 
        # test.refinedGameList[i].getTimeControl(), 
        # str(test.refinedGameList[i].getIncrement()), 
        # test.refinedGameList[i].getOutcome(), 
        # test.refinedGameList[i].getMoves()
        # )
    # )