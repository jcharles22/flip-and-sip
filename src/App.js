import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import config from './config'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import StartScreen from './component/StartScreen'
import GamePage from './component/GamePage'
import Nav from './component/Nav';
import CardList from './component/CardList'
import CardCreator from './component/CardCreator'
import TokenService from './services/token-service'
import './css/App.css'


export default class App extends Component {
  state ={
   players: ['player1'],
   cards : []
  }

componentDidMount(){
  this.setCards()
}

setCards(){
  fetch('http://localhost:8000/api/card/')
  .then(response => response.json())
  .then(response => this.setState({
    cards: response
  }))
}
handleSubmit(newCard){
  //remove timeout and set up promises resolve fetch then call setCards()
  let { card_title, card_desc, card_active} = newCard
  console.log(card_title, card_desc, card_active)
  fetch(`${config.API_ENDPOINT}/card`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify({
      card_title,
      card_desc,
      card_active
    })
  }
  
  )
  //remove timeout
  setTimeout(()=> {this.setCards(); }, 1000)
}
handleCardChange(cardKey){
  console.log(cardKey.target.id)
  let key = cardKey.target.id
  key = Number(key)
  let updateActive = this.state.cards
  updateActive.map((card, index) =>{
    if(card.card_id === key){
      console.log('inside', card)
      return (updateActive[index].card_active = !card['card_active'])
    } else {
    return card
    }
  }) 
  this.setState({
    cards: updateActive
  })
  this.updateCardInDatabase(key)
 
}
updateCardInDatabase(id){
    let updatedCard = this.state.cards.filter(obj => {
      return (obj.card_id === id)
    })
    let { card_id, card_title, card_desc, card_active } = updatedCard[0]
    console.log(  card_id, card_title, card_desc, card_active)
    fetch(`${config.API_ENDPOINT}/card`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        card_id,
        card_title,
        card_desc,
        card_active
      })
    })
  }
  
shuffle() {
  let newArray = this.state.cards;
    let currentIndex= newArray.length, temporaryValue, randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }
    this.setState({cards: newArray});
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
  console.log(index, value, )
  if(checkValue === `player${parseInt(index)+1}`) {
    newState[index] = value.slice(-1)
    this.setState({
      players: newState
    })
  } else {
    newState[index] = value
    this.setState({players: newState}) 
  }
  console.log(this.state.players)
}

  render() {
    return (
      <div>
        <Nav></Nav>
        <h1><Link to='/'>Flip & Sip</Link></h1>
        
        <Route path='/' exact component={Home}/>

        <Route path='/LogIn' exact component={({history}) => <Login history={history} />}/>

        <Route path='/Signup' exact component={Signup}/>

        <Route path='/StartScreen' exact component={() => <StartScreen 
          handleAddPlayer={(e) => this.handleAddPlayer(e)}
          handleRemovePlayer={(e) => this.handleRemovePlayer(e)}
          handleNameChange={(e) => this.handleNameChange(e)}
          state={this.state}
          shuffle={() => this.shuffle()}
        />}/>

        <Route path='/GamePage' exact component={({history}) => <GamePage
          state={this.state}
          history={history}
        />
        }/>
        <Route path='/CardList' exact component={() => <CardList
          state={this.state.cards}
          handleCardChange={(cardKey) => this.handleCardChange(cardKey)}
          />}
        />
        <Route path='/CardCreator' exact component={() => <CardCreator  handleSubmit={(newCard)=>this.handleSubmit(newCard)}/>}/> 

      </div>
    );
  }
}

