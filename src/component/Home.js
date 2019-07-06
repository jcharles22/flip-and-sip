import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'

export default class Home extends Component {    
    render() {  
   
        return (
            <div>
                
                <section className='homeButtons'>
                    <Link to ="/Login" >log in</Link>
                    <br />
                    <Link to ="/Signup" >Sing up</Link>
                    <br />
                    <Link to ="/StartScreen" >Play</Link>
                    
                </section>
            </div>
        )
    }
}
