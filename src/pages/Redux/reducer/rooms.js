const initialState = {
    hasRooms: false,
    rooms: null,
    originalData: null,
    numberOfRoom: 0,
}

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ROOMS':
            return {
                ...state,
                rooms: action.payload.rooms,
                originalData: action.payload.rooms,
                numberOfRooms: action.payload.numberOfRooms,
                hasRooms: true,
            }
        case 'SET_FILTER':
            let aux = state.rooms ? state.rooms : []
            return {
                ...state,
                rooms: aux.filter(elemento => elemento[0].startsWith(action.payload))
            }
        case 'CLEAN_FILTER':
            return {
                ...state,
                rooms: state.originalData,
            }
        default:
            return state
    }
}

export default roomsReducer