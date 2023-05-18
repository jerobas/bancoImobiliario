import { configureStore } from '@reduxjs/toolkit';

import roomsReducer from './reducer/rooms';
import userReducer from './reducer/user';

const store = configureStore({
    reducer: {
        auth: userReducer,
        room: roomsReducer
    }
})

export default store