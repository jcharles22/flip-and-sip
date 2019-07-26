import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import StartScreen from './component/StartScreen'
import GamePage from './component/GamePage'
import Nav from './component/Nav';
import CardList from './component/CardList'
import CardCreator from './component/CardCreator'
import DeckScreen from './component/DeckScreen'
import TokenService from './services/token-service'
import './css/App.css'
import CardListContext from './contexts/CardListContext';


export default class App extends Component {
  constructor(){
    if (window.performance) {
      if (performance.navigation.type === 1) {
        alert( "This page is reloaded" );
      } else {
        alert( "This page is not reloaded");
      }
    }
    super()
  }
  static contextType = CardListContext


  componentDidMount(){
    TokenService.clearAuthToken();
    this.context.setCards()
    this.context.setDeck()
   }

  render() {
    return (
      <div>
        <Nav></Nav>
        <h1><Link to='/'>Flip & Sip</Link></h1>
        
        <Route path='/' exact component={Home}/>

        <Route path='/LogIn' exact component={({history}) => <Login history={history} />}/>

        <Route path='/Signup' exact component={Signup}/>

        <Route path='/StartScreen' exact component={StartScreen}/>
        <Route path='/DeckScreen' exact component={DeckScreen} />
        <Route path='/GamePage' exact component={({history}) => <GamePage
          history={history}
        />
        }/>
        <Route path='/CardList' exact component={() => <CardList/>}
        />
        <Route path='/CardCreator' exact component={() => <CardCreator  handleSubmit={(newCard)=>this.handleSubmit(newCard)}/>}/> 

      </div>
    );
  }
}

