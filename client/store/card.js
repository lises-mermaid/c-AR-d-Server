import axios from 'axios'

//ACTION TYPES

const GET_ALL_SENT_CARDS = 'GET_ALL_SENT_CARDS'
const GET_ALL_CARD_TEMPLATES = 'GET_ALL_CARD_TEMPLATES'
const SET_NEW_CARD_TEMPLATE = 'SET_NEW_CARD_TEMPLATE'
const SET_NEW_CARD_MESSAGE = 'SET_NEW_CARD_MESSAGE'
const SET_NEW_CARD_VIDEO = 'SET_NEW_CARD_VIDEO'
const CLEAR_NEW_CARD_DATA = 'CLEAR_NEW_CARD_DATA'
const GET_SINGLE_CARD = 'GET_SINGLE_CARD'

//INITIAL STATE

const initialState = {
  sentCards: [],
  cardTemplates: [],
  newCardTemplate: {},
  newCardMessage: '',
  newCardVideo: {},
  singleCard: ''
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

export const getSingleCard = card => ({
  type: GET_SINGLE_CARD,
  card
})

export const setNewCardTemplate = cardTemplate => ({
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

export const getAllCardTemplatesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cardtemplates')
    dispatch(getAllCardTemplates(data))
  } catch (err) {
    console.error(err)
  }
}

export const createNewCardThunk = data2 => async dispatch => {
  try {
    const {data} = await axios.post('/api/cards/create', data2)
    console.log(data.link, 'THIS IS THE Card')
    dispatch(clearNewCardData())
    dispatch(getSingleCard(data))
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
    case SET_NEW_CARD_TEMPLATE:
      return {...state, newCardTemplate: action.cardTemplate}
    case SET_NEW_CARD_MESSAGE:
      return {...state, newCardMessage: action.message}
    case SET_NEW_CARD_VIDEO:
      return {...state, newCardVideo: action.video}
    case GET_SINGLE_CARD:
      console.log(action.card.link)
      return {...state, singleCard: action.card.link}
    default:
      return state
  }
}
