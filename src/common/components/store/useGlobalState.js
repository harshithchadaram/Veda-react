import { useReducer } from "react";
import * as _ from 'lodash';
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true
            };
        case "LOGOUT":
            window.localStorage.clear();
            return {
                ...state,
                isLoggedIn: false
            };
        default: {
            return state;
        }
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        isLoggedIn: !_.isEmpty(window.localStorage.getItem('accessToken'))
    });

    return { globalState, globalDispatch };
};

export default useGlobalState;
