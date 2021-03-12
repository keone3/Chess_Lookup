//standard linked list implementation using ListNode

class LinkedList{

    constructor(){
        //list does not have doubly linked nodes. Nodes have the field if it needs to be implemented
        this.head = null
        this.tail = null
        this.size = 0

    }
    
    addBack(game){//parameter is of type ListNode. Adds to the back of the list
        
        if(this.size == 0){
            
            this.head = game
            this.tail = game
        }else{
            
            this.tail.setNext(game)
            this.tail = game
        }
        this.size++
    }

    addFront(game){//parameter is of type Game. Adds to the front of the list
        if(this.size == 0){
            this.head = game
            this.tail = game
        }else{
            game.setNext(head)
            this.head = game
        }
        this.size++
    }

    removeBack(){//removes the last element in the list
        if(this.size < 2){
            this.head = null
            this.tail = null
            this.size = 0
        }else{
            this.tail = tail.getPrev()
            this.tail.setNext(null)
            this.size--
        }
    }

    removeFront(){//removes the first element in the list
        if(this.size < 2){
            this.size = 0
            this.head = null
            this.tail = null
        }else{
            this.head = this.head.getNext()
            this.size--
        }
    }

    clear(){//empties the list
        this.head = null
        this.tail = null
        this.size = 0
    }
    
    //getters
    getHead(){
        return this.head
    }

    getTail(){
        return this.tail
    }

    getSize(){
        return this.size
    }

    

}