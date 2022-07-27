import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from 'types/types';


const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.parse(localStorage.getItem('user')))

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer( authReducer, {}, init );

    const login = (id = '', name = '', email = '', c_abscense = '', year = '') => {

        const user = {
            id: id,
            name: name,
            email: email,
            c_abscense: c_abscense,
            year: year
        }
        
        const action = {
            type: types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify( user ));

        dispatch(action);

    }

    return (
        <AuthContext.Provider value={{
            authState,
            login: login
        }}>
            { children }
        </AuthContext.Provider>
    )
}
