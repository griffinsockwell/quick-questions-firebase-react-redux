import * as types from '../actions/types';

const initialState = {
  authenticating: true,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATING:
      return { ...state, authenticating: true };
    case types.AUTH_RESULT:
      return { ...state, authenticating: false, user: action.payload };
    default:
      return state;
  }
};
