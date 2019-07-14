import React, { Component } from 'react'
import '../css/CardList.css'

export default class CardList extends Component {
    render() {
        console.log(this.props)
        return (
            <div className='row'>
                {this.props.state.map(card =>{
                    return(
                        <section key={card.card_id} 
                            id={card.card_id}
                            onClick={(cardKey)=> this.props.handleCardChange(cardKey)}
                            className={`ListCardContainer column 
                            ${card.card_active ? 'active': 'notActive'}`} 
                        >
                            <h2 id={card.card_id} >{card.card_title}</h2>
                            <p id={card.card_id} >{card.card_desc}</p>
                            <p>{card.user_name}</p>
                        </section>)
                })}
            </div>
        )
    }
}
