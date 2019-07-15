import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import '../css/Login.css'
import CardListContext from '../contexts/CardListContext';


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            passwordHidden: true,
            error: null,
            user_name: '',
            password: ''
        }
    }
    static contextType = CardListContext;

    hanldeUserName=(e)=> {
        this.setState({
            user_name:e.target.value
        })
    }

    handlePassword=()=> {
        this.setState({
            passwordHidden: !this.state.passwordHidden
        })
    }
    handleChange=(e)=> {
        e.preventDefault()
        this.setState({
            password:e.target.value
        })
    }
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({error: null})
        let { user_name, password } = this.state

        AuthApiService.postLogin({user_name, password})
        setTimeout(()=> {this.homePage(); }, 500)

    }
    homePage=()=> {
        if(TokenService.hasAuthToken()){
            this.context.handleLogin()
            this.props.history.push('/')
        }
    }
   
    render() {
        const { error } = this.state
        return (
            <fieldset className="loginFields">
                <legend>Login</legend>
                <div className='loginError'>{error && <p>*{error}</p>}</div>
                <label htmlFor="userName"> UserName:</label>
                    <input type="text" name='userName' value={this.state.user_name} onChange={(e)=> this.hanldeUserName(e)}/>
                <br />
                <label htmlFor='password'>Password:</label>
                <input type={this.state.passwordHidden ? "password" : "text"} 
                    value={this.state.password}
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
                <button onClick={(ev) => this.handleSubmitJwtAuth(ev)}>submit</button>
                <li className='loginError'>username: user </li>
                <li className='loginError'>password: password</li>
                <li className='loginError'>for test purposes</li>
            </fieldset>
        )
    }
}
