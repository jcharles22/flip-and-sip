import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/StartScreen.css'
import CardListContext from '../contexts/CardListContext';

export default class StartScreen extends Component {
    static contextType = CardListContext

    render() {
        return (
            <section className = 'playersInputForm'>
                <label className='playerNameForm'>Players Name:
                    {this.context.players.map((player, index) => (
                        <input type='text' 
                            key={`player${index+1}`} 
                            className={`playerName player${index}`}
                            value={player}
                            onChange = {(e) => this.context.handleNameChange(e)} 
                            autoFocus
                        />
                    ))}
                    
                    <button onClick={() => this.context.handleRemovePlayer()}>-</button>
                    <button onClick={() => this.context.handleAddPlayer()}>+</button>
                    <Link to='/GamePage'>
                        <button className='startButton' onClick={() => this.context.setPlayersName()}>Cherrs!</button>
                    </Link>
                </label>
            </section>
        )
    }
}
