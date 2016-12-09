import * as types from '../actions/types';

const initialState = {
  loading: true,
  questions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.QUESTIONS_START_LISTENING:
      return { ...state, loading: false, questions: action.payload };
    case types.QUESTIONS_STOP_LISTENING:
      return { ...state, loading: true, questions: [] };
    default:
      return state;
  }
};
