import React, { Component } from 'react'
import CardListContext from '../contexts/CardListContext';
import '../css/DeckScreen.css'

export default class DeckScreen extends Component {
    static contextType = CardListContext;
    render() {
        return (
            <div className='deck'>
                {this.context.decks.map((deck) => {
                    return( 
                        <>
                            {/* <h3 className='deckContainer'>{deck.title}</h3>
                            <img src={`${deck.picturerul}`} />{console.log(deck.pictureurl)} */}
                        </>
                    )
                })}
            </div>
        )
    }
}
