import { UPDATE_LOCATION } from './actions';

const initialState = {
    userLocation: ''
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                userLocation: action.userLocation
            };
        default:
            return state;
    }

}

export default reducer;