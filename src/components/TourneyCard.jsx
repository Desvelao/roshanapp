import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import { ButtonsEdit } from '../components/ButtonEditDelete'
import { secondsToDate , isNew } from '../utils'
import { pencil, calendar, red_flag, link, new_, information } from '../constants/emojis.js'
import { tourney_event_default_pic } from '../constants'

const TourneyCard = (props) => {
    const { tourney, active } = props
    return (
      <Card className={`text-center ${active ? 'dv-tourney-card-bg' : 'dv-tourney-card-bg-secondary'}`}>
        <CardImg top width="100%" src={tourney.img} alt={`${tourney._id}'s image`} onError={(e) => {e.target.onError=null;e.target.src=tourney_event_default_pic}} style={{height : '8em'}}/>
        <span className='dv-card-new dv-card-new-anim'>{isNew(tourney.ts) ? new_ + ' ' : ''}</span>
        <button className='dv-card-info-button' onClick={() => props.onClickInfo()}><i className='fas fa-info-circle'></i></button>
        <CardBody style={{padding : '0.5em'}}>
          <CardTitle className='text-primary' style={{marginBottom : '0'}}>
            {tourney.link ? (<a href={tourney.link} target='_blank'>{tourney._id}</a>) : tourney._id}
          </CardTitle>
          <div className='text-muted'>{tourney.by}</div>
          <div className=''>
            {!active && tourney.start ? (<div>{calendar} {secondsToDate(tourney.start)}</div>) : ''}
            {!active && tourney.until ? (<div>{pencil} {secondsToDate(tourney.until)}</div>) : ''}
            {active && tourney.finish ? (<div>{red_flag} {secondsToDate(tourney.finish)}</div>) : ''}
          </div>
        </CardBody>
      </Card>
    )
  }

const PlayerSteamLink = (props) => (
  <a href={steamLink(props.steam_id)} target='_blank'>{props.name}</a>
)


const steamLink = (steam_id) => (steam_id.match(new RegExp('[^0-9]')) ? "http://steamcommunity.com/id/" : "http://steamcommunity.com/profiles/") + steam_id

const PlayerDotaLink  = (props) => (
  <a href={dotaLink(props.dota_id)} target='_blank'>DB</a>
)

const PlayerLink = (props) => (
  <span><PlayerSteamLink {...props}/> - <PlayerDotaLink {...props}/></span>
)

const dotaLink = (dota_id) => ("https://www.dotabuff.com/players/") + dota_id

export default TourneyCard

export { TourneyCard , PlayerSteamLink , PlayerDotaLink }
