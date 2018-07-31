export const sortBy = (by = 'alpha', mode = 'd',param='_id') => {
  switch (by) {
    case 'alpha':
      return sortAlpha(v => v[param].toLowerCase(),mode)
    case 'number':
      return sortAlpha(v => parseInt(v[param]),mode)
    default:

  }
}

function sortAlpha(callback,mode){
  mode = mode === 'd' ? 'd' : 'a'
  return function(a,b){
    a = callback(a)
    b = callback(b)
    if(mode === 'd'){
      if(a < b){return -1}else if(a > b){return 1}else{return 0}
    }else{
      if(a < b){return 1}else if(a > b){return -1}else{return 0}
    }
  }
}

export const sortByRank = (a,b) => {
  if(a.rank && b.rank){
    if(a.leaderboard && b.leaderboard){
      let diff = a.leaderboard - b.leaderboard;
      return diff !== 0 ? diff : sortByName(a,b)
    }else if(a.leaderboard){
      return -1
    }else if(b.leaderboard){
      return 1
    }else{
      let diff = b.rank - a.rank;
      return diff !== 0 ? diff : sortByName(a,b)
    }
  }else if(a.rank){
    return -1
  }else if(b.rank){
    return 1
  }else{
    return sortByName(a,b);
  }
}

export const sortByName = (a,b) => {
  let user1 = a.username.toLowerCase(), user2 = b.username.toLowerCase();
  if(user1 < user2){return -1};
  if(user1 > user2){return 1};
  return 0
}
