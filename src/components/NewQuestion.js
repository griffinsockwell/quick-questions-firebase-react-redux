import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import QuestionForm from './QuestionForm';

class NewQuestion extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user === null) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div className="NewQuestion">
        <QuestionForm />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, {})(NewQuestion);
