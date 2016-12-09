import * as types from '../actions/types';

const initialState = {
  error: '',
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUESTION_TEXT:
      return { ...state, text: action.payload };
    case types.SUBMIT_QUESTION_SUCCESS:
      return { ...state, error: '', text: '' };
    case types.SUBMIT_QUESTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
