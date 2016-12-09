import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import QuestionList from './QuestionList';
import {
  startListeningForQuestions,
  stopListeningForQuestions,
} from '../actions';

class Home extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    questions: PropTypes.array,
    startListeningForQuestions: PropTypes.func,
    stopListeningForQuestions: PropTypes.func,
  }

  componentDidMount() {
    this.props.startListeningForQuestions();
  }

  componentWillUnmount() {
    this.props.stopListeningForQuestions();
  }

  render() {
    const { loading } = this.props;
    const questions = orderBy(this.props.questions, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="Home">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (questions.length) {
      component = (
        <QuestionList questions={questions} />
      );
    } else {
      component = (
        <div className="Home">
          NO ONE HAS ASKED ANY QUESTIONS
        </div>
      );
    }

    return component;
  }
}

const mapStateToProps = (props) => {
  const { loading, questions } = props.questions;
  return { loading, questions };
};

export default connect(mapStateToProps, {
  startListeningForQuestions,
  stopListeningForQuestions,
})(Home);
