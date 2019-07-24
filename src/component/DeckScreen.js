import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CardListContext from '../contexts/CardListContext';
import '../css/DeckScreen.css'

export default class DeckScreen extends Component {
    static contextType = CardListContext;
    render() {
        console.log(this.context)
        return (
            <>
                <p>Choose a deck to play with</p>
                <div className='deck'>
                    {this.context.decks.map((deck) => {
                        return( 
                                <Link to='/StartScreen' key={deck.deck_id}>
                                    <h3 className='deckContainer'
                                        key={deck.deck_id}
                                        id={deck.deck_id} 
                                        onClick={(e) => {this.context.handleDeckSelected(e)}}>{deck.deck_title}
                                    </h3>
                                </Link>
                           
                        )
                    })}
                </div>
            </>
        )
    }
}
