from Opening import Opening
#This file contains various(well one) algorithms to analyze the chess data 



    

def findMostPlayedOpening(sortedLists):#takes an object of type DataSorter as a parameter
    

    addToEnd = True
    tempList = []
    
    for game in sortedLists.getGameList():
        addToEnd = True
        if (len(tempList) == 0):
            
            tempList.append(Opening(game.getOpening()))

        else:
            
            for opening in tempList:
                
                if (game.getOpening() == opening.getOpening()):
                
                    opening.add()
                    addToEnd = False
                    break
                    
                
            if(addToEnd):
            
                tempList.append(Opening(game.getOpening()))
                

    mostPlayed = tempList[0]
    for opening in tempList:
        if (opening.getCount() > mostPlayed.getCount()):
            mostPlayed = opening
    print('This users favourive opening is ' + mostPlayed.getOpening() + '. They have played it ' + str(mostPlayed.getCount()) + ' times.\n')













