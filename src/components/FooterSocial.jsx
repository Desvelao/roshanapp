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
import ProfileCard, { ProfileSocial } from '../components/ProfileCard'
import Patreon from '../img/patreon.png'
import { gear , robot , loudspeaker , money_mouth_face } from '../constants/emojis.js'
import { DESVELAO_PROFILE, DESVELAO_BE_PATRON } from '../constants/links'

const TourneyCard = (props) => {
    const { tourney, active } = props
    return (
      <div>
        <hr/>
        <Row className='justify-content-between'>
          <Col className='mx-auto text-center mb-2'>
            <div className="mb-2">Creado por <a href={DESVELAO_PROFILE} target='_blank'>Desvelao^^</a> con mucho ❤️</div>
          </Col>
          <Col md='' className='mx-auto text-center mb-2'>
            <ProfileSocial/>
          </Col>
          <Col md='' className='mx-auto text-center v-align-bottom'>
            <a className='' href={DESVELAO_BE_PATRON} data-patreon-widget-type="become-patron-button" target='_blank'><img className='dv-patreon-button mb-2' src={Patreon} alt='Become a Patron!' target='_blank'/></a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
          </Col>
        </Row>
      </div>
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
