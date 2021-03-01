from StringCount import StringCount
#This file contains various(well one) algorithms to analyze the chess data 

# print the most commonly played opening
def findMostPlayedOpening(gameDatabase):#takes an object of type DataSorter as a parameter
    
    addToEnd = True
    tempList = []
    
    for game in gameDatabase.getGameList():
        addToEnd = True
        if (len(tempList) == 0):
            
            tempList.append(StringCount(game.getOpening(),1))

        else:
            
            for opening in tempList:
                
                if (game.getOpening() == opening.getName()):
                
                    opening.add()
                    addToEnd = False
                    break
                    
                
            if(addToEnd):
            
                tempList.append(StringCount(game.getOpening(),1))
                

    mostPlayed = tempList[0]
    for opening in tempList:
        if (opening.getCount() > mostPlayed.getCount()):
            mostPlayed = opening
    return('This users favourive opening is the ' + mostPlayed.getName() + '. They have played it ' + str(mostPlayed.getCount()) + ' times.\n')


# prints the most common response a player has to a specified first move
def findMostCommonRespose(move, gameDatabase):#(move)takes parameter of type string ex) e4,d4,nc3 etc. #(gameDatabase)takes parameter of type DataSorter
    gamesByMove = gameDatabase.createGameListByFirstMove(move)
    if(len(gamesByMove) == 0):
        print('The user has never played against that')
        return
    print(str(len(gamesByMove)))
    addToEnd = True
    tempList = []
    
    for game in gamesByMove:
        addToEnd = True
        if (len(tempList) == 0):
            
            tempList.append(StringCount(game.getMoves()[1],1))

        else:
            
            for opening in tempList:
                
                if (game.getMoves()[1] == opening.getName()):#name is confusing here
                    
                    opening.add()
                    addToEnd = False
                    break
                    
                
            if(addToEnd):
                
                tempList.append(StringCount(game.getMoves()[1],1))
                

    mostPlayed = tempList[0]
    for opening in tempList:
        if (opening.getCount() > mostPlayed.getCount()):
            mostPlayed = opening

    return("This users most common response to " + move + " is " + mostPlayed.getName() + ". They have done it " + str(mostPlayed.getCount()) + " out of "+ str(len(gamesByMove)) + " opportunities.")



