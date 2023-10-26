/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
const AppContext = ({ children }) => {
    const [currUser, setCurrUser] = useState();

    return (
        <UserContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContext;
