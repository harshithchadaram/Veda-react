import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../store/AuthContext';


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { globalState } = useContext(AppContext);
    const { path } = rest;
    return (
        <Route
            {...rest}
            render={props => {
                if (globalState.isLoggedIn) {
                    console.log(path, props.location);
                    return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: '/', state: { from: props.location }
                        }
                    } />
                }
            }
            } />
    );
}