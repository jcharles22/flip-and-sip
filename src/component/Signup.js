import React, { Component } from 'react'
import '../css/Signup.css'

export default class Signup extends Component {
    constructor(){
        super()
        this.state={
            passwordHidden: true,
            checkPasswordHidden: true,
            value: '',
        }
    }

    handlePassword=()=> {
        this.setState({
            passwordHidden: !this.state.passwordHidden
        })
        console.log(this.state)
    }
    handleCheckPassword=()=> {
        this.setState({
            checkPasswordHidden: !this.state.checkPasswordHidden
        })
        console.log(this.state)
    }
    handleChange=(e)=> {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({
            value:e.target.value
        })
    }
    render() {
        return (
            <div>
                <fieldset className='signUpFields'>
                    <label>Enter a User-Name:</label>
                        <input type='text'/>
                    
                    <label>Enter a Password:</label>
                        <input  
                            type={this.state.passwordHidden ? "password" : "text"}
                        />
                        <img onClick={()=> this.handlePassword()} src={this.state.passwordHidden ? 
                        '/assets/hide.png' : 
                        '/assets/show.png'
                        }
                        alt={this.state.passwordHidden? 'hidden': 'shown'}                        
                        >
                    </img>
                    <label>Confirm Password:</label>
                        <input  
                            type={this.state.checkPasswordHidden ? "password" : "text"}
                        />
                        <img onClick={()=> this.handleCheckPassword()} src={this.state.checkPasswordHidden ? 
                        '/assets/hide.png' : 
                        '/assets/show.png'
                        }
                        alt={this.state.checkPasswordHidden? 'hidden': 'shown'}                        
                        >
                    </img>
                </fieldset>
            </div>
        )
    }
}
