import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Emitter from '../servis/emitter';


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            loggedIn: false,
            redirect: null
        })
      
    }

    componentDidMount() {
       
        Emitter.on("user_is_logged", (payload) => {

            return this.setState({
                loggedIn: payload.userIsLogged,
                redirect: "/managecontacts"
            });
        })
    }

   
    handleLogout() {
        this.setState({
            loggedIn: false
        })
        window.location.replace("/login");
    }

    render() {
        
       

        return (
            <div className="divnav">
                <nav id="nav">
                    <Link to="/">
                        <li className="navli" id="lanadingNav"><span id="spanGreen">L</span>anding page</li>
                    </Link>

                    <Link to={this.state.loggedIn ? "/managecontacts" : "/login"}>
                        {this.state.loggedIn ? <li className="navli" id="loginNav"><span id="spanYellow">M</span>anage <span id="spanBlue">C</span>ontacts</li> : <li className="navli" id="loginNav"><span id="spanYellow">L</span>ogin</li>}
                    </Link>
                    {this.state.loggedIn && <Redirect to={this.state.redirect} />}
                    <Link to="/newmember">
                        <li className="navli" id="newmemberNav"><span id="spanBlue">N</span>ew member</li>
                    </Link>
                </nav>
                {this.state.loggedIn && <button onClick={this.handleLogout.bind(this)} id="logout">Log out!</button>}
            </div>
        )
    }
}

export default Nav;