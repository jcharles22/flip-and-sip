import React, { Component } from 'react';
import CardListContext from '../contexts/CardListContext';
import CardApiService from '../services/card-api-service';
import {TweenMax, Bounce} from "gsap";
import '../css/GamePage.css';

export default class GamePage extends Component {
    static contextType = CardListContext;

    state={
        currentCard: 0,
        cards:[]
    }
    componentDidMount(){
        this.setPlayers()
        this.context.clearError()
        CardApiService.getCards()
            .then(this.context.setCards)
            .catch(this.context.setError)
            .then(this.listCards())
            .then(this.context.setGameCards());
       }
       
    listCards() {
        const {cardList} = this.context
        console.log(cardList)
    }

    setPlayers() {
        
        let cards = this.props.state.cards
        // cards = cards.filter(card => card.card_active)
        //  cards.map((card, index)=> {
        //     return (cards[index].card_desc=card.card_desc.replace('random player', ''+ this.randomPlayer() +'' ))
        // })
        this.setState({
            cards: cards
        })
    }

    showCards= () => {

        if(this.state.currentCard >= this.state.cards.length){
            return (
                <div>
                    <h2>No more Cards</h2>
                    <p>Click agian to play again! :)</p>
                </div>)
        } else {
        return (
            <div className='card'>
                <h2>{this.state.cards[this.state.currentCard].card_title}</h2>
                <p>{this.state.cards[this.state.currentCard].card_desc}</p>
            </div>)
        }
    }
    flip=()=>{
                TweenMax.from('.cardContainer', .5, {opacity:0, scale:0, ease:Bounce.easeOut})

    }
    nextCard= () => {
        this.flip()
        this.setState({
            currentCard: this.state.currentCard + 1
        })
        if(this.state.currentCard >= this.state.cards.length){
            this.props.history.push('/StartScreen')
        }
    }

    
    renderCards() {
        const { cards = [] } = this.context
    }


    render() {
        return (
            <div className='cardContainer' onClick={() => this.nextCard()}>
                  {this.showCards()}              
            </div>
        )
    }
}
