import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/about';
import axios from 'axios';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  // async componentDidMount() {
  //   this.setState({ loading: true }); //have not fetched users yet, so component is loading

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false })
  //   console.log(res.data) 
  // }

  //Search GitHub users
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);

    setLoading(false);
  }

  //Get single GitHub user
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);

    setLoading(false);
    console.log('getUser function returned res.data', res.data);
  }

  //Get single GitHub user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascclient_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);

    setLoading(false);
    console.log('getUserRepos function returned res.data', res.data);
  }

  //Clear GitHub users
  const clearUsers = () => {
    setUsers([]);

    setLoading(false);
  }

  //Alert if no search query is entered
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return (
    <Router>
      <div className="App">
        {/* Props for Navbar component are being passed as 'defaultProps' in Navbar component */}
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} 
                getUser={getUser} 
                getUserRepos={getUserRepos} 
                repos={repos} 
                user={user} 
                loading={loading} 
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>

  );
}
export default App;
