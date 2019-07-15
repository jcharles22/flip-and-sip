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
import './css/App.css'
import CardListContext from './contexts/CardListContext';


export default class App extends Component {
  static contextType = CardListContext


  componentDidMount(){
    this.context.setCards()
   }


  // shuffle() {
  //   let newArray = this.state.cards;
  //     let currentIndex= newArray.length, temporaryValue, randomIndex;

  //     while(0 !== currentIndex) {
  //         randomIndex = Math.floor(Math.random() * currentIndex);
  //         currentIndex -= 1;

  //         temporaryValue = newArray[currentIndex];
  //         newArray[currentIndex] = newArray[randomIndex];
  //         newArray[randomIndex] = temporaryValue;
  //     }
  //     this.setState({cards: newArray});
  // }



  render() {
    console.log(this.state)
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
        <Route path='/CardList' exact component={() => <CardList
          handleCardChange={(cardKey) => this.handleCardChange(cardKey)}
          />}
        />
        <Route path='/CardCreator' exact component={() => <CardCreator  handleSubmit={(newCard)=>this.handleSubmit(newCard)}/>}/> 

      </div>
    );
  }
}

