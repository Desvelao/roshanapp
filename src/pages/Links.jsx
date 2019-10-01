import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'
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
            <Row>
              {collections.map(collection => <Collection key={collection.title} title={collection.title} items={collection.items}/>)}
            </Row>
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

const Collection = (props) => (<Col md='6'>
  <strong>{props.title}</strong>
  {props.items.map((lk,i) => (<a key={i} className='d-block' href={lk.link}>{lk.title}{lk.description ? (<span className='dv-feeds-body'> - {lk.description}</span>) : null}</a>))}
  <br/>
</Col>)

export default Links_page
