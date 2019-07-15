import React, { Component } from 'react'
import '../css/CardList.css'
import CardListContext from '../contexts/CardListContext';

export default class CardList extends Component {
    static contextType = CardListContext

    render() {
        return (
            <div className='row'>
                <p>Click the cards you dont want to play with or click then agian to add them back.</p>
                {this.context.cards.map(card =>{
                    return(
                        <section key={card.card_id} 
                            id={card.card_id}
                            onClick={(cardKey)=> this.context.handleCardChange(cardKey)}
                            className={`ListCardContainer column 
                            ${card.card_active ? 'active': 'notActive'}`} 
                        >
                            <h2 id={card.card_id} >{card.card_title}</h2>
                            <p id={card.card_id} >{card.card_desc}</p>
                            <p id={card.card_id} className='author'>- {card.user_name}</p>
                        </section>)
                })}
            </div>
        )
    }
}
