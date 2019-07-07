import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import Nav from './component/Nav'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import StartScreen from './component/StartScreen'
import GamePage from './component/GamePage'
import Nav from './component/Nav';

import './css/App.css'

export default class App extends Component {
  state ={
   players: ['player1']
  }

  handleAddPlayer=()=> { 
    let newState = this.state.players
    newState.push(`player${this.state.players.length+1}`)
    this.setState({
      players: newState
    })
}

handleRemovePlayer=()=> { 
    if(this.state.players.length === 1) {
      return 
    }  
    let newState = this.state.players
    newState.pop();
    this.setState({
      players: newState
    })
}

handleNameChange=(e)=> {

  let index = e.target.className
  let { value } = e.target
  let newState = this.state.players
  let checkValue = value.slice(0,-1)
  if(checkValue === `player${parseInt(index)+1}`) {
    newState[index] = value.slice(-1)
    this.setState({
      players: newState
    })
  } else {
    newState[index] = value
    this.setState({players: newState}) 
  }
}

  render() {
    return (
      <div>
        <Nav></Nav>
        <Link to='/'><h1>Flip & Sip</h1></Link>
        
        <Route path='/' exact component={Home}/>

        <Route path='/LogIn' exact component={Login}/>

        <Route path='/Signup' exact component={Signup}/>

        <Route path='/StartScreen' exact component={() => <StartScreen 
          handleAddPlayer={(e) => this.handleAddPlayer(e)}
          handleRemovePlayer={(e) => this.handleRemovePlayer(e)}
          handleNameChange={(e) => this.handleNameChange(e)}
          state={this.state}
        />}/>

        <Route path='/GamePage' exact component={() => <GamePage
          state={this.state}
        />
        }/>

      </div>
    );
  }
}

