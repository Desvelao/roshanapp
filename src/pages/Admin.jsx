import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import AdminPanel from '../components/AdminPanel.jsx'
import routes from '../constants/routes'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'

class Admin extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return !this.props.authUser ? <LoginForm /> : <AdminPanel />
  }
}

const mapStateToProps = (state) => ({
  authUser : state.authUser
})

export default connect(mapStateToProps)(Admin)
