import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import AdminPanel from '../components/AdminPanel.jsx'
import FeedCard from '../components/FeedCard.jsx'
import routes from '../constants/routes'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import { gear , robot , loudspeaker , link, money_mouth_face } from '../constants/emojis.js'
import FooterSocial from '../components/FooterSocial.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { collections } from '../constants/links'

class Links_page extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <Row>
          <Col md="9">
            <h1 className='dv-text-title mb-2'>{link} Util links</h1>
            <div className=''>
              {collections.map(collection => <Collection key={collection.title} title={collection.title} items={collection.items}/>)}
            </div>
          </Col>
          <Col md='3'>
            <Sidebar/>
          </Col>
        </Row>
        <FooterSocial/>
      </div>
    )
  }
}

const Collection = (props) => (<div>
  <strong>{props.title}</strong>
  {props.items.map((lk,i) => (<a key={i} className='d-block' href={lk.link}>{lk.title}{lk.description ? (<span className='dv-feeds-body'> - {lk.description}</span>) : null}</a>))}
  <br/>
</div>)
// const mapStateToProps = (state) => ({
//   feeds : state.feeds
// })

export default Links_page
