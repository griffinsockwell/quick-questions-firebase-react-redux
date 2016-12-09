import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import {
  checkAuth,
  signIn,
  signOut,
} from '../actions';

class Navbar extends Component {
  static propTypes = {
    authenticating: PropTypes.bool,
    checkAuth: PropTypes.func,
    signIn: PropTypes.func,
    signOut: PropTypes.func,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  handleSignIn = () => {
    this.props.signIn();
  }

  handleSignOut = () => {
    this.props.signOut();
  }

  render() {
    const { authenticating, user } = this.props;

    const authButton = user
      ? (<button onClick={this.handleSignOut}>
        <div>Sign Out</div>
        <img src={user.photoURL} alt="profile-pic" />
      </button>)
      : (<button onClick={this.handleSignIn}>
        <div>Sign In With Google</div>
      </button>);

    return (
      <div className="Navbar">
        <div className="Navbar-home">
          <Link to="/">Quick Questions</Link>
        </div>

        {user ?
          <Link to="/new-question">
            New Question
          </Link> : ''}

        {user ?
          <Link to="/my-questions">
            My Questions
          </Link> : ''}

        <div className="Navbar-auth">
          {authenticating ?
            <button>
              <Spinner spinnerName="three-bounce" />
            </button> : authButton}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authenticating, user } = auth;
  return { authenticating, user };
};

export default connect(mapStateToProps, {
  checkAuth,
  signIn,
  signOut,
})(Navbar);
