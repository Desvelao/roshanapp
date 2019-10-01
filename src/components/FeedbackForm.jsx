import React, { Component } from 'react';
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import { nowToSeconds , postDiscord } from '../utils'

const initialState = {log : {message : '', type : ''}, __id : '', edit : false, _id : '', title : '', body : '' , author : ''}

class FeedbackForm extends Component{
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
    const { _id, title, body, author, log } = this.state
    return (
      <Col className='mx-auto'>
        <div className='dv-text-title'>Feedback</div>
        <hr/>
        <Form>
          <Row className='justify-content-center'>
            <Col md='6'>
              <FormGroup row>
                <Col xs='12'>
                  <Label for='title'>Title</Label>
                  <Input type='text' id='title' placeholder='Title' onChange={(e) => this.handleState('title',e)} value={title}/>
                </Col>
                <Col xs='12'>
                  <Label for='author'>Author</Label>
                    <Input type='text' id='author' placeholder='Author' onChange={(e) => this.handleState('author',e)} innerRef={(input) => this.author = input} value={author}/>
                </Col>
                <Col xs='12'>
                  <Label for='body'>Description</Label>
                    <Input type='textarea' id='body' placeholder='Description' onChange={(e) => this.handleState('body',e)} innerRef={(input) => this.body = input} value={body}/>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row className='text-center'>
                <Col className='mx-auto'>
                  <Button className='mb-2' color={this.conditionValidate() ? 'success' : 'danger'} onClick={() => this.handleAdd()}>Send</Button>
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
    return this.state.title && this.state.body.length > 13 && this.state.author.length > 0
  }
  handleAdd(){
    if(!this.state.title){return this.log('ERROR: Title is not set','danger')}
    if(!this.state.author.length > 0){return this.log('ERROR: Write message author','danger')}
    if(this.state.body.length < 13){return this.log('ERROR: Message body needs more words','danger')}
    const msg = {title : this.state.title, body : this.state.body, author : this.state.author, ts : nowToSeconds()}
    postDiscord({username : 'Feedback', avatar_url : '',
      embeds : [
        {
          author : {name : msg.author},
          title : msg.title,
          description : msg.body
        }
      ]
    },'playgrounds')

    this.log('Thank you so much for your feedback!','success',true)

  }
  log(message,type,reset){
    this.setState({log : {message, type}})
    this.timeout = setTimeout(() => {
      this.setState({log : {message : ''}})
      if(reset){this.resetForm()}
    }
    ,5000)
  }
  resetForm(){
    this.setState({...initialState, log : this.state.log})
  }
}

export default FeedbackForm
