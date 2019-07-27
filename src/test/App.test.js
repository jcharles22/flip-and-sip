import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from '../component/Login';
import CardCreator from '../component/CardCreator'
import CardList from '../component/CardList';
import DeckScreen from '../component/DeckScreen';
import GamePage from '../component/GamePage';
import Home from '../component/Home';
import Signup from '../component/Signup';
import StartScreen from '../component/StartScreen';

it('renders Login without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders CardCreator without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><CardCreator /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders CardList without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders DeckScreen without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeckScreen />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders GamePage without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><GamePage /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders Home without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Home /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders Signup without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders StartScreen without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><StartScreen /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });