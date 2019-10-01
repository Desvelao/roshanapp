import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { auth, db } from '../firebase'
import { addTourneyFirebase, deleteTourneyFirebase } from '../reducers/actioncreators'
import { inputdateToTS, nowToSeconds, tsToInputdate, postDiscord } from '../utils'

const initialState = {log : {message : '', type : ''},
  __id : '', edit : false,
  _id : '', by : '', link : '', start : '', finish : '', until : '', info : '', img : ''}

class AddTourneyForm extends Component{
  constructor(props){
    super(props)
    const { state } = this.props.location
    this.state = !state ? {...initialState} : {...initialState,...state.edit,edit : true, __id : state.edit._id}
    if(state){
      this.state.start = tsToInputdate(this.state.start)
      this.state.finish = tsToInputdate(this.state.finish)
      this.state.until = tsToInputdate(this.state.until)
    }
  }
  componentWillUnmount(){
    if(this.timeout){clearTimeout(this.timeout)}
  }
  componentDidMount(){
  }
  render(){
    const { _id, img, by, link, start, finish, until, info, log } = this.state
    return (
      <Col className='mx-auto'>
        <div className='dv-text-title'>{this.props.authUser ? 'Add' : 'Suggest'} a tournament/event</div>
        <hr/>
        <Form>
          <Row>
            <Col md='6'>
              <FormGroup row>
                <Col xs='12'>
                  <Label for='tourney_name'>Tournament name</Label>
                  <Input type='text' id='tourney_name' placeholder='Tournament name' onChange={(e) => this.handleState('_id',e)} value={_id}/>
                </Col>
                <Col xs='12'>
                  <Label for='by'>Host</Label>
                    <Input type='text' id='by' placeholder='Host' onChange={(e) => this.handleState('by',e)} innerRef={(input) => this.by = input} value={by}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={8}>
                  <Label for='img'>Tournament image URL</Label>
                  <Input type='text' id='img' placeholder='Tournament image URL' value={img} onChange={(e) => this.handleState('img',e)}/>
                </Col>
                <Col xs={4} className='h-100'>
                  <img src={img} className='w-100' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label for='link'>Link</Label>
                  <Input type='text' id='link' placeholder='Link' onChange={(e) => this.handleState('link',e)} innerRef={(input) => this.link = input} value={link}/>
                </Col>
              </FormGroup>
            </Col>
            <Col md='6'>
              <FormGroup row>
                <Col xs='6'>
                  <Label for='start'>Start</Label>
                  <Input type='date' id='start' value={start} onChange={(e) => this.handleState('start',e)} innerRef={(input) => this.link = input}/>
                </Col>
                <Col xs='6'>
                  <Label for='finish'>End</Label>
                  <Input type='date' id='finish' value={finish} onChange={(e) => this.handleState('finish',e)} innerRef={(input) => this.link = input}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs='6'>
                  <Label for='until'>Inscriptions until</Label>
                  <Input type='date' id='until' value={until} onChange={(e) => this.handleState('until',e)} innerRef={(input) => this.link = input}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for='info'>Info</Label>
                <Input type='textarea' id='info' placeholder='Info' onChange={(e) => this.handleState('info',e)} innerRef={(input) => this.info = input} value={info}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row className='text-center'>
                <Col className='mx-auto'>
                  <Button className='mb-2' color={this.conditionValidate() ? 'success' : 'danger'} onClick={() => this.handleAddTourney()}>{this.props.authUser ? 'Send' : 'Suggest'}</Button>
                  {log.message ? <Alert color={log.type}>{log.message}</Alert> : ''}
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {this.props.authUser ? null : (<div className='text-muted'>*After suggestion an admin has to accept it.</div>)}
      </Col>
    )
  }
  handleState(prop,e){
    this.setState({[prop] : e.target.value})
  }
  conditionValidate(){
    return this.state._id
  }
  handleAddTourney(){
    if(!this.state._id){return this.log('ERROR: Tournament title is not set','danger')}
    const tourney = {_id : this.state._id, by : this.state.by, img : this.state.img, start : inputdateToTS(this.state.start,'start'), finish : inputdateToTS(this.state.finish,'end'), until : inputdateToTS(this.state.until,'end'),
      link : this.state.link, info : this.state.info, ts : nowToSeconds()}
    const exists = this.props.tourneys.find(t => t._id === tourney._id) ? true : false
    if(this.props.authUser){
      this.props.addTourney(tourney,
        () => {
          this.log(`Tournament added: ${tourney._id}`)
        }
      )
    }else{
      const embed = {username : 'New Torneo', avatar_url : '',
        embeds : [
          {
            title : `Nuevo torneo`,
            description : tourney.info || 'ND',
            thumbnail : {url : tourney.img  || 'ND'},
            fields : [
              {name : 'Nombre', value : tourney._id || 'ND', inline : true},
              {name : 'Organizado', value : tourney.by || 'ND', inline : true},
              {name : 'Empieza', value : tourney.start || 'ND', inline : true},
              {name : 'Termina', value : tourney.finish || 'ND', inline : true},
              {name : 'Inscripciones hasta', value : tourney.until || 'ND', inline : true},
              {name : 'Link', value : tourney.link || 'ND', inline : true},
            ]
          }
        ]
      }
      postDiscord(embed,'fromapp')
      this.log('Tournament suggestion was sent', 'success')
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
  tourneys : state.tourneys
})

const mapDispatchToProps = (dispatch) => ({
  addTourney : (tourney,rv,rj) => dispatch(addTourneyFirebase(tourney,rv,rj))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddTourneyForm))
