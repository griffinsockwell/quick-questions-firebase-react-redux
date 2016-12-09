import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  setQuestionText,
  submitQuestion,
} from '../actions';

class QuestionForm extends Component {
  static propTypes = {
    error: PropTypes.string,
    setQuestionText: PropTypes.func,
    submitQuestion: PropTypes.func,
    text: PropTypes.string,
  }

  setText = (evt) => {
    const text = evt.target.value;
    this.props.setQuestionText(text);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { text } = this.props;

    // Check if the user has input text
    if (text.trim()) {
      this.props.submitQuestion(text);
    }
  }

  render() {
    const { error, text } = this.props;

    return (
      <form
        className="QuestionForm"
        onSubmit={this.handleSubmit}
      >

        {error ? <div className="error">{error}</div> : ''}

        <textarea
          placeholder="Ask question here..."
          onChange={this.setText}
          value={text}
        />
        <input
          type="submit"
          value="Post Question"
        />
      </form>
    );
  }
}

const mapStateToProps = ({ questionForm }) => {
  const { error, text } = questionForm;
  return { error, text };
};

export default connect(mapStateToProps, {
  setQuestionText,
  submitQuestion,
})(QuestionForm);
