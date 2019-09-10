import React from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand'
import Deck from '../utilityClasses/Deck'
import { arrayExpression } from '@babel/types';

class PokerTable extends React.Component{
    constructor(props){
        super(props)
        this.deck= new Deck(); //make a new Deck object
        this.deck.create(); //create a deck from Deck
        this.deck.shuffle(); //shuffle the deck
        console.log(this.deck.cards)
        this.state = {
            playerHand: ['deck', 'deck'], //playa cards
            dealerHand: ['deck', 'deck'],
            communityHand: ['deck', 'deck', 'deck', 'deck', 'deck'],
            wager: 0,
            bankroll: 100
        }
    }

    // checkHandRank = ()=>{
    //     let playerPlusComm =[...this.state.playerHand, ...this.state.communityHand]
    //     let dealerPlusComm = [...this.state.dealerHand, ...this.state.communityHand]
    //     hand.forEach((card)=>{
    //         const value = Number(card.slice(0,-1));
    //         const suit = card.slice(-1);
    //         console.log(value, suit)
    //     })
    //     for(let x=0; x<playerPlusComm.length; x++){
    //         // || /10*/ || /11*/ || /12*/ || /13*/)
    //         if (playerPlusComm[x] = /10*/){
    //             let suit = playerPlusComm[x].split('');
    //             playerPlusComm[x] = `T${suit[2]}`
    //             console.log(playerPlusComm[x])
    //             }
    //         else{
    //             console.log('no 10s')
    //         }
    //     }
    //     const playerhandRank = window.Hand.solve(playerPlusComm) 
    //     const dealerHandRank = window.Hand.solve(dealerPlusComm)
    // }

    //this method is made by us; not a react method
    //in here we deal the first 4 cards
        prepDeck = ()=> {
            const card1 = this.deck.cards.shift();
            const card2 = this.deck.cards.shift();
            const card3 = this.deck.cards.shift();
            const card4 = this.deck.cards.shift();
            this.setState({
                playerHand: [card1, card3],
                dealerHand: [card2, card4],
                communityHand: ['deck', 'deck', 'deck', 'deck']
            })
        }
    bet = (amount) =>{
        const newWager = this.state.wager + amount;
        const newBankRoll = this.state.bankroll - amount;
        if(newBankRoll >= 0){
            this.setState({
                wager: newWager,
                bankroll: newBankRoll
            })
        }
        else{
            this.setState({
                msg: "You don't enough money for that bet!"
            },
            this.clearMsg)
            
        }
    }
    clearMsg = () => {
        setTimeout(()=>{
            this.setState({
                msg:""
            })
        }, 2000)
    }
    check = ()=>{
        //WE DO NOT WANT TO MUTATE OR CHANGE STATE
        //INSTEAD WE MAKE A COPY AND DO STUFF TO THE COPY AND HAND IT BACK TO SET STATE
        let communityNewHand = [...this.state.communityHand];
        if(communityNewHand[0] === 'deck'){
            //this must be the flop
            communityNewHand = [
                this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift(),
            ]
        }
        else{
            //it's not the flop!
            communityNewHand.push(this.deck.cards.shift());
        }
        if(communityNewHand.length === 5){
            //all cards are dealt
            this.checkHandRank();
        }
        this.setState({
            communityHand: communityNewHand
        })

    }

    render(){
        return(
        <div className="the-table col-sm-12">
            <div className="col-sm-12 text-center the-numbers">
                <div className="col-sm-3 col-sm-offset-3">
                    Current Pot: ${this.state.wager}
                </div>
                <div className="col-sm-3">
                    Bankroll: ${this.state.bankroll}
                </div>
            </div>
            <div className="player-message">
                {this.state.msg}
            </div>
            <PokerHand cards={this.state.playerHand} /> {/* Player1 hand */}
            <PokerHand cards={this.state.communityHand}/> {/* Community hand */}
            <PokerHand cards={this.state.dealerHand}/> {/* Player2 hand */}
            <div className="col-sm-12 buttons">
                <button onClick={this.prepDeck} className="btn btn-primary">Deal</button>
                <button onClick={()=>{this.bet(5)}} className="btn btn-success">Bet 5</button>
                <button onClick={this.check} className="btn btn-info">Check</button>
                <button onClick={this.fold} className="btn btn-warning">Fold</button>
            </div>


        </div>)
    }
}
export default PokerTable;