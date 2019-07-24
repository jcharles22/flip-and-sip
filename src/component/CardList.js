import React, { Component } from 'react'
import '../css/CardList.css'
import CardListContext from '../contexts/CardListContext';
import TokenService from '../services/token-service';

export default class CardList extends Component {
    static contextType = CardListContext

    state = {
        selected: 'House-Party',
        deckId: null,
        cards: this.context.cards,
        show: [],
        error: 'Sign In or Sign up to be able to toogle playing Cards'
    }
    componentWillMount() {
        let show = this.state.cards.filter(card => card.deck_title === this.state.selected)
        console.log(show)
        this.setState({
            show            
        })
    }
    handleClick=(cardKey)=>{
        if(TokenService.hasAuthToken()){
            let cardId = cardKey.target.id;
            let deckId = this.state.show[0].deck_id;
            
            this.context.handleCardChange(cardId, deckId)

        }        
        this.setState({
            error: 'Sign In or Sign up'
        })
    }

    renderCards=()=>{
        console.log(this.context.cards)
        return(
        this.state.show.map(card =>{
            return(
                <section 
                    key={card.card_id}
                    id={card.card_id}
                    onClick={(cardKey)=> this.handleClick(cardKey)}
                    className={`ListCardContainer column 
                    ${card.active? 'active': 'notActive'}`} 
                >
                    <h2 id={card.card_id} >{card.card_title}</h2>
                    <p id={card.card_id} >{card.card_desc}</p>
                    <p id={card.card_id} className='author'>- {card.user_name}</p>
                </section>)
        }
        ))
    }


    changeDeck=(decks)=>{
        let deck = decks.target.id
        console.log(deck)
        this.setState({
            selected: deck
        })
        
        let show = this.state.cards.filter(card => card.deck_title === deck)
        console.log(show)
        this.setState({
            show
        })
    }


    render() {
        return (
            <div className='row'>
                {TokenService.hasAuthToken() ? "" : <h5>{this.state.error}</h5>}
                {this.context.decks.map((deck)=> {
                    return (
                        <h3 className={`decks ${this.state.selected===deck.deck_title ? 'selected': ''}`} 
                            key={deck.deck_id}
                            id={deck.deck_title}
                            onClick={(e)=> this.changeDeck(e)}
                            >
                            {deck.deck_title}
                        </h3>
                    )
                })}{this.renderCards()}
                
                
                
            </div>
        )
    }
}
