import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/about';
import { NotFound } from './components/pages/NotFound';
import GitHubState from './context/github/GitHubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GitHubState>
      <AlertState>
      <Router>
        <div className="App">
          {/* Props for Navbar component are being passed as 'defaultProps' in Navbar component */}
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
      </AlertState>
    </GitHubState>
  );
}
export default App;
