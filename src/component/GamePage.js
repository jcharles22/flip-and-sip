import React, { Component } from 'react';
import CardListContext from '../contexts/CardListContext';
import {TweenMax, Bounce } from "gsap";
import '../css/GamePage.css';
import { Draggable } from 'gsap/all'

export default class GamePage extends Component {
    static contextType = CardListContext;  

    componentDidMount=()=> {
        console.log('yeah')
        Draggable.create('.draggable', {
            type: 'x,y',
            onRelease: ()=> {
                console.log(this.state.currentCard)
              this.nextCard()
            },
          });
    };
    

    state={
        currentCard: 0,
    }


    showCards= () => {
        if(this.context.playingCards) {
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
                <p> {this.context.playingCards[this.state.currentCard].card_desc}</p>
            </div>)
        }
    }
    }
    flip=()=>{
        TweenMax.fromTo('.cardContainer', .5, {x: 0, y: 0, opacity:0, scale:0, ease:Bounce.easeOut}, {opacity:1, scale:1})
    }
    nextCard= () => {
        this.flip()
        this.setState({
            currentCard: this.state.currentCard + 1
        })
        if(this.state.currentCard >= this.context.playingCards.length+1){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className='cardContainer draggable'>
                <img className='beer' src='/assets/678063-beer-512.png' alt='beer'></img>
                {this.showCards()}      
                <img className='beer1' src='/assets/678063-beer-512.png' alt='beer'></img>
        
            </div>
        )
    }
}
