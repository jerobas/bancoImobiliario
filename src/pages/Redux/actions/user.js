import { saveTokenInStorage, saveUserInStorage } from '../../../services/Auth'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (userData) => (
    saveTokenInStorage(userData.access_token),
    saveUserInStorage(userData.user), {
        type: LOGIN_SUCCESS,
        payload: userData
    }
)

export const loginFailure = () => ({
    type: LOGIN_FAILURE
});

export const logout = () => ({
    type: LOGOUT
});
