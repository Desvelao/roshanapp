import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { colorBot } from '../constants'
import FeedCard from '../components/FeedCard.jsx'
import { gear , robot , loudspeaker , money_mouth_face } from '../constants/emojis.js'
import { DESVELAO_PROFILE, DESVELAO_BE_PATRON, FED_DISCORD } from '../constants/links'

class Sidebar extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
  }
  render(){
    const last_feeds = this.props.feeds.slice(0,3)
    return (
      <div>
        <Link to={routes.FEEDS}><h1 className='dv-text-title mb-2'>{loudspeaker} Últimos feeds <span>({last_feeds.length})</span></h1></Link>
        <div className='mb-2'>
          {last_feeds.map(feed => (<FeedCard key={feed._id} feed={feed}/>))}
        </div>
        <hr/>
        <div>
          <div className='font-weight-bold dv-text-title'>{robot} Roshan en Discord</div>
          <div className='text-center'>
            <a className='d-block' href={this.props.public_info.discord_invite} target='_blank'>Invita a Roshan a tu servidor</a>
            <a className='d-block' href={this.props.public_info.discord_server} target='_blank'>Servidor de desarrollo</a>
            <div>Bot: <strong>v{this.props.public_info.version}</strong></div>
            <div><strong>{this.props.public_info.users}</strong> registrad@s</div>
            Regístrate: <code>r!register</code>
            <a className='d-block' href={DESVELAO_BE_PATRON} target='_blank'>{money_mouth_face} Donaciones {money_mouth_face}</a>
            <Link className='d-block' to={routes.FEEDBACK}>Feedback</Link>
            <Link className='d-block' to={routes.ADD_PUBLIC_TOURNEY}>Sugiere un torneo/evento</Link>
          </div>
        </div>
        <hr/>
        <div>
          <iframe src="https://discordapp.com/widget?id=327603106257043456&theme=dark" className='w-100' height='300px' allowtransparency="true" frameborder="0"></iframe>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  feeds : state.feeds,
  public_info : state.public_info
})

// const mapDispatchToProps = (dispatch) => ({
//   addFeed : (feed,rv,rj) => dispatch(addFeedFirebase(feed,rv,rj))
// })

export default connect(mapStateToProps)(Sidebar)
