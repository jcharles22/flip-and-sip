import React, { Component } from 'react'
import '../css/Signup.css'
import AuthApiService from '../services/auth-api-service';

export default class Signup extends Component {
    constructor(){
        super()
        this.state={
            passwordHidden: true,
            checkPasswordHidden: true,
            user_name: '',
            password: '',
            checkValue: '',
            error: 'Password must containe one Upper case, lower case, number, and special, character'
        }
    }

    handlePassword=()=> {
        this.setState({
            passwordHidden: !this.state.passwordHidden
        })
    }
    handleCheckPassword=()=> {
        this.setState({
            checkPasswordHidden: !this.state.checkPasswordHidden
        })
    }
    handleChange=(e)=> {
        this.setState({
            password:e.target.value
        })
    }
    handleSecondPassword=(e)=> {
        this.setState({
            checkValue:e.target.value
        })     
    }

    handleUserName=(e)=> {
        this.setState({
            user_name:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {user_name, password} = this.state;
        this.setState({ error: null})
        AuthApiService.postUser({
            user_name,
            password
        })
            .then(res => this.props.history.push('/Login'))
            .catch(res => {
                this.setState({ error: res.error })
            })
        
    }

    handleSubmitButtonDisplay=()=>{
        if(this.state.password === this.state.checkValue){
            return(<button type='button' onClick={(e)=> this.handleSubmit(e)}>Submit</button>)
        } else {
            return(<button type='button' disabled>Submit</button>)
        }
    }
    render() {
        const { error } = this.state
        return (
            <div>
                <fieldset className='signUpFields'>
                    <label>Enter a User-Name:</label>
                        <input type='text' value={this.state.user_name} 
                            onChange={(e) => this.handleUserName(e)}
                        />
                    
                    <label>Enter a Password:</label>
                        <input  
                            type={this.state.passwordHidden ? "password" : "text"}
                            value={this.state.value}
                            onChange={(e)=> this.handleChange(e)}
                        />
                        <img onClick={()=> this.handlePassword()} src={this.state.passwordHidden ? 
                        'https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/hide.png?raw=true' : 
                        'https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/show.png?raw=true'
                        }
                        alt={this.state.passwordHidden? 'hidden': 'shown'}                        
                        >
                    </img>
                    <label>Confirm Password:</label>
                        <input  
                            type={this.state.checkPasswordHidden ? "password" : "text"}
                            onChange={(e)=> this.handleSecondPassword(e)}
                        />
                        <img onClick={()=> this.handleCheckPassword()} src={this.state.checkPasswordHidden ? 
                        'https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/hide.png?raw=true' : 
                        'https://github.com/jcharles22/flip-and-sip/blob/master/public/assets/show.png?raw=true'
                        }
                        alt={this.state.checkPasswordHidden? 'hidden': 'shown'}                        
                        >
                    </img>

                    {this.handleSubmitButtonDisplay()}
                    <div>{error && <p>{error}</p>}</div>

                </fieldset>
            </div>
        )
    }
}
