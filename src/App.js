import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import Nav from './component/Nav'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import StartScreen from './component/StartScreen'

import './css/App.css'

export default class App extends Component {

  render() {
    return (
      <div>
        <Link to='/'><h1>Flip & Sip</h1></Link>
        <Route path='/' exact component={Home}/>
        <Route path='/LogIn' exact component={Login}/>
        <Route path='/Signup' exact component={Signup}/>
        <Route path='/StartScreen' exact component={StartScreen}/>

      </div>
    );
  }
}

