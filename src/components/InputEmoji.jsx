import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { smile } from '../constants/emojis.js'

class InputEmoji extends Component {
    constructor(props){
      super(props)
      this.state = {togglePicker : false}
      this.input = ''
    }
    addEmoji(emoji){
      this.props.onSelect(this.insertText(this.props.value,this.inputRef.selectionStart,emoji.native))
      if(this.props.closeOnSelect){this.toggleEmojiPicker()}
    }
    insertText(base,index,insert){
      return base.slice(0, index) + insert + ' ' + base.slice(index);
    }
    toggleEmojiPicker(){
      this.setState({togglePicker : !this.state.togglePicker})
    }
    render(){
      return (
        <div>
          <InputGroup>
            <Input type={this.props.type} placeholder={this.props.placeholder} onChange={(e) => this.props.onChange(e)} value={this.props.value} innerRef={ref => this.inputRef = ref}/>
            <InputGroupAddon addonType="append"><Button color={this.state.togglePicker ? 'success' : 'danger'} onClick={() => this.toggleEmojiPicker()}>{ smile }</Button></InputGroupAddon>
          </InputGroup>
          {this.state.togglePicker && (<Picker set='twitter' onSelect={(emoji) => this.addEmoji(emoji)} style={{ position: 'absolute', right : '0', zIndex: '1000' }}/>)}
        </div>
      )
    }

  }

export default InputEmoji
