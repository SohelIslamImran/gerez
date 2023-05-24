import { createContext, useContext, useState } from "react";
import { getDecodedUser } from "../components/login/LoginManager";
import useFetch from "../hooks/useFetch";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(getDecodedUser);
    const [selectedService, setSelectedService] = useState([]);
    const { data, loading } = useFetch(`/isAdmin?email=${loggedInUser?.email}`, {}, [
        loggedInUser?.email,
    ]);

    return (
        <AppContext.Provider
            value={{
                loggedInUser,
                isAdmin: data,
                selectedService,
                setLoggedInUser,
                setSelectedService,
                adminLoading: loading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
