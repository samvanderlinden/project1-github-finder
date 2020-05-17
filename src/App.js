import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/about';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true }); //have not fetched users yet, so component is loading

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false })
  //   console.log(res.data) 
  // }

  //Search GitHub users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
    console.log(res.data);
  }

  //Get single GitHub user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
    console.log('getUser function returned res.data', res.data);
  }

  //Clear GitHub users
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  //Alert if no search query is entered
  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } });

    setTimeout(() => {
      this.setState({ alert: null })
    }, 5000);
  }

  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className="App">
          {/* Props for Navbar component are being passed as 'defaultProps' in Navbar component */}
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About}/>
              <Route exact path="/user/:login" render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading}/>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}
export default App;
