import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import AdminPanel from '../components/AdminPanel.jsx'
import FeedCard from '../components/FeedCard.jsx'
import routes from '../constants/routes'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import { gear , robot , loudspeaker , money_mouth_face } from '../constants/emojis.js'
import FooterSocial from '../components/FooterSocial.jsx'
import Sidebar from '../components/Sidebar.jsx'

class Feeds extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <Row>
          <Col md="9">
            <h1 className='dv-text-title mb-2'>{loudspeaker} Feeds</h1>
            <div className=''>
              {this.props.feeds.map(feed => <FeedCard key={feed._id} feed={feed} date/>)}
            </div>
          </Col>
          <Col>
            <Sidebar/>
          </Col>
        </Row>
        <FooterSocial/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feeds : state.feeds
})

export default connect(mapStateToProps)(Feeds)
