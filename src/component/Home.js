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
                    <Link to ="/StartScreen" >Play</Link>
                    <Link to ="/CardList">List Cards</Link>
                    {this.context.loggedIn ? this.renderLoggedin() : this.renderLoggedOut()}
                </section>
            </div>
        )
    }
}
