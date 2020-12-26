import React from 'react';
import './App.css';
import Managepage from './manage';
import Landingpage from "./landingPage";
import Loginpage from "./loginPage";
import Newmemberpage from "./newmemberPage";
import Nav from './nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div id="app">
          <Nav />
          <Switch>
            <Route path="/" exact component={Landingpage} />
            <Route path="/login" component={Loginpage} />
            <Route path="/newmember" component={Newmemberpage}  />
            <Route path="/managecontacts" component={Managepage} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
