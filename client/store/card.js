import axios from 'axios'
import history from '../history'

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

export const getSingleCardThunk = uuid => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cards/scan/${uuid}`)
    dispatch(getSingleCard(data))
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

export const createNewCardThunk = cardData => async dispatch => {
  let res
  try {
    res = await axios.post('/api/cards/create', cardData)
  } catch (err) {
    return console.error(err)
  }
  try {
    history.push(`/cards/${res.data.uuid}`)
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SENT_CARDS:
      return {...state, sentCards: action.cards}
    case GET_ALL_CARD_TEMPLATES:
      return {...state, cardTemplates: action.cardTemplates}
    case GET_SINGLE_CARD:
      return {...state, singleCard: action.card}
    default:
      return state
  }
}
