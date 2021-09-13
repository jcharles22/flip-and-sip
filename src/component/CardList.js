import React, { Component } from 'react'
import '../css/CardList.css'
import CardListContext from '../contexts/CardListContext';
import TokenService from '../services/token-service';

export default class CardList extends Component {
    static contextType = CardListContext

    state = {
        selected: this.context.deckSelected,
        deckId: null,
        cards: this.context.cards,
        show: [],
        error: 'List of Playing Cards'
    }
    componentWillMount() {
   
        let dselected = this.state.selected === 'House-Party' ? 1 : 2;
        let show = this.state.cards.filter(card => card.deck_id  === dselected)
   
        show = show.sort((a,b) => {
            return (a.card_id - b.card_id || a.deck_id - b.deck_id)
        })
        this.setState({
            show,
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
        return(
        this.state.show.map(card =>{
            return(
                <section 
                    key={card.card_id}
                    id={card.card_id}
                  
                    className={`ListCardContainer column  cardGreen
                    `} 
                >
                      {/* onClick={(cardKey)=> this.handleClick(cardKey)}
                    ${card.active? 'cardGreen': 'cardRed'} */}
                    <h2 id={card.card_id} >{card.card_title}</h2>
                    <p id={card.card_id} className="card-id">{card.card_desc}</p>
                </section>)
        }
        ))
    }

    changeDeck=(decks)=>{
        let deck = decks.target.id
        this.context.changeSelectedDeck(deck)
        
        let show = this.state.cards.filter(card => card.deck_title === deck)
        this.setState({
            show
        })
    }


    render() {
        return (
            <div className='row'>
                {TokenService.hasAuthToken() ? "" : <h5>{this.state.error}</h5>}
                <div className='deckspan'>
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
                }
                
                )}
                </div>
                
                {this.renderCards()}
                
                
                
            </div>
        )
    }
}
