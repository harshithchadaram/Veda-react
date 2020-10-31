import { UPDATE_LOCATION, UPDATE_UUID } from './actions';

const initialState = {
    userLocation: '',
    uuid: ''
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            window.localStorage.setItem('userLocation', JSON.stringify(action.userLocation));
            return {
                ...state,
                userLocation: action.userLocation
            };
        case UPDATE_UUID:
            return {
                ...state,
                uuid: action.uuid
            };
        default:
            return state;
    }

}

export default reducer;