import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  }
  async componentDidMount() {
    this.setState({ loading: true }); //have not fetched users yet, so component is loading

    const res = await axios.get('https://api.github.com/users');

    this.setState({ users: res.data, loading: false })
    console.log(res.data) 
  }
  render() {
    return (
      <div className="App">
        {/* Props for Navbar component are being passed as 'defaultProps' in Navbar component */}
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }
}
export default App;
