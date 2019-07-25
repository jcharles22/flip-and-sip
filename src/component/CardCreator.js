import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/CardCreator.css'
import CardListContext from '../contexts/CardListContext';

export default class CardCreator extends Component {
    static contextType = CardListContext;
    state = {
        card_title:'',
        card_desc:'',
        card_active: true,
        deck: this.context.decks,
        deckId: [null, "1"],
    }
    handleTitle=(e)=>{
        this.setState({
            card_title:e.target.value
        })
    }
    handleDesc=(e)=>{
        this.setState({
            card_desc:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.context.handleSubmit(this.state)
        
    }
    addRandomPlayer=()=>{
        if(this.state.card_desc === ''){
            this.setState({card_desc: 'random player '})
        } else if (this.state.card_desc.endsWith(' ')){
            this.setState(prevState => (
                {card_desc: prevState.card_desc + 'random player '}))
        } else {
            this.setState(prevState =>(
                {card_desc: prevState.card_desc +' random player'}))
        }
    }

    handleDeckSelected = (e) => {
        let index = e.target.id
        let deckId = e.target.dataset.id
        let newSelected = this.state.deckId
        if(newSelected[index] === null) {
            newSelected[index] = deckId
        } else {
            newSelected[index] = null
        }
        this.setState({
            deckId: newSelected
        })
    }

    hadleDeck=()=> {
        return(
            this.state.deck.map((deck, index) =>{
                return(
                    <label key={deck.deck_id}  id={index} className={`deckSelect ${this.state.deckId[index]? "selected" : ''}`}  data-id={deck.deck_id} onClick={(e)=> this.handleDeckSelected(e)}>{deck.deck_title}</label>
                )
            })
        )
    }
    render() {
        console.log(this.state)
        return (
            <div className='CardCreator'>
                <label>Enter a title:</label>
                <input type='text' onChange={(e)=> this.handleTitle(e)}></input>
                <label>Enter the descritpion:</label>
                <textarea onChange={(e)=> this.handleDesc(e)} value={this.state.card_desc}></textarea> 
                <button onClick={()=> this.addRandomPlayer()}>Add Random Player</button>
                <p>select which deck to add it too.</p>
                <div className='deckSelectContainer'>
                {this.hadleDeck()}
                </div>
                <br />
              <button type='submit' onClick={(e) => this.handleSubmit(e)}><Link to='/'>Submit</Link></button>
            </div>
        )
    }
}


// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import '../css/CardCreator.css'
// import CardListContext from '../contexts/CardListContext';

// export default class CardCreator extends Component {
//     static contextType = CardListContext;
//     state = {
//         card_title:'',
//         card_desc:'',
//         card_active: true,
//         deck_house_party: ''
//     }
//     handleTitle=(e)=>{
//         this.setState({
//             card_title:e.target.value
//         })
//     }
//     handleDesc=(e)=>{
//         this.setState({
//             card_desc:e.target.value
//         })
//     }
//     handleSubmit=(e)=>{
//         e.preventDefault()
//         this.context.handleSubmit(this.state)
        
//     }
//     addRandomPlayer=()=>{
//         if(this.state.card_desc === ''){
//             this.setState({card_desc: 'random player '})
//         } else if (this.state.card_desc.endsWith(' ')){
//             this.setState(prevState => (
//                 {card_desc: prevState.card_desc + 'random player '}))
//         } else {
//             this.setState(prevState =>(
//                 {card_desc: prevState.card_desc +' random player'}))
//         }
//     }
    
//     render() {
//         return (
//             <form>
//             <div className='CardCreator'>
//                 <label>Enter a title:</label>
//                 <input type='text' onChange={(e)=> this.handleTitle(e)}></input>
//                 <label>Enter the descritpion:</label>
//                 <textarea onChange={(e)=> this.handleDesc(e)} value={this.state.card_desc}></textarea> 
//                 <button onClick={()=> this.addRandomPlayer()}>Add Random Player</button>
//                 <br />
//                 <p>select which deck to add it too.</p>
//                 <div className='deckSlectContainer'> 
//                 <label className='deckSelect' onClick={(e) => this.handledeckSelect(e)}>House Party</label>
//                 <label className='deckSelect' >Restaurants</label>
//                 </div>
//                 <br />
//               <button type='submit' onClick={(e) => this.handleSubmit(e)}><Link to='/'>Submit</Link></button>
//             </div>
//             </form>
//         )
//     }
// }
