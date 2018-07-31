import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import routes from '../constants/routes'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import { auth, db } from '../firebase'
import { connect } from 'react-redux'
import { addPlayerFirebase } from '../reducers/actioncreators'
import { DOTABUFF_SEARCH } from '../constants/links'
import { nowToSeconds } from '../utils'

const initialState = {log : {message : '', type : ''}, __id : '', edit : false, _id : '', name : ''}

class AddPlayerForm extends Component{
  constructor(props){
    super(props)
    const { state } = this.props.location
    this.state = !state ? {...initialState} : {...initialState,...state.edit,edit : true, __id : state.edit._id}
  }
  componentWillUnmount(){
    if(this.timeout){clearTimeout(this.timeout)}
  }
  render(){
    const { log } = this.state
    return (
      <Col md='6' className='text-center mx-auto'>
        <div className='dv-text-title'>{this.props.authUser ? 'Añade' : 'Sugiere'} un/a jugador/a</div>
        <hr/>
        <Form className='mb-3'>
          <FormGroup>
            <Input type='text' placeholder='Nombre jugador/a' onChange={e => this.handleState('name',e)} value={this.state.name} innerRef={(input) => this.player = input}/>
          </FormGroup>
          <FormGroup>
            <Input type='number' placeholder='Dota ID (ej: 112840925)' onChange={e => this.handleState('_id',e)} value={this.state._id} innerRef={(input) => this.dotaID = input}/>
            <FormText color='muted'>Ejemplo: URL <code>https://www.dotabuff.com/players/112840925</code><br/>Dota ID es <code>112840925</code><br/><span>Busca tu id en <a href={DOTABUFF_SEARCH} target='_blank'>Dotabuff</a></span></FormText>
          </FormGroup>
          <FormGroup className='mx-auto'>
            <Button color={this.state.name && this.state._id ? 'success' : 'danger'} onClick={() => this.handleAddPlayer()}>Enviar</Button>
          </FormGroup>
          {log.message ? <Alert color={log.type}>{log.message}</Alert> : ''}
        </Form>
        {this.props.authUser ? null : (<div className='text-muted'>*Después de sugerir tiene que ser aprobado por un admin</div>)}
      </Col>
    )
  }
  handleState(prop,e){
    this.setState({[prop] : e.target.value})
  }
  handleAddPlayer(){
    const player = {_id : this.state._id, name : this.state.name, ts : nowToSeconds()}
    if(Object.keys(player).map(k => player[k]).some(v => v.length < 1)){return this.log(`Faltan campos por rellenar`,'danger')}
    if(this.props.authUser){
      this.props.addPlayer(player,() => this.log(`${player.name} añadido`,'success'), () => this.log(`ERROR: No se pudo añadir`,'danger'))
    }else{
      db.addPlayerFirebase(player,true).then(() => this.log(`${player.name} enviado`,'success')) //TODO firebase event
    }
    this.setState({...initialState})
  }
  log(message,type){
    this.setState({log : {message, type}})
    this.timeout = setTimeout(() => this.setState({log : {message : ''}}),5000)
  }
}

const mapStateToProps = (state) => ({
  authUser : state.authUser,
  players : state.players
})

const mapDispatchToProps = (dispatch) => ({
  addPlayer : (player,resolve,reject) => dispatch(addPlayerFirebase(player,resolve,reject))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddPlayerForm)
