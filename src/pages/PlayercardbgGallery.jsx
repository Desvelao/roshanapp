import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from '../constants/routes'

import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
// import Navigation from '../components/Navigation.jsx'
import { Link } from 'react-router-dom'
// import TeamCard from '../components/TeamCard'
// import { getInfoTeam } from './Team'
// import AddPlayerForm from '../components/AddPlayerForm'
import { nowToSeconds } from '../utils'
import ProfileCard, { ProfileSocial } from '../components/ProfileCard'
import FooterSocial from '../components/FooterSocial.jsx'
import LeyendaIcons from '../components/LeyendaIcons.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Patreon from '../img/patreon.png'
import { gear , robot , loudspeaker , money_mouth_face, supporter } from '../constants/emojis.js'
import { DESVELAO_PROFILE, DESVELAO_BE_PATRON, FED_DISCORD } from '../constants/links'

// const playercardbg = require.context('../img/playercardbg',true,/.jpg/)
function importAll(r) {
  console.log(r.keys())
  return r.keys().map(r);
}

const playercardbg = importAll(require.context('../img/playercardbg', false, /\.(png|jpe?g|svg)$/))

class PlayercardBG extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <Row>
          <Col md='9'>
            <h1 className='dv-text-title mb-2'>Player card backgrounds <span>({playercardbg.length})</span></h1>
            <Row>
              {playercardbg.map(bg => (<Col md='6'><CardPlayercardbg src={bg} key={bg}/></Col>))}
            </Row>
            {/* <Row className='justify-content-center' id='dv-home-bg'>
            </Row> */}
          </Col>
          <Col md='3'>
            <Sidebar/>
          </Col>
        </Row>
        <FooterSocial/>
      </div>
  )}
}

// <div className='text-center'>
//   <div className='font-weight-bold dv-text-title'>{gear} Info</div>
//   <p className='m-0'>
//   Muestra la leaderboard, feeds, información de torneos sobre la escena española y datos sobre el bot.
//   </p>
//   <Link to={routes.ADD_PUBLIC_TOURNEY}>Sugiere un torneo/evento</Link>
// </div>


// <Col className='mx-auto text-center justify-content-center'>
// </Col>
// <ProfileCard/>
// <div><a href={DESVELAO_PROFILE} target='_blank'>Patreon</a></div>
const CardPlayercardbg = ({src}) => {
  
  const card_name = src.match(new RegExp('/static/media/(.[^\.]+)'))[1]
  
  return (
    <div className="card mb-3">
      <img clasName="card-img-top img-fluid" src={src} alt={card_name}/>
      {/* {card_name !== 'roshan' && (<span style={{ position: "absolute" , top: "0.5rem", left: "0.5rem"}}>{supporter}</span>)} */}
      <div className="card-body text-center">
        <h3 className="card-title mb-2">{card_name}</h3>
        {/* <h5 class="card-subtitle text-muted mb-2">🤖 Discord Bot</h5> */}
        <div className="card-text"><code>r!playercard setbg {card_name}</code></div>
        {card_name !== 'roshan' && (<span>{supporter} for supporters</span>)}
        {/* <a class="btn btn-primary mb-1" target='_blank' href="https://discord.gg/SxsYkgX">Servidor</a>
        <a class="btn btn-primary mb-1" target='_blank' href="https://discordapp.com/oauth2/authorize?client_id=324833828302749697&scope=bot&permissions=523328">Invitación</a>
        <a class="btn btn-primary mb-1" target='_blank' href="https://desvelao.github.io/roshanapp/#/">WebApp</a>
        <a class="btn btn-primary btn-danger mb-1" target='_blank' href="https://desvelao.github.io/roshan-leaderboard/">Leaderboard</a> */}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  leaderboard : state.leaderboard,
  tourneys : state.tourneys,
  feeds : state.feeds,
  public_info : state.public_info
})

export default connect(mapStateToProps)(PlayercardBG)
