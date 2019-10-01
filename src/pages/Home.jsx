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
import FooterSocial from '../components/FooterSocial.jsx'
import TourneyCard from '../components/TourneyCard.jsx'
import TourneyInfo from '../components/TourneyInfo.jsx'
import LeyendaIcons from '../components/LeyendaIcons.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Patreon from '../img/patreon.png'
import { gear , robot , loudspeaker , money_mouth_face } from '../constants/emojis.js'
import { DESVELAO_PROFILE, DESVELAO_BE_PATRON, FED_DISCORD } from '../constants/links'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {modal : false}
  }
  render(){
    const now = nowToSeconds()
    const tourneys_next = this.props.tourneys.filter(t => (t.until && now < t.until) || (t.start && now < t.start)).sort(sortTourneysNext)
    const tourneys_active = this.props.tourneys.filter(t => t.start < now && now < t.finish).sort(sortTourneysPlaying)
    const last_feeds = this.props.feeds.slice(0,3)
    return (
      <div>
        <Row>
          <Col md='9'>
            <Link className='d-block mb-2' to={routes.ADD_PUBLIC_TOURNEY}>Suggest a tournament/event</Link>
            {tourneys_active.length ? (
              <React.Fragment>
                <Row className='justify-content-center' id='dv-home-bg'>
                  <Col className='text-center mx-auto'>
                    <h1 className='dv-text-title mb-2'>Live tournaments <span>({tourneys_active.length})</span></h1>
                    <Row>
                      {tourneys_active.map( t => (
                        <Col className='mb-2' xs='6' md='3' key={t._id}>
                          <TourneyCard onClickInfo={() => this.setState({modal : t})} active tourney={t}/>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <hr className='mb-4'/>
              </React.Fragment>
            ) : null}
            {tourneys_next.length ? (
              <React.Fragment>
                <Row className='justify-content-center' id='dv-home-bg'>
                  <Col className='text-center'>
                    <h1 className='dv-text-title mb-2'>Next tournaments <span>({tourneys_next.length})</span></h1>
                    <Row>
                      {tourneys_next.map( t => (
                        <Col className='mb-2' xs='6' md='3' key={t._id}>
                          <TourneyCard onClickInfo={() => this.setState({modal : t})} tourney={t}/>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <hr className='mb-4'/>
              </React.Fragment>
            )  : null}
            {(tourneys_active.length || tourneys_next.length) ? (
                <React.Fragment>
                  <Row className='justify-content-center' id='dv-home-bg'>
                    <Col className='text-center mx-auto'>
                      <LeyendaIcons/>
                    </Col>
                  </Row>
                  <hr className='mb-4'/>
                </React.Fragment>
              ) : null
            }
            
          </Col>
          <Col md='3'>
            <Sidebar/>
          </Col>
        </Row>
        <FooterSocial/>
        {this.state.modal && (<TourneyInfo onClickClose={() => this.setState({modal : false})} title={this.state.modal._id} data={this.state.modal}/>)}
      </div>
  )}
}

const mapStateToProps = (state) => ({
  leaderboard : state.leaderboard,
  tourneys : state.tourneys,
  feeds : state.feeds,
  public_info : state.public_info
})

export default connect(mapStateToProps)(Home)

function sortTourneysNext(a,b){
  if(a.start && b.start){
    return a.start - b.start
  }else if(a.start && b.until){
    return a.start - b.until
  }else if(a.until && b.start){
    return a.until - b.start
  }else if(a.start && (!b.start && !b.until)){
    return -1
  }else if(b.start && (!a.start && !a.until)){
    return 1
  }else if(a.until && b.until){
    return a.until - b.until
  }else if(a._id.toLowerCase() > b._id.toLowerCase()){return -1}
  else if(a._id.toLowerCase() > b._id.toLowerCase()){return 1}
  else{return 0}
}

function sortTourneysPlaying(a,b){
  if(a.finish && b.finish){
    return a.finish - b.finish
  }else if(a.start && b.finish){
    return a.start - b.finish
  }else if(a.finish && b.start){
    return a.finish - b.start
  }else if(a.start && b.start){
    return a.start - b.start
  }else if(a._id.toLowerCase() > b._id.toLowerCase()){return -1}
  else if(a._id.toLowerCase() > b._id.toLowerCase()){return 1}
  else{return 0}
}
