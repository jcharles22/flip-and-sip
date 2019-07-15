import React, { Component } from 'react'
import TokenService from '../services/token-service';

const CardListContext = React.createContext({
    cards: [],
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
        players: ['player1'],
        error: null,
        loggedIn: TokenService.hasAuthToken(),
        activeCards: [],
        playingCards: [],
    };
    
    setCards = () => {
        this.setState({
            cards: [
                {
                    card_id: 1,
                    card_title: "Social",
                    card_desc: "Everyone Take a drink",
                    card_active: true,
                    user_name: "jc"
                },
                {
                    card_id: 2,
                    card_title: "take 2",
                    card_desc: "random player take 2 drinks",
                    card_active: true,
                    user_name: "jc"
                },    
                {
                    card_id: 3,
                    card_title: "Social",
                    card_desc: "Everyone Drink",
                    card_active: true,
                    user_name: "jc"
                },
                {
                    card_id: 4,
                    card_title: "Siblings suck",
                    card_desc: "Everyone drink as many siblings as you have (half and step count)",
                    card_active: true,
                    user_name: "jc"
                },
                {
                    card_id: 5,
                    card_title: "Blondes have more fun",
                    card_desc: "All brunettes take a drink",
                    card_active: true,
                    user_name: "jc"
                },
                {
                    card_id: 6,
                    card_title: "ThumbMaster",
                    card_desc: "random player is the thumb master everytime they puts his thumb on the table everyone else has to the last one has to take a drink",
                    card_active: true,
                    user_name: "jc"
                },
            ]
        })
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
    handleAddPlayer=()=> { 
        console.log('inside handleadd player')
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
    setPlayersName=()=> {
        let playingCards = this.state.cards
        playingCards =  playingCards.filter(card => card.card_active)
        playingCards.map((card, index)=> {
            return (playingCards[index].card_desc=card.card_desc.replace('random player', ''+ this.randomPlayer() +'' ))
        })
        this.setState({
            playingCards: playingCards
        })
    }
    handleCardChange=(cardKey)=>{
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
    }
    handleSubmit=(newCard)=>{
        console.log(newCard)
        newCard.card_id= this.state.cards.length
        let newState = this.state.cards
        newState.push(newCard)
        console.log(newState)
        this.setState({
            playingCards: newState
        })
    }

    render() {
        const value = {
            cards: this.state.cards,
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
            activeCards: this.state.activeCards,
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

