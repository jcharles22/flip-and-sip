import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CardListContext from '../contexts/CardListContext';
import '../css/DeckScreen.css'

export default class DeckScreen extends Component {
    static contextType = CardListContext;


    render() {
        return (
            <>
                <div className='deck'>
                <p className='description'>Choose a deck to play with</p>

                    {this.context.decks.map((deck) => {
                        let url = deck.url
                        return( 
                            <Link to='/StartScreen' key={deck.deck_id} className='deckContainer'>
                                <img src={url} id={deck.deck_id}  className='deckImg' alt={deck.deck_title} onClick={(e) => {this.context.handleDeckSelected(e)}}></img>
                                <h3 className='deckTitle' >{deck.deck_title}</h3>
                            </Link>     
                           
                        )
                    })}
                </div>
            </>
        )
    }
}

