import React, { Component } from 'react';
import '../css/GamePage.css';

export default class GamePage extends Component {
    state={
        currentCard: 0,
        cards : [
            {
                title: 'Social',
                desc: 'Everyone Drink',
            },
            {
                title: "2's for you",
                desc: this.randomPlayer() + ' take a sip'
            },
            {
                title: "ThumbMaster",
                desc: this.randomPlayer() + ' is the thumb master everytime they puts his thumb on the table everyone else has to the last one has to take a drink'
            },
            {
                title: 'Make a rule',
                desc: this.randomPlayer() + ' Make a rule that everyone has to follow if you fail to do so drink everytime you slip up'
            },
            {
                title:'Question Master',
                desc: this.randomPlayer() + ' is the Question Master if anyone answers them must drink one unless they answer it with a question'
            },
            {
                title:'Siblings suck',
                desc:'Everyone drink as many siblings as you have (half and step count).'
            },
            {
                title:'Single Pringle',
                desc:'Drink as many times as single people in the room.'
            },
            {
                title:'Never have I Ever',
                desc:'Each player take a turn and say one thing you have never done and all the players that have take a drink ' + this.randomPlayer()
            },
            {
                title:'Young Love',
                desc:'The newest couple drinks one time'
            },
            {
                title:'Happy Birthday',
                desc:'Cheers The person with the closest birthday downs their drink and everyone else takes a drink'
            },
            {
                title:'Blondes have more fun',
                desc:'All brunettes take a drink'
            },
            {
                title:'Drink!',
                desc: this.randomPlayer() + ' Give five drinks to someone!'
            },
            {
                title:'Catagories',
                desc: this.randomPlayer() + ' Choose a catagory and go around the room listing things in that catagory and if you fail or blank out drink 1 time'
            },

        ]
    }
    componentDidMount(){
        console.log(this.state)
        this.setState({
            cards: this.shuffle(this.state.cards)
        })
       }
    
    randomPlayer() {
        let players = this.props.state.players
        return  players[Math.floor(Math.random() * players.length)]
    }

    shuffle(array) {
        let currentIndex= array.length, temporaryValue, randomIndex;

        while(0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    showCards= () => {
        if(this.state.currentCard >= this.state.cards.length){
            return <h2>No more Cards</h2>
        } else {
        return (
            <div className='card'>
                <h2>{this.state.cards[this.state.currentCard].title}</h2>
                <p>{this.state.cards[this.state.currentCard].desc}</p>
            </div>)
        }
    }
    nextCard= () => {
        this.setState({
            currentCard: this.state.currentCard + 1
        })
    }
    

    render() {
        return (
            <div className='cardContainer' onClick={() => this.nextCard()}>
                  {this.showCards()}              
            </div>
        )
    }
}
