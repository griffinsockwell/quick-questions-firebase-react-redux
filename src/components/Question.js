import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import moment from 'moment';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import QuestionRemove from './QuestionRemove';
import {
  fetchQuestion,
  resetQuestion,
} from '../actions';

class Question extends Component {
  static propTypes = {
    fetchQuestion: PropTypes.func,
    loading: PropTypes.bool,
    params: PropTypes.object,
    question: PropTypes.object,
    resetQuestion: PropTypes.func,
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.fetchQuestion(params.questionId);
  }

  componentWillUnmount() {
    this.props.resetQuestion();
  }

  render() {
    const { loading, question } = this.props;
    const { questionId } = this.props.params;

    let component;
    if (loading) {
      component = (
        <div className="Question-empty">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (question.text) {
      component = (
        <div className="Question">
          <div className="Question-container">
            <img src={question.photoURL} alt={question.displayName} />
            <span>{question.displayName} asked {moment(question.timestamp).fromNow()}</span>
            <p>{question.text}</p>
            <QuestionRemove question={question} />
          </div>

          <AnswerForm questionId={questionId} />

          <AnswerList questionId={questionId} />

        </div>
      );
    } else {
      component = (
        <div className="Question-empty">
          NO QUESTION FOUND
        </div>
      );
    }

    return component;
  }
}

const mapStateToProps = (props) => {
  const { loading, question } = props.question;
  return { loading, question };
};

export default connect(mapStateToProps, {
  fetchQuestion,
  resetQuestion,
})(Question);
