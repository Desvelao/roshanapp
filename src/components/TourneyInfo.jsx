import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import ButtonEditDelete from '../components/ButtonEditDelete'
import { secondsToDate } from '../utils'
import withModal from '../hocs/withModal.jsx'
import { pencil, calendar, red_flag, link, new_, information } from '../constants/emojis.js'
import LeyendaIcons from '../components/LeyendaIcons.jsx'
import { tourney_event_default_pic } from '../constants'

const TourneyInfo = (props) => {
  const tourney = props.tourney || props.data
  return (
    <Row className='mt-1'>
      <Col md='3'>
        <Row className='justify-content-center'>
          <Col className='text-center'>
            <img className='mb-3 dv-team-profile-img w-100 dv-border-05' src={tourney.img} onError={(e) => {e.target.onError=null;e.target.src=tourney_event_default_pic}}/>
            {tourney.by && (<div className='mb-1 font-weight-bold text-muted'>Organize:<div>{tourney.by}</div></div>)}
          </Col>
        </Row>
      </Col>
      <Col md='9'>
        {tourney.info && (
          <div className='mb-2'>
            <div className='dv-text-title text-left'>Info</div>
            <pre className='dv-tourney-info-info'>{tourney.info}</pre>
          </div>)
        }
        <div className='mb-2'>
          {(tourney.start || tourney.finish || tourney.until) && (<div className='dv-text-title text-left'>Date</div>)}
          <div>
            {tourney.start && (<span>{calendar} {secondsToDate(tourney.start)}</span>)}
            {tourney.finish && (<span> {red_flag} {secondsToDate(tourney.finish)}</span>)}
          </div>
          <div>{tourney.until && (<span>{pencil} {secondsToDate(tourney.until)}</span>)}</div>
          {(tourney.start || tourney.finish || tourney.until) && (<div className='mt-2'><LeyendaIcons size='mini'/></div>)}
        </div>
        <div className='mb-2'>
          {tourney.link && (<a href={tourney.link}>{link} {tourney.link}</a>)}
        </div>
      </Col>
    </Row>
  )
}

export default withModal(TourneyInfo)
