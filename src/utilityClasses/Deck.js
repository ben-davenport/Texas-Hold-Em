import React from 'react';

//No extend because this is not a component
//it will not be rendered anywhere;
//it is just some oop javascript
class Deck{
    constructor(){
        this.cards = [];
            //no need to call super, because there's no extends
    }
    create(){
        //I make a new deck of cards;
        //two loops - one for suit and one for value;
        const suits = ['h', 's', 'd', 'c'];
        suits.forEach((suit)=> {
            //inner loop for the value
            for(let c=1; c<= 13; c++){
                //push onto this.deck, c and suit
                this.cards.push(c+suit);
            }
        })
    }
    shuffle(){
        //I take a new deck of cards and shuffle them
        //deck is in this.deck;
        //to shuffle swap 2 indices in the array, many many times;
        for(let i=0; i < 1000000; i++){
            let rand1 = Math.floor(Math.random() * 52);
            let rand2 = Math.floor(Math.random() * 52);

            //store the value in this.deck[rand1] in a temp variable
            let temp = this.cards[rand1];
            this.cards[rand1] = this.cards[rand2];
            this.cards[rand2] = temp;
        }

    }
}
export default Deck;