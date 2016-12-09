import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import QuestionList from './QuestionList';
import {
  startListeningForMyQuestions,
  stopListeningForMyQuestions,
} from '../actions';

class MyQuestions extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    questions: PropTypes.array,
    startListeningForMyQuestions: PropTypes.func,
    stopListeningForMyQuestions: PropTypes.func,
    user: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.user === null) {
      browserHistory.push('/');
    } else {
      this.props.startListeningForMyQuestions(this.props.user.uid);
    }
  }

  componentWillUnmount() {
    this.props.stopListeningForMyQuestions(this.props.user.uid);
  }

  render() {
    const { loading } = this.props;
    const questions = orderBy(this.props.questions, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="MyQuestions">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (questions.length) {
      component = (
        <QuestionList questions={questions} />
      );
    } else {
      component = (
        <div className="MyQuestions">
          YOU HAVE NOT ASKED ANY QUESTIONS
        </div>
      );
    }

    return component;
  }
}

const mapStateToProps = ({ auth, myQuestions }) => {
  const { user } = auth;
  const { loading, questions } = myQuestions;
  return { user, loading, questions };
};

export default connect(mapStateToProps, {
  startListeningForMyQuestions,
  stopListeningForMyQuestions,
})(MyQuestions);
