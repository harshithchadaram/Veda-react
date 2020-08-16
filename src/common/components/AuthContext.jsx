import React from 'react'

const AppContext = React.createContext({
    value: {},
    updateValue: (key, val) => { }
});
export const AppProvider = AppContext.Provider;
export default AppContext;