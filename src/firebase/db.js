import { db } from './firebase';
import { nowToSeconds } from '../utils'

export const onceBot = () => db.ref('bot').once('value');

export const addTourney = (tourney) => db.ref(`tourneys/${tourney._id}`).update(objCollWID(tourney))

export const deleteTourney = (tourney) =>
  db.ref(`tourneys/${tourney._id}`).remove()

export const loadTourneys = () => db.ref(`tourneys`).once('value')

export const loadLeaderboard = () => db.ref(`leaderboard`).once('value')

export const loadPublic = () => db.ref(`public`).once('value')

export const addFeed = (feed) => {
  return db.ref(`feeds/${feed._id}`).update({
    title : feed.title, body : feed.body, link : feed.link
  })
}

export const deleteFeed = (feed) => {
  return db.ref(`feeds/${feed._id}`).remove()
}

export const loadFeeds = () => {
  return db.ref(`feeds`).once('value')
}

export const loadTeams = (player) => db.ref(`tm/teams`).once('value')

export const loadRequestTeams = (player) => db.ref(`tm_request/teams`).once('value')

export const addTeam = (team) =>
db.ref(`tm/teams/${team.name}`).update({
  roster : team.roster, logo : team.logo, standins : team.standins, division : team.division,
  info : team.info, private : team.private, twitter : team.twitter, email : team.email
})

export const refreshMango = () => db.ref('tm').update({ts : nowToSeconds()});

export const load = () => db.ref('tm').once('value');

export const collection = (obj) => Object.keys(obj).map(k => ({...obj[k], _id : k}))

export const objCollWID = (obj) => { const {_id, ...newobj} = obj; return newobj}

export const listenerMangoUpdated = (callback) => db.ref('tm/tsm').on('value',(snap) => callback(snap))

export const sortbyNamePlayers = (collection) => collection.sort(function(a,b){
  a = a.toLowerCase(); b = b.toLowerCase();
  if(a < b){return 1}else if(a > b){return -1}else{return 0}
})
