import React, { Component } from 'react';
import { HashRouter as Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
// import Posts from './pages/Posts.jsx'
// import Post from './pages/Post.jsx'
import Admin from './pages/Admin.jsx'
import Feeds from './pages/Feeds.jsx'
import Links from './pages/Links.jsx'
import AddTourneyForm from './components/AddTourneyForm.jsx'
import AddFeedForm from './components/AddFeedForm.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'
import routes from './constants/routes'
import { db } from './firebase'
import * as actions from './reducers/actioncreators'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Button } from 'reactstrap'
import Navigation from './components/Navigation'
import withAuthentication from './hocs/withAuthentication.jsx'

class App extends Component {
  componentDidMount() {
    this.props.loadLeaderboard()
    this.props.loadTourneys()
    this.props.loadFeeds()
    this.props.loadPublic()
  }
  render() {
    return (
      <Router>
        <div>
          <Navigation/>
          <Container className='content'>
            <div className='mt-3'>
              <Switch>
                <Route exact path={routes.HOME} component={Home}/>
                <Route exact path={routes.LEADERBOARD} component={Leaderboard}/>
                <Route exact path={routes.FEEDBACK} component={FeedbackForm}/>
                <Route exact path={routes.ADD_PUBLIC_TOURNEY} component={AddTourneyForm}/>
                <Route exact path={routes.ADD_FEED} component={AddFeedForm}/>
                <Route exact path={routes.FEEDS} component={Feeds}/>
                <Route exact path={routes.ADD_TOURNEY} component={AddTourneyForm}/>
                <Route exact path={routes.ADMIN} component={Admin}/>
                <Route exact path={routes.LINKS} component={Links}/>
              </Switch>
            </div>
          </Container>
        </div>
      </Router>
    );
  }
}
// <Navigation/>
// <Container className='content'>
//   <Row>
//     <Col className='mt-3'>
//       <Switch>
//         <Route exact path={routes.HOME} component={Home}/>
//       </Switch>
//     </Col>
//   </Row>
// </Container>

// <Route exact path={routes.LEADERBOARD} component={Leaderboard}/>
// <Route exact path={routes.POSTS} component={Posts}/>
// <Route path={routes.POSTS+'/:team_id'} component={Post}/>
// <Route path={routes.ADMIN} component={Admin}/>
//
const mapDispatchToProps = (dispatch) => ({
  loadLeaderboard : () => dispatch(actions.loadLeaderboardFirebase()),
  loadTourneys : () => dispatch(actions.loadTourneysFirebase()),
  loadFeeds : () => dispatch(actions.loadFeedsFirebase()),
  loadPublic : () => dispatch(actions.loadPublicFirebase()),
})

// export default connect(null,mapDispatchtoProps)(App);

export default compose(
  withAuthentication, //TODO
  connect(null,mapDispatchToProps)
)(App)
