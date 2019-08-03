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
                            className={index}
                            value={player}
                            onChange = {(e) => this.context.handleNameChange(e)} 
                            autoFocus
                        />
                    ))}
                    <section className='playersButtons'>
                        <button onClick={() => this.context.handleAddPlayer()}>+ Player</button>
                        <button onClick={() => this.context.handleRemovePlayer()}>Remove</button>
                        <Link to='/GamePage'>
                            <button className='startButton' onClick={() => this.context.setPlayersName()}>Cherrs!</button>
                        </Link>
                    </section>
                </label>
            </section>
        )
    }
}


