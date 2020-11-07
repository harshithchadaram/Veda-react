
import { ActionCreator, Dispatch } from 'redux';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_UUID = 'UPDATE_UUID';
export const UPDATE_CART = 'UPDATE_CART';

export const updateLocation = (userLocation) =>
    (dispatch) => dispatch({ type: UPDATE_LOCATION, userLocation: userLocation });

export const updateUUID = (uuid) =>
    (dispatch) => dispatch({ type: UPDATE_UUID, uuid: uuid });

export const updateCartCount = (cart) =>
    (dispatch) => dispatch({ type: UPDATE_CART, cart: cart });
