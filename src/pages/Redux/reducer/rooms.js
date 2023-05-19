const initialState = {
    hasRooms: false,
    rooms: null,
    numberOfRoom: 0,
}

const roomsReducer = (state = initialState, action) => {
    if(action.type === 'ROOMS'){
        return {
            ...state,
            rooms: action.payload.rooms,
            numberOfRoom: action.payload.numberOfRooms,
            hasRooms: true,
        }}
    else return state
}

export default roomsReducer