import axios from 'axios'

//ACTION TYPES

const GET_ALL_SENT_CARDS = 'GET_ALL_SENT_CARDS'
const GET_ALL_CARD_TEMPLATES = 'GET_ALL_CARD_TEMPLATES'
const GET_SINGLE_CARD = 'GET_SINGLE_CARD'

//INITIAL STATE

const initialState = {
  sentCards: [],
  cardTemplates: [],
  singleCard: {}
}

//ACTION CREATORS

const getAllSentCards = cards => ({
  type: GET_ALL_SENT_CARDS,
  cards
})

const getAllCardTemplates = cardTemplates => ({
  type: GET_ALL_CARD_TEMPLATES,
  cardTemplates
})

const getSingleCard = card => ({
  type: GET_SINGLE_CARD,
  card
})

//THUNKS

export const getAllSentCardsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cards/cardhistory')
    dispatch(getAllSentCards(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllCardTemplatesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cardtemplates')
    dispatch(getAllCardTemplates(data))
  } catch (err) {
    console.error(err)
  }
}

export const createNewCardThunk = data => async dispatch => {
  try {
    const {res} = await axios.post('/api/cards/create', data)
    dispatch(getSingleCard(res))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SENT_CARDS:
      return {...state, sentCards: action.cards}
    case GET_ALL_CARD_TEMPLATES:
      return {...state, cardTemplates: action.cardTemplates}
    default:
      return state
  }
}
