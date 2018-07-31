import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'

const ButtonEditDelete = (props) => {
    const team = props
    const options = {
      delete : {icon : 'fas fa-trash-alt', color : 'danger'},
      edit : {icon : 'fas fa-edit', color : 'warning'},
      accept : {icon : 'fas fa-check', color : 'success'},
    }
    let config;
    if(props.delete){
      config = options.delete
    }else if(props.edit){
      config = options.edit
    }else if(props.accept){
      config = options.accept
    }
    const icon = props.delete ? 'fas fa-trash-alt' : 'fas fa-edit'
    const color = props.delete ? 'danger' : 'warning'
    const handleAction = props.onClick
    return (
      <Button size={props.size ? props.size : 'md'} className={props.className} onClick={handleAction} color={config.color}><i className={config.icon}></i></Button>
    )
  }

export default ButtonEditDelete


const ButtonsEdit = props => {
  return (
    <div className="d-inline">
      <ButtonEditDelete size='sm' className="mx-1" edit onClick={props.onClickEdit}/>
      <ButtonEditDelete size='sm' className="mx-1" delete onClick={props.onClickDelete}/>
    </div>
  )
}

const ButtonsAcceptRemove = props => {
  return (
    <div className="d-inline">
      <ButtonEditDelete size='sm' className="mx-1" accept onClick={props.onClickAccept}/>
      <ButtonEditDelete size='sm' className="mx-1" delete onClick={props.onClickDelete}/>
    </div>
  )
}

export { ButtonsEdit, ButtonsAcceptRemove }
