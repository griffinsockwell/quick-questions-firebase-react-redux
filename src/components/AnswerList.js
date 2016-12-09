import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import AnswerListItem from './AnswerListItem';
import {
  startListeningForAnswers,
  stopListeningForAnswers,
} from '../actions';

class AnswerList extends Component {
  static propTypes = {
    answers: PropTypes.array,
    loading: PropTypes.bool,
    questionId: PropTypes.string,
    startListeningForAnswers: PropTypes.func,
    stopListeningForAnswers: PropTypes.func,
  }

  componentDidMount() {
    this.props.startListeningForAnswers(this.props.questionId);
  }

  componentWillUnmount() {
    this.props.stopListeningForAnswers(this.props.questionId);
  }

  render() {
    const { loading } = this.props;
    const answers = orderBy(this.props.answers, ['timestamp'], ['desc']);

    let component;
    if (loading) {
      component = (
        <div className="AnswerList-empty">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else if (answers.length) {
      component = (
        <ul className="AnswerList">
          {answers.map(answer => (
            <AnswerListItem
              key={answer.key}
              answer={answer}
            />
          ))}
        </ul>
      );
    } else {
      component = (
        <div className="AnswerList-empty">
          NO ONE HAS ANSWERED THE QUESTION
        </div>
      );
    }

    return component;
  }
}

const mapStateToProps = (props) => {
  const { answers, loading } = props.answers;
  return { answers, loading };
};

export default connect(mapStateToProps, {
  startListeningForAnswers,
  stopListeningForAnswers,
})(AnswerList);
