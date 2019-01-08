import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button } from 'reactstrap'
import * as emojis from '../constants/emojis.js'
import { classnames } from '../utils'

const LeyendaIcons = ({className,size}) => {
  return(
    <div className={className + ' ' + classnames({['dv-text-mini'] : size === 'mini'})}>
      <div className='font-weight-bold'>Icon leyend</div>
      <span>{emojis.pencil} Inscriptions until</span>
      <span> · </span>
      <span>{emojis.calendar} Tournament/Event starts</span>
      <span> · </span>
      <span>{emojis.red_flag} Tournament/Event ends</span>
    </div>
  )
}

export default LeyendaIcons
