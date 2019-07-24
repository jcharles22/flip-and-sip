import React, { Component } from 'react';
import CardListContext from '../contexts/CardListContext';
import {TweenMax, Bounce} from "gsap";
import '../css/GamePage.css';

export default class GamePage extends Component {
    static contextType = CardListContext;

    state={
        currentCard: 0,
    }


    showCards= () => {

        if(this.state.currentCard >= this.context.playingCards.length){
            return (
                <div className='card'>
                    <h2>No more Cards</h2>
                    <p>Thanks for Playing!  :)</p>
                    <p>click again</p>
                </div>)
        } else {
        return (
            <div className='card'>
                <h2>{this.context.playingCards[this.state.currentCard].card_title}</h2>
                <p>{this.context.playingCards[this.state.currentCard].card_desc}</p>
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
        if(this.state.currentCard >= this.context.playingCards.length){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className='cardContainer' onClick={() => this.nextCard()}>
                  {this.showCards()}              
            </div>
        )
    }
}
