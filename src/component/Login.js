import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import '../css/Login.css'
import CardListContext from '../contexts/CardListContext';


export default class Login extends Component {
    static contextType = CardListContext;
    constructor(props){
        super(props)
        this.state={
            passwordHidden: true,
            error: null,
            user_name: '',
            password: ''
        }
    }
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
        AuthApiService.postLogin({
            user_name,
            password
        })
            .then(res => {   
                this.setState({
                password:''
                })
                
            })
            .catch(res => {
                this.setState({error: res.error})
            })
            .then(res => this.context.handleLogin(this.state.user_name))
            .then(res => {if(TokenService.hasAuthToken()){
                this.props.history.push('/')}}
            )
    }
   
    render() {
        const { error } = this.state
        return (
            <div className='loginFields'>
                <h4>Login:</h4>
                <div className='loginError'>{error && <p>*{error}</p>}</div>
                    <input type="text" name='userName' placeholder='Username' value={this.state.user_name} onChange={(e)=> this.hanldeUserName(e)}/>
                <br />
                <input type={this.state.passwordHidden ? "password" : "text"} 
                    value={this.state.password}
                    name='password'
                    className='userPassword'
                    placeholder='password'
                    onChange={(e) => this.handleChange(e)}    
                />                
                {/* <img className='eye' onClick={()=> this.handlePassword()} 

                src={this.state.passwordHidden ? 
                    '/assets/hide.png' : 
                    '/assets/show.png'
                    }
                    alt={this.state.passwordHidden? 'hidden': 'shown'}                        
                    >
                </img> */}
                <br />
                <button onClick={(ev) => this.handleSubmitJwtAuth(ev)}>Sign in</button>
                <li>username: user </li>
                <li>password: password</li>
                <li>for test purposes</li>
            </div>
        )
    }
}
