import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';

const store = configureStore({
    reducer: {
        auth: userReducer
    }
})

export default store