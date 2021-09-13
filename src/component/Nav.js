import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../css/Nav.css'
import CardListContext from '../contexts/CardListContext'

export default class home extends Component {
    static contextType = CardListContext;

    handleLogout=()=>{
        this.context.handleLogout()
    }
    renderLoggedIn(){
        return (
            <>
                <li><Link to='/Login'> Login </Link></li>
                <li><Link to='/SignUp'>Sign Up</Link></li>    
            </>
        )
    }
    renderLoggedOut(){
        return (
                <li><Link 
                    onClick={() => this.handleLogout()} 
                    to='/'>Logout
                </Link></li>
        )
    }

    render() {
        return (
            <nav className='navBarContainer'>
                <ul className='navBar'>
                    <li><Link to='/'>Home</Link></li>
                    {/* {this.context.loggedIn ? this.renderLoggedOut() :  this.renderLoggedIn()} */}
                    <li><Link to='/CardList'>Cards</Link></li>
                </ul>
            </nav> 
        )
    }
}
