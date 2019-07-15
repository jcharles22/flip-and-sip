import config from '../config'
const CardApiService = {
  getCards() {
    return fetch(`${config.API_ENDPOINT}/card`, {
      headers: {
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}
export default CardApiService