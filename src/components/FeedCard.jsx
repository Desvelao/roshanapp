import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import { ButtonsEdit } from '../components/ButtonEditDelete'
import { secondsToDateHMDM , isNew } from '../utils'
import { pencil, calendar, red_flag, link, new_} from '../constants/emojis.js'

const FeedCard = (props) => {
    const { feed, date} = props
    return (
      <div className=''>
        {date ? (<span className='dv-feeds-date'>{secondsToDateHMDM(feed._id)} </span>) : null}
        {!feed.link ? <span>{isNew(feed._id) ? new_ + ' ' : ''}<span className='dv-feeds-title'>{feed.title}</span><span className='dv-feeds-body'> {feed.body}</span></span> :
          <a href={feed.link} target='_blank'>{isNew(feed._id) ? new_ + ' ' : ''}<span className='dv-feeds-title'>{feed.title} </span><span className='dv-feeds-body'>{feed.body}</span></a>
        }
      </div>
    )
  }

export default FeedCard
