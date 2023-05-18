const initialState = {
    hasRooms: false,
    rooms: null,
    numberOfRoom: 0
}

const roomsReducer = (state = initialState, action) => {
    if(action.type === 'ROOMS'){
        return {
            ...state,
            hasRooms: true,
            rooms: action.payload,
            numberOfRoom: action.payload.length
        }}
    else return state
}

export default roomsReducer