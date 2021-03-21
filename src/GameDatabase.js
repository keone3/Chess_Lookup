

class GameDatabase{

    constructor(){

        this.fullGameList = new LinkedList()

    }

    addGame(game){// game is of type Game
        
        let gameNode = new ListNode(game, null, null)//creates node for the game
        this.fullGameList.addBack(gameNode)//adds game to various lists depending on the information about the game
        
    }

    generateGameList(speed, colour){// generates a list of game of the specified game speed and colour

        let partitionedList = new LinkedList()
        let curr = this.fullGameList.getHead()
        while (curr != null){
            if(colour == 'all'){
                if(curr.getGame().getSpeed() == speed){
                    let newNode = new ListNode(curr.getGame(), null, null)
                    partitionedList.addBack(newNode)
                }
            }else{
                if(curr.getGame().getColour() == colour && curr.getGame().getSpeed() == speed){
                    let newNode = new ListNode(curr.getGame(), null, null)
                    partitionedList.addBack(newNode)
                }
            }
            curr = curr.getNext()
        }

        return partitionedList

    }

    
    




}
