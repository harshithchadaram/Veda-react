import React from "react";
import useGlobalState from "./useGlobalState";
import AppContext from "./AuthContext";

const AppStateProvider = ({ children }) => {
    return (
        <AppContext.Provider value={useGlobalState()}>{children}</AppContext.Provider>
    );
};

export default AppStateProvider;
