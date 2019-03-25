import axios from 'axios'

//ACTION TYPES

const GET_ALL_SENT_CARDS = 'GET_ALL_SENT_CARDS'
const SET_NEW_CARD_TEMPLATE = 'SET_NEW_CARD_TEMPLATE'
const SET_NEW_CARD_MESSAGE = 'SET_NEW_CARD_MESSAGE'
const SET_NEW_CARD_VIDEO = 'SET_NEW_CARD_VIDEO'
const CLEAR_NEW_CARD_DATA = 'CLEAR_NEW_CARD_DATA'
const GET_SINGLE_CARD = 'GET_SINGLE_CARD'

//INITIAL STATE

const initialState = {
  sentCards: [],
  newCardTemplate: {},
  newCardMessage: '',
  newCardVideo: {},
  singleCard: {}
}

//ACTION CREATORS

const getAllSentCards = cards => ({
  type: GET_ALL_SENT_CARDS,
  cards
})

const getSingleCard = card => ({
  type: GET_SINGLE_CARD,
  card
})

export const setNewCardTemplateId = cardTemplate => ({
  type: SET_NEW_CARD_TEMPLATE,
  cardTemplate
})

export const setNewCardMessage = message => ({
  type: SET_NEW_CARD_MESSAGE,
  message
})

export const setNewCardVideo = video => ({
  type: SET_NEW_CARD_VIDEO,
  video
})

const clearNewCardData = () => ({
  type: CLEAR_NEW_CARD_DATA
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

export const createNewCardThunk = data => async dispatch => {
  try {
    const {res} = await axios.post('/api/cards/create', data)
    dispatch(clearNewCardData())
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
    case SET_NEW_CARD_MESSAGE:
      return {...state, newCardMessage: action.message}
    default:
      return state
  }
}
