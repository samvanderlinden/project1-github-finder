import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT,
} from '../types';

const AlertState = props => {
    const initialState = null

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //Set alert
    const setAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            })
        }, 5000);
    }



    //the keys in the 'value' object are what what is referenced in the component
    //ex: githubContext.user, githubContext.users, gitHubContext.repos etc
    return <AlertContext.Provider
        value={{
            alert: state,
            setAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;