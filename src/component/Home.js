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
                <p className='description'>Flip-and-sip a fun card drinking game for 2 or more players!</p>
                <p className='description'>Press play to start or SignIn to create new cards or turn on or off ones in play.</p>

            </div>
        )
    }
}
