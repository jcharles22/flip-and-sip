import React from 'react';
import ReactDOM from 'react-dom';
import { CardListProvider } from '../src/contexts/CardListContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <CardListProvider>
            <App />
        </CardListProvider>
    </BrowserRouter>, 
    document.getElementById('root'));

