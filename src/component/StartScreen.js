import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/StartScreen.css'

export default class StartScreen extends Component {

    render() {
        return (
            <section className = 'playersInputForm'>
                <label className='playerNameForm'>Players Name:
                    {this.props.state.players.map((player, index) => (
                        <input type='text' 
                            key={`player${index+1}`} 
                            className={index}
                            value={player}
                            onChange = {(e) => this.props.handleNameChange(e)} 
                            autoFocus
                        />
                    ))}
                    
                    <button onClick={(e) => this.props.handleRemovePlayer(e)}>-</button>
                    <button onClick={(e) => this.props.handleAddPlayer(e)}>+</button>
                    <Link to='/GamePage'>
                        <button className='startButton' onClick={() => this.props.shuffle()}>Cherrs!</button>
                    </Link>
                </label>
            </section>
        )
    }
}
