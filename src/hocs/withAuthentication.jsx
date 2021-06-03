import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../firebase';
import { login } from '../reducers/actioncreators'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }
    render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch(login(authUser)),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
