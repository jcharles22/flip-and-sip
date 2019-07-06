import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import Nav from './component/Nav'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import StartScreen from './component/StartScreen'
import GamePage from './component/GamePage'

import './css/App.css'

export default class App extends Component {
  state ={
    player1: 'player1'
  }

  handleAddPlayer=()=> { 
    console.log('clicked')
    let playerNum = Object.keys(this.state).length+1   
    let key = `player${playerNum}`       
    this.setState({
        [key] : key
    })
}

handleRemovePlayer=()=> { 
    let playerNum = Object.keys(this.state).length
    let key = `player${playerNum}`
    if(playerNum === 1) {
      return 
    }  
    delete this.state[key]
    this.setState({})
}

handleNameChange=(e)=> {
    let player = e.target.className
    let {value} = e.target
    let checkValue = value.slice(0,-1)

    if(checkValue === player) {
      this.setState({
        [player]: value.slice(-1)
      })
    } else {
    console.log(player)
    console.log(value)
    this.setState({
        [player] : value
    })
  }
}

  render() {
    return (
      <div>
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

