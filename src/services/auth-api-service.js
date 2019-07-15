import config from '../config'
import TokenService from './token-service';

const AuthApiService = {
  postLogin({ user_name, password }) {
    if(config.user_name === user_name && config.password === password){
       TokenService.saveAuthToken(password)
    } 
    
  },

}

export default AuthApiService