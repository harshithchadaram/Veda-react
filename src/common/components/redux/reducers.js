import { UPDATE_LOCATION } from './actions';

const initialState = {
    userLocation: ''
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            window.localStorage.setItem('userLocation', JSON.stringify(action.userLocation));
            return {
                userLocation: action.userLocation
            };
        default:
            return state;
    }

}

export default reducer;