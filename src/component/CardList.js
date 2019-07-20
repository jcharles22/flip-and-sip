import React, { Component } from 'react'
import '../css/CardList.css'
import CardListContext from '../contexts/CardListContext';

export default class CardList extends Component {
    static contextType = CardListContext

    render() {
        console.log(this.context)
        return (
            <div className='row'>
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
