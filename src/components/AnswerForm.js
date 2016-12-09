import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  setAnswerText,
  submitAnswer,
  resetAnswerForm,
} from '../actions';

class AnswerForm extends Component {
  static propTypes = {
    error: PropTypes.string,
    questionId: PropTypes.string,
    resetAnswerForm: PropTypes.func,
    setAnswerText: PropTypes.func,
    submitAnswer: PropTypes.func,
    success: PropTypes.bool,
    text: PropTypes.string,
    user: PropTypes.object,
  }

  componentWillUnmount() {
    this.props.resetAnswerForm();
  }

  setText = (evt) => {
    const text = evt.target.value;
    this.props.setAnswerText(text);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { text, questionId } = this.props;

    // Check if the user has input text
    if (text.trim()) {
      this.props.submitAnswer(text, questionId);
    }
  }

  render() {
    const { error, success, text, user } = this.props;

    let component;
    if (success) {
      component = (
        <div className="AnswerForm-info">
          <p>YOU HAVE POSTED AN ANSWER TO THE QUESTION!</p>
        </div>
      );
    } else if (user) {
      component = (
        <div className="AnswerForm">
          <form onSubmit={this.handleSubmit}>

            {error ? <div className="error">{error}</div> : ''}

            <textarea
              placeholder="Answer the question here..."
              onChange={this.setText}
              value={text}
            />
            <input
              type="submit"
              value="Post Answer"
            />
          </form>
        </div>
      );
    } else {
      component = (
        <div className="AnswerForm-info">
          <p>YOU MUST BE SIGNED IN TO ANSWER THE QUESTION</p>
        </div>
      );
    }

    return component;
  }
}

const mapStateToProps = ({ answerForm, auth }) => {
  const { error, success, text } = answerForm;
  const { user } = auth;
  return { error, success, text, user };
};

export default connect(mapStateToProps, {
  setAnswerText,
  submitAnswer,
  resetAnswerForm,
})(AnswerForm);
