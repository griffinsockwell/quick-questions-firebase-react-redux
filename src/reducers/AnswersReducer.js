import * as types from '../actions/types';

const initialState = {
  loading: true,
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ANSWERS_START_LISTENING:
      return { ...state, loading: false, answers: action.payload };
    case types.ANSWERS_STOP_LISTENING:
      return { ...state, loading: true, answers: [] };
    default:
      return state;
  }
};
