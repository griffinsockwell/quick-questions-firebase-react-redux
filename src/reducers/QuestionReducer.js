import * as types from '../actions/types';

const initialState = {
  loading: true,
  question: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_QUESTION:
      return { ...state, loading: false, question: action.payload };
    case types.RESET_QUESTION:
      return { ...state, loading: true, question: {} };
    default:
      return state;
  }
};
