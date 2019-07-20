import React, { Component } from 'react'
import TokenService from '../services/token-service';
import config from '../config'

const CardListContext = React.createContext({
    cards: [],
    decks: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setCards: () => {},
    handleLogin: () => {},
    handleAddPlayer: () => {},
    handleRemovePlayer: () => {},
    handleNameChange: (e) => {},
    setPlayersName: () => {},
    handleCardChange: (cardKey) => {},
    handleSubmit: (newCard) => {},
})

export default CardListContext

export class CardListProvider extends Component {
    state = {
        cards: [],
        decks: [],
        players: ['player1'],
        error: null,
        loggedIn: TokenService.hasAuthToken(),
        playingCards: [],
    };
    
    setCards = () => {
        fetch('http://localhost:8000/api/card/')
        .then(response => response.json())
        .then(response => this.setState({
            cards: response
          }))
        .catch(error => this.setState({error}))

        fetch('http://localhost:8000/api/deck/')
        .then(response => response.json())
        .then(response => this.setState({
            decks: response
        }))
        .catch(error => this.setState({error}))
    }
    setError = error => {
        this.setState({ error })
    }
    clearError = () => {
        this.setState({ error:null })
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
    randomPlayer() {
        let names=this.state.players
        return  names[Math.floor(Math.random() * names.length)]
    }
    handleLogin=()=> {
        if(TokenService.hasAuthToken()) {
            this.setState({ loggedIn: true })
        }
    }
    handleLogout=()=> {
        TokenService.clearAuthToken()  
        this.setState({ loggedIn: false })        
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
    setPlayersName=()=> {
        let playingCards = this.state.cards
        
        playingCards = playingCards.filter(card => card.card_active)
        playingCards.map((card, index)=> {
            return (playingCards[index].card_desc=card.card_desc.replace('random player', ''+ this.randomPlayer() +'' ))
        })
        playingCards = this.shuffleCards(playingCards) 
        this.setState({
            playingCards
        })
        this.setCards();

    }
    handleCardChange=(cardKey)=>{
        let key = cardKey.target.id
        key = Number(key)
        let updateActive = this.state.cards
        updateActive.map((card, index) =>{
          if(card.card_id === key){
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
    handleSubmit=(newCard)=>{
        //remove timeout and set up promises resolve fetch then call setCards()
        let { card_title, card_desc, card_active} = newCard
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

    render() {
        const value = {
            cards: this.state.cards,
            decks: this.state.decks,
            playingCards: this.state.playingCards,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setCards: this.setCards,
            loggedIn: this.state.loggedIn,
            handleLogout: this.handleLogout,
            handleLogin: this.handleLogin,
            handleAddPlayer: this.handleAddPlayer,
            handleRemovePlayer: this.handleRemovePlayer,
            handleNameChange: this.handleNameChange,
            players: this.state.players,
            setPlayersName: this.setPlayersName,
            handleCardChange: this.handleCardChange,
            handleSubmit: this.handleSubmit,
        }
    return(
            <CardListContext.Provider value={value}>
                {this.props.children}
            </CardListContext.Provider>
        )

    }
}

