// import { sortBy } from './sort'
import Long from 'long'
import https from 'https'
import url from 'url'

const medals = ["norank","herald", "guardian", "crusader", "archon", "legend", "ancient", "divine"];
const topmedals = ['top1000','top100','top10'];

const img_medals = require.context('../img/medals',true,/.png/)

const STEAM64 = new Long.fromString("76561197960265728")

export const toSteamID = (dotaID) => {
  return STEAM64.add(dotaID).toString()
}

export const nowToSeconds = () => Math.round(new Date().getTime()/1000)

export const secondsToDate = (seconds) => {const date = new Date(seconds*1000); return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
export const secondsToDateExt = (seconds) => {const date = new Date(seconds*1000); return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${zerofication(date.getHours())}:${zerofication(date.getMinutes())}`}
export const secondsToDateHMDM = (seconds) => {const date = new Date(seconds*1000); return `${date.getDate()}/${date.getMonth()+1} - ${zerofication(date.getHours())}:${zerofication(date.getMinutes())}`}
export const secondsToDateHMDMY = (seconds) => {const date = new Date(seconds*1000); return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${zerofication(date.getHours())}:${zerofication(date.getMinutes())}`}
export const addSteamToPlayer = (player) => {
  return ({...player, steam : toSteamID(player._id)})
}

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
    if(mode === 'a'){
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

export const getMedal = (input) => {
  const img = 'img/medals', Rank = 'Rank ';
  let medal, level, tooltip;
  if(input.rank){
    medal = parseInt(input.rank.toString().slice(0,1));
    level = parseInt(input.rank.toString().slice(1,2));
  }else{
    medal = 0;
  }
  const medals = ["norank","herald", "guardian", "crusader", "archon", "legend", "ancient", "divine","immortal"];
  //TODO: Add inmortal image to medal_inmortal
  //TODO: Add medals top1000, top100, top10, top1
  const topmedals = ['top1000','top100','top10','top1'];
  let rank,leaderboard = input.leaderboard;
  if(medal < 8){
    if(medal !== 0){
      rank = medals[medal] + "/medal_" + medals[medal] + "_" + level
      tooltip = medals[medal].slice(0,1).toUpperCase() + medals[medal].slice(1) + " " + level
    }else{
      rank = "medal_" + medals[0]
      tooltip = 'No rank' //medals[medal].slice(0,1).toUpperCase() + medals[medal].slice(1)
    }
  }else{
    if(leaderboard > 1000 || !leaderboard){
      rank = "medal_" + medals[8]
      // tooltip = medals[7].slice(0,1).toUpperCase() + medals[7].slice(1) + " " + leaderboard
    }else if(leaderboard <= 1000 && leaderboard > 100){
      rank = "medal_" + topmedals[0]
      // tooltip = topmedals[medal].slice(0,1).toUpperCase() + topmedals[medal].slice(1) + " " + leaderboard
    }else if(leaderboard <= 100 && leaderboard > 10){
      rank = "medal_" + topmedals[1]
      // tooltip = topmedals[medal].slice(0,1).toUpperCase() + topmedals[medal].slice(1) + " " + leaderboard
    }else if(leaderboard <= 10){
      rank = "medal_" + topmedals[2]
      // tooltip = topmedals[medal].slice(0,1).toUpperCase() + topmedals[medal].slice(1) + " " + leaderboard
    }else if(leaderboard === 1){
      rank = "medal_" + topmedals[3]
      // tooltip = topmedals[medal].slice(0,1).toUpperCase() + topmedals[medal].slice(1) + " " + leaderboard
    }
    tooltip = Rank + (leaderboard ? leaderboard : '')
  }
  return {img : img_medals('./' +  rank + '.png'), leaderboard : input.leaderboard ? input.leaderboard : '', tooltip : tooltip}
  // return {img : img + rank + '.png', leaderboard : input.leaderboard ? input.leaderboard : '', tooltip : tooltip}
}

export const date = (seconds) => {
  let date = new Date(seconds*1000);
  function zero(text,digits){
    digits = digits || 2;
    text = text.toString();
    if(digits > text.length){
      text = "0".repeat(digits-text.length) + text
    }
    return text
  }
  return zero(date.getHours()) + ':' + zero(date.getMinutes()) + ':' + zero(date.getSeconds()) + ' ' + zero(date.getDate()) + '/' + zero((date.getMonth()+1)) + '/' + date.getFullYear()
}

function zerofication(text,digits){
  digits = digits || 2;
  text = text.toString();
  if(digits > text.length){
    text = "0".repeat(digits-text.length) + text
  }
  return text
}

export const classnames = (obj) => {
  let textClassname = ''
  for (var k in obj){
    if(obj[k]){textClassname += `${k}`}
  }
  return textClassname
}

export const sortTourneys = (a,b) => {
  if(a.start && b.start){
    return b.start - a.start
    // if(a.leaderboard && b.leaderboard){
    //   let diff = a.leaderboard - b.leaderboard;
    //   return diff !== 0 ? diff : sortByName(a,b)
    // }else if(a.leaderboard){
    //   return -1
    // }else if(b.leaderboard){
    //   return 1
    // }else{
    //   let diff = b.rank - a.rank;
    //   return diff !== 0 ? diff : sortByName(a,b)
    // }
  }else if(a.start){
    return -1
  }else if(b.start){
    return 1
  }else{
    if(a.until && b.until){
      return b.until - a.until
      // if(a.leaderboard && b.leaderboard){
      //   let diff = a.leaderboard - b.leaderboard;
      //   return diff !== 0 ? diff : sortByName(a,b)
      // }else if(a.leaderboard){
      //   return -1
      // }else if(b.leaderboard){
      //   return 1
      // }else{
      //   let diff = b.rank - a.rank;
      //   return diff !== 0 ? diff : sortByName(a,b)
      // }
    }else if(a.until){
      return -1
    }else if(b.until){
      return 1
    }else{
      return sortBy('alpha','d','_d')(a,b);
    }
  }
}

export const inputdateToTS = (text,mode) => {
  // return text ? Math.round(new Date(text).getTime()/1000) : ''
  mode = mode || 'start'
  let append = mode === 'start' ? 'T00:00' : 'T23:59'
  return text ? Math.round(new Date(text+append).getTime()/1000) : ''
}

export const tsToInputdate = (ts) => {
  if(ts){
    const date = new Date(ts*1000)
    return `${date.getFullYear()}-${zerofication(date.getMonth()+1)}-${zerofication(date.getDate())}`
  }else{return ''}
}

const isNewLimitHours = 2
const isNewLimit = isNewLimitHours*60*60
export const isNew = (ts) => (parseInt(ts)+isNewLimit) > nowToSeconds()

export const postDiscord = (data,wb) => {
  const wbs = {
    bugs : 'https://discordapp.com/api/webhooks/444329665201569813/Fw_tjw3Sjbcm8t5ED7TieJufwGW9fvqpeHwMyfP_eYf-ltEg4EMsVQDF_wGS-9GJ4Y-8',
    playgrounds : 'https://discordapp.com/api/webhooks/444513029841747978/dL_NzIuMgILoIITh--Zep4XLHle8d1cj-M9GH9aRLKS_NsOqxjDCEdJLUHdz4kZDNRp7',
    feedsfromapp : 'https://discordapp.com/api/webhooks/446306133984935937/oMrJC5Rj4T6G2P_71LZviUy8saVJJDdKSWjm9fZoRKupcCgpqYSVBSm2lnK06QrhCz6Q',
    fromapp : 'https://discordapp.com/api/webhooks/446303544245747732/ufljkxooLehzO8-vOPlcDg-bIdJi4npE8eBQNZS3q1Z01cjGbrndoQu9joQFrjeCRQOo'
  }
  const avatar_url = 'http://cdn.dota2.com/apps/dota2/blog/spring_cleaning_2018_blog.jpg'
  let webhook = wbs[wb] || wbs.bugs

  let postData = JSON.stringify(data);
  var parsedUrl = url.parse(webhook);
  var post_options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
  };

  // Set up the request
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
      });
  });

  // Trigger a POST to the url with the body.
  post_req.write(postData);
  post_req.end();

}
