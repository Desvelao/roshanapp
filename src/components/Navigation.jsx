import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { auth, db } from '../firebase'
import {  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Roshan from '../img/roshan.png'

class Navigation extends Component{
  constructor(props){
    super(props)
    this.state = {collapsed : false}
  }
  handleToggleNavbar(){
    this.setState({collapsed : !this.state.collapsed})
  }
  render(){
    return (
          <Navbar color="light" fixed='' light expand="md">
            <Link className='navbar-brand' to={routes.HOME}><img height={30} width={30} className='dv-border-circle d-inline-block align-top' src={Roshan}/> Roshan<span className='dv-nav-subtitle'>, el Inmortal</span></Link>
            <NavbarToggler onClick={()=> this.handleToggleNavbar()} className="" />
            <Collapse isOpen={this.state.collapsed} navbar>
              { this.props.authUser ? <MenuAdmin {...this.props}/> : <MenuPublic />}
            </Collapse>
          </Navbar>
    )
  }
}

const MenuPublic = ({ history }) => (
  <Nav className='ml-auto text-center' navbar>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.HOME}>Inicio</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.LEADERBOARD}>Leaderboard</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.FEEDS}>Feeds</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.LINKS}>Links</Link>
    </NavItem>
    <NavItem className='mx-2'>
      <Link className='align-middle' to={routes.ADMIN}>Admin</Link>
    </NavItem>
  </Nav>
)

// <NavItem>
//   <NavLink href={routes.HOME}>Inicio</NavLink>
// </NavItem>


const MenuAdmin = (props) => {
    const { history } = props
    return (
      <Nav className='ml-auto text-center' navbar>
        <NavItem className='mx-2'>
          <Link className='align-middle' to={routes.HOME}>Inicio</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-middle' to={routes.LEADERBOARD}>Leaderboard</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-middle' to={routes.FEEDS}>Feeds</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-middle' to={routes.LINKS}>Links</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Link className='align-middle' to={routes.ADMIN}>Panel</Link>
        </NavItem>
        <NavItem className='mx-2'>
          <Button size='sm' color='link' className="text-danger" onClick={() => logout(history)}>Salir</Button>
        </NavItem>
      </Nav>
    )
  }

function logout(history){
  auth.logout().then(() => history.push(routes.HOME))
}

function login(history){
  auth.login().then(() => history.push(routes.ADMIN))
}


const mapStateToProps = (state) => ({
  authUser: state.authUser
});

export default withRouter(connect(mapStateToProps)(Navigation));
