import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Logo extends Component {
    render() {
        return (
            <div>
                 <h1><Link to='/'><img className = 'logo' src='https://github.com/jcharles22/flip-and-sip/blob/playingWithColor/public/assets/Untitled-1.png?raw=true' alt='Flip and Sip'></img></Link></h1>
                 <h1 className='logoText'><Link to='/'>Flip and Sip</Link></h1>
            </div>
        )
    }
}
