import './loginPage.css'
import React, { Component } from 'react';
import callServer from '../servis/phonebookServis';



class Login extends Component {
  constructor(props) {
    super(props);
   
    this.autentificateUser = this.autentificateUser.bind(this);
  }

  autentificateUser() {
    let userName = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
    callServer.login(userName, password)   
  }

  render() {
    
    return (
      <div className="login">
        <p id="loginTitle"><span id="spanGreen">L</span>ogin </p>
        <div id="loginForm">
          <p className="loginP">User name:</p>
          <input type="text" className="loginInput" id="inputUsername" />
          <p className="loginP">Pasword:</p>
          <input type="password" className="loginInput" id="inputPassword" />
          <button onClick={this.autentificateUser} id="loginButton">Login</button>
        </div>

        <footer><p>Made by Nemanja Tomic</p></footer>
      </div>
    );
  }
}

export default Login;


