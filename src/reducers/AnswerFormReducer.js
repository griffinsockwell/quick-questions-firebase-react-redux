import * as types from '../actions/types';

const initialState = {
  error: '',
  success: false,
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ANSWER_TEXT:
      return { ...state, text: action.payload };
    case types.SUBMIT_ANSWER_SUCCESS:
      return { ...state, success: true };
    case types.SUBMIT_ANSWER_ERROR:
      return { ...state, error: action.payload };
    case types.RESET_ANSWER_FORM:
      return { ...state, error: '', success: false, text: '' };
    default:
      return state;
  }
};
