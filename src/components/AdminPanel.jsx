import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { ButtonsEdit } from '../components/ButtonEditDelete.jsx'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button,
Nav, NavItem, NavLink, TabContent,TabPane,Card,CardTitle,CardText, Table } from 'reactstrap'
import { secondsToDate } from '../utils'
import { classnames } from '../utils'
import { deleteFeedFirebase, deleteTourneyFirebase } from '../reducers/actioncreators.js'

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
              >
              Torneos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              >
              Feeds
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <TableTourneys history={this.props.history} tourneys={this.props.tourneys} onClickDelete={this.props.deleteTourney}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <TableFeeds history={this.props.history} feeds={this.props.feeds} onClickDelete={this.props.deleteFeed}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tourneys : state.tourneys,
  feeds : state.feeds
})

const mapDispatchToProps = (dispatch) => ({
  // addTourney : (tourney,rs,rj) => dispatch(addTourneyFirebase(tourney,rs,rj)),
  deleteTourney : (tourney,rs,rj) => dispatch(deleteTourneyFirebase(tourney,rs,rj)),
  deleteFeed : (feed,rs,rj) => dispatch(deleteFeedFirebase(feed,rs,rj)),
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AdminPanel))

const TableTourneys = (props) => (
  <div>
    <div className='dv-text-title'>Torurnaments <Link to={routes.ADD_TOURNEY} className='btn btn-primary'><i className='fas fa-plus'></i></Link></div>
    <Table className='text-center dv-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start</th>
          <th>Finish</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.tourneys.map(tourney => (<tr key={tourney._id}>
          <td>{tourney._id}</td>
          <td>{tourney.start ? secondsToDate(tourney.start) : 'ND'}</td>
          <td>{tourney.finish ? secondsToDate(tourney.finish) : 'ND'}</td>
          <td><ButtonsEdit onClickEdit={() => props.history.push({pathname : routes.ADD_TOURNEY, state : {edit : tourney}})} onClickDelete={() => {props.onClickDelete(tourney)}}/></td>
        </tr>))}
      </tbody>
    </Table>
  </div>
)

const TableFeeds = (props) => (
  <div>
    <div className='dv-text-title'>Feeds <Link to={routes.ADD_FEED} className='btn btn-primary'><i className='fas fa-plus'></i></Link></div>
    <Table className='text-center dv-table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.feeds.map(feed => (<tr key={feed._id}>
          <td>{feed.title}</td>
          <td>{feed.body}</td>
          <td><ButtonsEdit onClickEdit={() => props.history.push({pathname : routes.ADD_FEED, state : {edit : feed}})} onClickDelete={() => {props.onClickDelete(feed)}}/></td>
        </tr>))}
      </tbody>
    </Table>
  </div>
)
