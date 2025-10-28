import { createContext, useContext, useReducer } from 'react';
import AppReducer, { initalState } from './AppReducer';
const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initalState);
    return (
        <GlobalContext.Provider value={{ user: state.user, basket: state.basket,  products: state.products, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;

export const useAuth = () => {
    return useContext(GlobalContext);
}
