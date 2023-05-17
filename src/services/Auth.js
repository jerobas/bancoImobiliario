import { toast } from 'react-toastify'
import io from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SOCKET_API)
export const TOKEN_KEY = '@bi-token'
export const TOKEN_KEY_USER = '@bi-user'
export const isAlreadyAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const saveTokenInStorage = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}


export const saveUserInStorage = (user) => {
    localStorage.setItem(TOKEN_KEY_USER, JSON.stringify(user))
}

export const removeStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY_USER)
}