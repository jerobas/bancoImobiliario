import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/user';

const initialState = {
    isAuthenticatedLocal: false,
    user: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticatedLocal: true,
          user: action.payload
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticatedLocal: false,
          user: null
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticatedLocal: false,
          user: null
        };
      default:
        return state;
    }
  };
  
  export default userReducer;