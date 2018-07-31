import React from 'react';
import { connect } from 'react-redux';
import { firebase, auth } from '../firebase';
import { withRouter } from 'react-router'
import routes from '../constants/routes'

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props){
      super(props)
    }
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(!authUser){this.props.history.push(routes.ADMIN)}
      });
      // if(!this.props.authUser){this.props.history.push(routes.ADMIN)}
    }
    render() {
      return this.props.authUser ? <Component /> : null
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.authUser
  });

  return withRouter(connect(mapStateToProps)(WithAuthorization));
}

export default withAuthorization;
