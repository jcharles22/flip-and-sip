import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/CardCreator.css'
import CardListContext from '../contexts/CardListContext';
import TokenService from '../services/token-service';

export default class CardCreator extends Component {
    static contextType = CardListContext;
    state = {
        card_title:'',
        card_desc:'',
        card_active: true,
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

    renderloginIn=()=> {
        return(
            <p className='cardLogin'>You need to be logged in to create a card</p>
        )
    }
    renderCreate=()=>{
        return(
            <>
                <label>Enter a title:</label>
                <input type='text' onChange={(e)=> this.handleTitle(e)}></input>
                <label>Enter the descritpion:</label>
                <textarea onChange={(e)=> this.handleDesc(e)} value={this.state.card_desc}></textarea> 
                <button onClick={()=> this.addRandomPlayer()}>Add Random Player</button>
                <br />
                <button type='submit' onClick={(e) => this.handleSubmit(e)}><Link to='/'>Submit</Link></button>
            </>
        )
    }

    render() {
        return (
            <div className='CardCreator'>
                {TokenService.hasAuthToken() ? this.renderCreate() : this.renderloginIn()}
            </div>
        )
    }
}
