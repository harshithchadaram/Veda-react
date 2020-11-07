import { UPDATE_CART, UPDATE_LOCATION, UPDATE_UUID } from './actions';

const initialState = {
    userLocation: '',
    uuid: '',
    cart: {}
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
        case UPDATE_CART:
            return {
                ...state,
                cart: action.cart
            };
        default:
            return state;
    }

}

export default reducer;