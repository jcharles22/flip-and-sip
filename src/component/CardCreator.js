import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/CardCreator.css'
import CardListContext from '../contexts/CardListContext';

export default class CardCreator extends Component {
    static contextType = CardListContext;
    state = {
        card_title:'',
        card_desc:'',
        card_active: true,
        deck: this.context.decks,
        deckId: [null, null],
        error: '',
        disabled: false,
    }
    handleTitle=(e)=>{
        this.setState({
            card_title:e.target.value
        })
    }
    handleDesc=(e)=>{
        this.setState({
            card_desc:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.context.handleSubmit(this.state)
        
    }
    addRandomPlayer=()=>{
        if(this.state.card_desc === ''){
            this.setState({card_desc: 'random player '})
        } else if (this.state.card_desc.endsWith(' ')){
            this.setState(prevState => (
                {card_desc: prevState.card_desc + 'random player '}))
        } else {
            this.setState(prevState =>(
                {card_desc: prevState.card_desc +' random player'}))
        }
    }

    handleDeckSelected = (e) => {
        let index = e.target.id
        let deckId = e.target.dataset.id
        let newSelected = this.state.deckId
        if(newSelected[index] === null) {
            newSelected[index] = deckId
        } else {
            newSelected[index] = null
        }
        this.setState({
            deckId: newSelected
        })
        if(this.state.deckId[0] === null & this.state.deckId[1] === null) {
            this.setState({
                error: 'One deck has to be selected',
                disabled: true
            })
        } else {
            this.setState({
                error: '',
                disabled: false
            })
        }
    }

    hadleDeck=()=> {
        return(
            this.state.deck.map((deck, index) =>{
                return(
                    <button key={deck.deck_id}  id={index} className={`deckSelect ${this.state.deckId[index]? "selected" : ''}`}  data-id={deck.deck_id} onClick={(e)=> this.handleDeckSelected(e)}>{deck.deck_title}</button>
                )
            })
        )
    }
    handleSubmitButtonDisplay=()=> {
        if(!this.state.disabled) {
            return (
                <button type='submit'  onClick={(e) => this.handleSubmit(e)} ><Link to='/'>Submit</Link></button>
            )
        } else {
            return (
                <button disabled>submit</button>
            )
        }

    }
    render() {
        return (
            <div className='CardCreator'>
                <label>Enter a title:</label>
                <input type='text' onChange={(e)=> this.handleTitle(e)}></input>
                <label>Enter the descritpion:</label>
                <textarea onChange={(e)=> this.handleDesc(e)} value={this.state.card_desc}></textarea> 
                <button onClick={()=> this.addRandomPlayer()}>Add Random Player</button>
                <p>select which deck to add it too.</p>
                <div className='deckSelectContainer'>
                {this.hadleDeck()}
                </div>
                <p>{this.state.error}</p>
                <br />
                {this.handleSubmitButtonDisplay()}
            </div>
        )
    }
}


