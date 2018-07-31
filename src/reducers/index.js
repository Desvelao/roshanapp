import { combineReducers } from 'redux'
import actioncreators from './actioncreators'
import actiontypes from './actiontypes'
import { sortBy, addSteamToPlayer, nowToSeconds, sortByRank, sortTourneys } from '../utils'
import { db } from '../firebase'

const authUser = (state = null, action) => {
    switch(action.type) {
      case(actiontypes.LOGIN):
        return action.authUser
      default:
        return state;
    }
}

const leaderboard = (state = { ranking : [], updated : nowToSeconds()}, action) => {
  switch(action.type) {
    case(actiontypes.LOAD_LEADERBOARD):
      const players = db.collection(action.leaderboard.ranking).sort(sortByRank)
      return { ranking : players, updated : action.leaderboard.updated }
    default:
      return state;
  }
}

const tourneys = (state = [],action) => {
  switch(action.type) {
    case(actiontypes.ADD_TOURNEY):
      return [...state.filter(tourney => tourney._id !== action.tourney._id), action.tourney].sort(sortTourneys)
    case(actiontypes.DELETE_TOURNEY):
      return state.filter(tourney => tourney._id !== action.tourney._id)
    case(actiontypes.LOAD_TOURNEYS):
      return [...db.collection(action.tourneys)].sort(sortTourneys)
    default:
        return state;
  }
}

const feeds = (state = [],action) => {
  switch(action.type) {
    case(actiontypes.ADD_FEED):
      return [...state.filter(feed => feed._id !== action.feed._id), action.feed].sort(sortBy('number','d','_id'))
    case(actiontypes.DELETE_FEED):
      return state.filter(feed => feed._id !== action.feed._id)
    case(actiontypes.LOAD_FEEDS):
      return [...db.collection(action.feeds)].sort(sortBy('number','d','_id'))
    default:
      return state;
  }
}

const public_info = (state = {},action) => {
  switch(action.type) {
    case(actiontypes.LOAD_PUBLIC):
      return action.info
    default:
      return state;
  }
}

export const mangoUpdated = (state = false, action) => {
  switch(action.type) {
    case(actiontypes.MANGO_UPDATED):
      return action.mangoUpdated
    default:
      return state
  }
}

export default combineReducers({authUser, leaderboard, tourneys, feeds, public_info, mangoUpdated})
