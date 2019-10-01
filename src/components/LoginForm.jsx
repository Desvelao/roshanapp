import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { auth } from '../firebase'
import { Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button } from 'reactstrap'

class LoginForm extends Component {
  constructor(props){
    super()
  }
  componentDidMount(){
    this.username.focus()
  }
  componentWillUnmount(){
    clearTimeout(this.timeout)
  }
  render() {
    return (
        <Row className='mx-auto text-center justify-content-center'>
          <Col md='4'>
            <div className='dv-text-title'>Admin</div>
            <Form>
              <FormGroup>
                <InputGroup className='mb-2'>
                  <Input placeholder="username" innerRef={ref => this.username = ref}/>
                  <InputGroupAddon addonType="append">@roshanapp.admin</InputGroupAddon>
                </InputGroup>
                <FormGroup>
                  <Input type='password' placeholder='password' innerRef={ref => this.password = ref}/>
                </FormGroup>
                <FormGroup>
                  <Button color='primary' onClick={() => this.handleLogin()}>Init</Button>
                </FormGroup>
            </FormGroup>
          </Form>
        </Col>
        </Row>

    );
  }
  handleLogin(){
    // if(true){
    if(this.username.value.length > 0 && this.password.value.length > 0){
      const {
        history,
      } = this.props;
      auth.login(this.username.value +'@roshanapp.admin',this.password.value).then(user => {
      }).catch(err => console.log(err))
    }
  }
}

export default withRouter(LoginForm)
