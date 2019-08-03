import React, { Component } from 'react'
import TokenService from '../services/token-service';
import config from '../config'

const CardListContext = React.createContext({
    cards: [],
    decks: [],
    error: null,
    userId: 2,
    deckSelected: '',
    players: [],
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
    setUserName: (name) => {},
    setDeck: () => {},
    changeSelectedDeck: (deck) => {},
    handleDeckSelected: (deckId) => {},
})

export default CardListContext

export class CardListProvider extends Component {
    state = {
        cards: [],
        decks: [],
        players: ['player 1'],
        error: null,
        loggedIn: TokenService.hasAuthToken(),
        playingCards: [],
        userName: 'test',
        userId: 2,
        deckSelected:'House-Party'
    };
    
    setCards = () => {
        fetch(`${config.API_ENDPOINT}/card`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'userName': this.state.userName        
            },
          })
            .then(response => response.json())
            .then(response => this.setState({
              cards: response
          }))
          .catch(error => this.setState({error}))
    }

    setDeck = () => {
        fetch(`${config.API_ENDPOINT}/deck/`)
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

    changeSelectedDeck=(decks) => {

        this.setState({
            deckSelected: decks
        })
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
    handleLogin=(name)=> {
        if(TokenService.hasAuthToken()) {
            this.setState({ 
                loggedIn: true,
                userName: name 
            })
            this.setCards()
        }

    }
    handleLogout=()=> {
        TokenService.clearAuthToken()  
        this.setState({ loggedIn: false, userName: 'test' }) 
        setTimeout(()=> {this.setCards(); }, 10)

    }
    handleAddPlayer=()=> { 
        let newState = this.state.players
        newState.push(`player ${this.state.players.length+1}`)
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
        if(checkValue === `player ${parseInt(index)+1}`) {
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
        let playingCards = this.state.playingCards
        
        playingCards = playingCards.filter(card => card.active)
        playingCards.map((card, index)=> {
            return (playingCards[index].card_desc=card.card_desc.replace('random player', ''+ this.randomPlayer() +'' ))
        })
        playingCards = this.shuffleCards(playingCards) 
        this.setState({
            playingCards : playingCards
        })
        this.setCards();

    }
    handleCardChange=(cardKey, deckId)=>{
        let cardId = Number(cardKey)
        this.updateCardInDatabase(cardId, deckId)
      
    }
    updateCardInDatabase(cardId, deckId){
        let updatedCard = this.state.cards.filter(obj => {
        return (obj.card_id === cardId && obj.deck_id === deckId)
        })
        let { card_id, deck_id} = updatedCard[0]
        let active = !updatedCard[0].active
        let userName = this.state.userName
        fetch(`${config.API_ENDPOINT}/card`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': config.TOKEN_KEY+ TokenService.getAuthToken()
        },
        body: JSON.stringify({
            card_id,
            active,
            userName,
            deck_id
        })
        }) 
        setTimeout(()=> {this.setCards(); }, 100)
    }

    handleSubmit=(newCard)=>{
        let { card_title, card_desc, card_active} = newCard
        let deck = newCard.deckId
        deck = deck.filter(deck => {
                                if(deck === null){
                                    return null
                                } else {
                                    return deck
                                }
                            })
        

        fetch(`${config.API_ENDPOINT}/card`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          },
          body: JSON.stringify({
            card_title,
            card_desc,
            card_active,
            deck
          })
        }
        
        )
        setTimeout(()=> {this.setCards(); }, 1000)
    }

    handleDeckSelected=(deckId) => {
        let deck = parseInt(deckId.target.id)
        let playingCards = this.state.cards
        playingCards = playingCards.filter(card => card.deck_id === deck)
        this.setState({
            playingCards
        })
       
    }
    setUserName=(name)=> {
        this.setState({
            userName: name
        })
    }

    render() {
        const value = {
            cards: this.state.cards,
            decks: this.state.decks,
            userName: this.state.userName,
            playingCards: this.state.playingCards,
            error: this.state.error,
            deckSelected: this.state.deckSelected,
            setError: this.setError,
            clearError: this.clearError,
            setCards: this.setCards,
            setUserName: this.setUserName,
            setDeck: this.setDeck,
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
            handleDeckSelected: this.handleDeckSelected,
            changeSelectedDeck: this.changeSelectedDeck,
        }
    return(
            <CardListContext.Provider value={value}>
                {this.props.children}
            </CardListContext.Provider>
        )

    }
}

