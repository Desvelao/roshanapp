import actiontypes from './actiontypes'
import { db } from '../firebase'

export const login = function(authUser){
  return {type : actiontypes.LOGIN, authUser}
}

export const addTourney = function(tourney){
  return {type : actiontypes.ADD_TOURNEY,tourney}
}

export const deleteTourney = function(tourney){
  return {type : actiontypes.DELETE_TOURNEY, tourney}
}

export const loadTourneys = function(tourneys){
  return {type : actiontypes.LOAD_TOURNEYS,tourneys}
}

export const loadLeaderboard = function(leaderboard){
  return {type : actiontypes.LOAD_LEADERBOARD,leaderboard}
}

export const addFeed = function(feed){
  return {type : actiontypes.ADD_FEED,feed}
}

export const deleteFeed = function(feed){
  return {type : actiontypes.DELETE_FEED, feed}
}

export const loadFeeds = function(feeds){
  return {type : actiontypes.LOAD_FEEDS,feeds}
}

export const loadPublic = function(info){
  return {type : actiontypes.LOAD_PUBLIC,info}
}

export const addTourneyFirebase = function(tourney,resolve,reject){
  return function(dispatch){
    //TODO add steam with long
    // player = {...player, steam}
    db.addTourney(tourney).then(() => {
      dispatch(addTourney(tourney))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deleteTourneyFirebase = function(tourney,resolve,reject){ //TODO
  return function(dispatch){
    db.deleteTourney(tourney).then(() => {
      dispatch(deleteTourney(tourney))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadTourneysFirebase = function(resolve,reject){
  return function(dispatch){
    db.loadTourneys().then((snap) => {
      if(!snap.exists()){return}
      dispatch(loadTourneys(snap.val()))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadLeaderboardFirebase = function(resolve,reject){
  return function(dispatch){
    db.loadLeaderboard().then((snap) => {
      if(!snap.exists()){return}
      dispatch(loadLeaderboard(snap.val()))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const addFeedFirebase = function(feed,resolve,reject){
  return function(dispatch){
    db.addFeed(feed).then(() => {
      dispatch(addFeed(feed))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const deleteFeedFirebase = function(feed,resolve,reject){
  return function(dispatch){
    db.deleteFeed(feed).then(() => {
      dispatch(deleteFeed(feed))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadFeedsFirebase = function(resolve,reject){
  return function(dispatch){
    db.loadFeeds().then((snap) => {
      dispatch(loadFeeds(snap.val()))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const loadPublicFirebase = function(resolve,reject){
  return function(dispatch){
    db.loadPublic().then((snap) => {
      dispatch(loadPublic(snap.val()))
      if(resolve){resolve()}
    }).catch(err => {console.log(err);if(reject){reject()}})
  }
}

export const mangoUpdated = function(payload){
  return {type : actiontypes.MANGO_UPDATED, mangoUpdated : payload}
}
