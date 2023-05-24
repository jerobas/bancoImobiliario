import { LOGIN_SUCCESS  } from '../actions/user';
import {saveUserInStorage} from '../../../services/Auth'

const initialState = {
    isAuthenticatedLocal: false,
    user: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        saveUserInStorage(action.payload)
        return {
          ...state,
          isAuthenticatedLocal: true,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;