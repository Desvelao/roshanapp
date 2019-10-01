import React from 'react';
import { secondsToDateHMDMY , isNew } from '../utils'
import { new_} from '../constants/emojis.js'

const FeedCard = (props) => {
    const { feed, date} = props
    return (
      <div className=''>
        {!feed.link ? <span>{isNew(feed._id) ? new_ + ' ' : ''}<span className='dv-feeds-title'>{feed.title}</span><span className='dv-feeds-body'> {feed.body}</span></span> :
          <a href={feed.link} target='_blank'>{isNew(feed._id) ? new_ + ' ' : ''}<span className='dv-feeds-title'>{feed.title} </span><span className='dv-feeds-body'>{feed.body}</span></a>
        }
        {date ? (<span className='ml-3 dv-feeds-date'>{secondsToDateHMDMY(feed._id)} </span>) : null}
      </div>
    )
  }

export default FeedCard
