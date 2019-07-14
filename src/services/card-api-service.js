import TokenService from '../services/token-service'
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
  // getCard(CardId) {
  //   return fetch(`${config.API_ENDPOINT}/card/${CardId}`, {
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  // getCardComments(CardId) {
  //   return fetch(`${config.API_ENDPOINT}/card/${CardId}/comments`, {
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  // postComment(CardId, text) {
  //   return fetch(`${config.API_ENDPOINT}/comments`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       Card_id: CardId,
  //       text,
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}
export default CardApiService