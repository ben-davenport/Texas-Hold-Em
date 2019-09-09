import React from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand'
import Deck from '../utilityClasses/Deck'

class PokerTable extends React.Component{
    constructor(props){
        super(props)
        this.deck= new Deck();
        this.deck.create();
        this.deck.shuffle();
        console.log(this.deck.cards)
        this.state = {
            playerHand: [],
            dealerHand: [],
            communityHand: [],
        }
    }
    //this method is made by us; not a react method
    //in here we deal the first 4 cards
    prepDeck =()=> {
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        this.setState({
            playerHand: [card1, card3],
            dealerHand: [card2, card4],
        })
    }
    render(){
        return(<div className="the-table col-sm-12">
            <PokerHand cards={this.state.playerHand} /> {/* Player1 hand */}
            <PokerHand cards={this.state.communityHand}/> {/* Community hand */}
            <PokerHand cards={this.state.dealerHand}/> {/* Player2 hand */}
            <button onClick={this.prepDeck} className="btn btn-primary">Start Game</button>

        </div>)
    }
}
export default PokerTable;