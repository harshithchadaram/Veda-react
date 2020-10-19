
import { ActionCreator, Dispatch } from 'redux';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (userLocation) =>
    (dispatch) => dispatch({ type: UPDATE_LOCATION, userLocation: userLocation });
