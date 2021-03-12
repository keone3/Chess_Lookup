//used as part of the LinkedList implementation

class ListNode{

    constructor(game, next, prev){

        this.game = game
        this.next = next
        this.prev = prev//unused for now. Will implement as needed

    }

    
    
    // Getters and Setters
    getPrev(){
        return this.prev
    }
    setPrev(prev){
        this.prev = prev 
    }
    getNext(){
        return this.next
    }
    setNext(next){
        this.next = next
    }
    getGame(){
        return this.game
    }
    setGame(game){
        this.game = game
    }
    

}