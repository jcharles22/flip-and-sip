import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/StartScreen.css'

export default class StartScreen extends Component {

    render() {
        console.log(this.props.state)
        return (
            <section className = 'playersInputForm'>
                <label className='playerNameForm'>Players Name:
                    {Object.keys(this.props.state).map((player, index) => (
                        <input type='text' 
                            key={`player${index+1}`} 
                            className={player}
                            value={this.props.state[player]}
                            onChange = {(e) => this.props.handleNameChange(e)} 
                            autoFocus
                        />
                    ))}
                    
                    <button onClick={(e) => this.props.handleRemovePlayer(e)}>-</button>
                    <button onClick={(e) => this.props.handleAddPlayer(e)}>+</button>
                    <Link to='/GamePage'>
                        <button className='startButton'>Cherrs!</button>
                    </Link>
                </label>
            </section>
        )
    }
}
