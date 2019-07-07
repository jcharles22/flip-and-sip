import React, { Component } from 'react'
import '../css/Login.css'


export default class Login extends Component {
    constructor(){
        super()
        this.state={
            passwordHidden: true,
            value: '',
        }
    }

    handlePassword=()=> {
        this.setState({
            passwordHidden: !this.state.passwordHidden
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
            <fieldset className="loginFields">
                <legend>Login</legend>
                <label htmlFor="userName"> UserName:</label>
                    <input type="text" name='userName' />
                <br />
                <label htmlFor='password'>Password:</label>
                    <input type={this.state.passwordHidden ? "password" : "text"} 
                        value={this.state.value}
                        name='password'
                        className='userPassword'
                        onChange={(e) => this.handleChange(e)}    
                    />                
                    <img onClick={()=> this.handlePassword()} src={this.state.passwordHidden ? 
                        '/assets/hide.png' : 
                        '/assets/show.png'
                        }
                        alt={this.state.passwordHidden? 'hidden': 'shown'}                        
                        >
                    </img>
                
            </fieldset>
        )
    }
}
