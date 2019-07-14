import React, { Component } from 'react'
import TokenService from '../services/token-service';

const CardListContext = React.createContext({
    cards: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setCards: () => {},
    handleLogin: () => {}
})

export default CardListContext

export class CardListProvider extends Component {
    state = {
        cards: [],
        error: null,
        gameCards: [],
        loggedIn: TokenService.hasAuthToken()
    };
    
    setCards = cards => {
        this.setState({ cards })
    }

    setError = error => {
        console.log(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error:null })
    }

    addPlayersName = (names) => {

    }
    shuffleCards=cards => {
        let newArray = cards;
        let currentIndex= newArray.length, temporaryValue, randomIndex;
    
        while(0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            temporaryValue = newArray[currentIndex];
            newArray[currentIndex] = newArray[randomIndex];
            newArray[randomIndex] = temporaryValue;
        }
        return (newArray)
    }
    setGameCards = players => {
        let gameCards = this.state.cards
        console.log(gameCards)
        gameCards = this.shuffleCards(gameCards)
        console.log(gameCards)
        this.setState({
            gameCards
        })
    }

    randomPlayer(names) {
        return  names[Math.floor(Math.random() * names.length)]
    }
    handleLogin=()=> {
        console.log('logging in')
        if(TokenService.hasAuthToken()) {
            this.setState({ loggedIn: true })
        }
        console.log('loggingIn: ' +this.state.loggedIn)
    }

    handleLogout=()=> {
        console.log('logging out') 
        TokenService.clearAuthToken()  
        this.setState({ loggedIn: false })
        console.log('loggingout: ' +this.state.loggedIn)
        
    }

    render() {
        const value = {
            cardList: this.state.cards,
            gameCards: this.state.gameCards,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setGameCards: this.setGameCards,
            setCards: this.setCards,
            loggedIn: this.state.loggedIn,
            handleLogout: this.handleLogout,
            handleLogin: this.handleLogin
        }
    return(
            <CardListContext.Provider value={value}>
                {this.props.children}
            </CardListContext.Provider>
        )

    }
}

// handleTitle=(e)=>{
//     this.setState({
//         card_title:e.target.value
//     })
// }
// handleDesc=(e)=>{
//     this.setState({
//         card_desc:e.target.value
//     })
// }
// handleSubmit=(e)=>{
//     e.preventDefault()
//     this.props.handleSubmit(this.state)
    
// }
// addRandomPlayer=()=>{
//     if(this.state.card_desc === ''){
//         this.setState({card_desc: 'random player '})
//     } else if (this.state.card_desc.endsWith(' ')){
//         this.setState(prevState => (
//             {card_desc: prevState.card_desc + 'random player '}))
//     } else {
//         this.setState(prevState =>(
//             {card_desc: prevState.card_desc +' random player'}))
//     }
// }