import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import CardListContext from '../contexts/CardListContext';

export default class Home extends Component {    
    static contextType = CardListContext;

    renderLoggedin() {
        return(
            <Link to='/CardCreator'>Create a Card</Link>
        )
       
    }
    renderLoggedOut() {
        return(
            <>
                <Link to ="/Login" >log in</Link>
                <Link to ="/Signup" >Sign up</Link>
            </>
        )
    }


    render() {  
   
        return (
            <div>
                <section className='homeButtons'>
                    <Link to ="/DeckScreen" >Play</Link>
                    <Link to ="/CardList">List Cards</Link>
                    {this.context.loggedIn ? this.renderLoggedin() : this.renderLoggedOut()}
                </section>
                <ul className='descriptionContainer'>
                    <li className='description' id='desc'>Flip-and-sip a fun card drinking game for 2 or more players!</li>
                    <li className='description' id='desc'>Press play to start or SignIn to create new cards or turn on or off ones in play.</li>
                    <li className='description' id='desc'>Press play to start then choose a deck and enter players names. Then Click or flick the cards to go thorugh the deck and complete the task on the cards.</li>
                </ul>
            </div>
        )
    }
}
