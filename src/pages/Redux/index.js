import { configureStore } from '@reduxjs/toolkit';

import roomsReducer from './reducer/rooms';

const store = configureStore({
    reducer: {
        room: roomsReducer
    }
})

export default store