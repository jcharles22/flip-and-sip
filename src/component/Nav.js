import React, { Component } from 'react'
import '../css/Nav.css'

export default class home extends Component {
    render() {
        return (
            <nav className='navBarContainer'>
                <ul className='navBar'>
                    <li>Home</li>
                    <li>Login</li>
                    <li>Sign Up</li>
                    <li>Cards</li>
                </ul>
            </nav>
        )
    }
}
