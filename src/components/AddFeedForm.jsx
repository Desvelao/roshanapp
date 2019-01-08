import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { auth, db } from '../firebase'
import { addFeedFirebase, deleteTourneyFirebase } from '../reducers/actioncreators'
import { nowToSeconds, postDiscord } from '../utils'
import { colorBot } from '../constants'
import withAuthorization from '../hocs/withAuthorization.jsx'
import InputEmoji from '../components/InputEmoji.jsx'

const initialState = {log : {message : '', type : ''}, __id : '', edit : false, _id : '', title : '', body : '' , link : ''}

class AddFeedForm extends Component{
  constructor(props){
    super(props)
    const { state } = this.props.location
    this.state = !state ? {...initialState} : {...initialState,...state.edit,edit : true, __id : state.edit._id}
  }
  componentWillUnmount(){
    if(this.timeout){clearTimeout(this.timeout)}
  }
  componentDidMount(){
  }
  render(){
    const { _id, title, body, link, log } = this.state
    return (
      <Col className='mx-auto'>
        <div className='dv-text-title'>Add a feed</div>
        <hr/>
        <Form>
          <Row className='justify-content-center'>
            <Col md='6'>
              <FormGroup row>
                <Col xs='12'>
                  <Label for='title'>Title</Label>
                  <InputEmoji type='text' id='title' placeholder='Title' onChange={(e) => this.handleState('title',e)} value={title} onSelect={(val) => this.setState({title : val})} closeOnSelect/>
                </Col>
                <Col xs='12'>
                  <Label for='body'>Descripción</Label>
                  <InputEmoji type='textarea' id='body' placeholder='Description' onChange={(e) => this.handleState('body',e)} value={body} onSelect={(val) => this.setState({body : val})} closeOnSelect/>
                </Col>
                <Col xs='12'>
                  <Label for='link'>Link</Label>
                  <Input type='text' id='link' placeholder='Link' onChange={(e) => this.handleState('link',e)} value={link}/>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row className='text-center'>
                <Col className='mx-auto'>
                  <Button className='mb-2' color={this.conditionValidate() ? 'success' : 'danger'} onClick={() => this.handleAdd()}>{this.props.authUser ? 'Send' : 'Suggest'}</Button>
                  {log.message ? <Alert color={log.type}>{log.message}</Alert> : ''}
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    )
  }
  handleState(prop,e){
    this.setState({[prop] : e.target.value})
  }
  conditionValidate(){
    return this.state.title
  }
  handleAdd(){
    if(!this.state.title){return this.log('ERROR: Feed title is not set','danger')}
    const feed = {_id : this.state._id || nowToSeconds(), title : this.state.title, body : this.state.body, link : this.state.link, ts : this.state._id || nowToSeconds()}
    const exists = this.props.feeds.find(f => f._id === feed._id) ? true : false
    if(this.props.authUser){
      this.props.addFeed(feed,
        () => {
          this.log(`Feed added: ${feed.title}`)
          postDiscord({
            username : 'Feed',
            avatar_url : 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/4/46/Town_Portal_Scroll_icon.png?version=ef289382c3a21198b278868bf6f6dfd4',
            embeds : [{
              author : {name : 'Nuevo feed', icon_url : 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/4/46/Town_Portal_Scroll_icon.png?version=ef289382c3a21198b278868bf6f6dfd4'},
              description : `**${feed.title}** *${feed.body}*${feed.link ? '\n:link: ' + feed.link : ''}`,
              color : colorBot
            }]
          },'feedsfromapp'
          )
        }
      )
    }else{
      // db.addTeamFirebase(team,true).then(() => this.log(`${team._id} enviado`,'success'))
    }

    this.resetForm()
  }
  log(message,type){
    this.setState({log : {message, type}})
    this.timeout = setTimeout(() => this.setState({log : {message : ''}}),5000)
  }
  selectOptions(select,options){
    for (var i = 0; i < select.length; i++) {
      if(options.includes(select[i].value)){
        select[i].selected = true
      }
    }
  }
  resetOptions(select){
    for (var i = 0; i < select.length; i++) {
      select[i].selected = false
    }
  }
  resetForm(){
    this.setState({...initialState, log : this.state.log})
  }
}

const mapStateToProps = (state) => ({
  authUser : state.authUser,
  feeds : state.feeds
})

const mapDispatchToProps = (dispatch) => ({
  addFeed : (feed,rv,rj) => dispatch(addFeedFirebase(feed,rv,rj))
})

export default withAuthorization(withRouter(connect(mapStateToProps,mapDispatchToProps)(AddFeedForm)))
