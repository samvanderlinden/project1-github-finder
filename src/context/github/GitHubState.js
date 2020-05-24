import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

//Initializing GitHub client ID and secret variables
let gitHubClientId;
let gitHubClientSecret;

//Checking which environment DEV/PROD we are in
if(process.env.NODE_ENV !== 'production') {
    gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    gitHubClientId = process.env.GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    //Search user
    const searchUsers = async text => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }

    //Get single GitHub user
    const getUser = async username => {
        setLoading(); //sets 'loading' value to true

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    }

    //Get single GitHub user repos
    const getUserRepos = async username => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascclient_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    //Clear users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS,
        })
    }

    //Set loading
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    //the keys in the 'value' object are what what is referenced in the component
    //ex: githubContext.user, githubContext.users, gitHubContext.repos etc
    return <GitHubContext.Provider
        value={{
            user: state.user,
            users: state.users,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GitHubContext.Provider>
}

export default GitHubState;