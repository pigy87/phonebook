import './newmemberPage.css'


import React, { Component } from 'react';


class Newmemberpage extends Component {
   
    render() {
        return (
            <div className="newmember">
                <p id="newmemberTitle"><span id="spanYellow">N</span>ew member  </p>
                <form action= "http://localhost:4000/newmember" method="post" encType="multipart/form-data" id="newmemberForm" >
                    <label  className="newmemberP">User name:</label>
                     <input type="text" className="newmemberInput" id="userName" name="userName"/>
                    <label  className="newmemberP">Password:</label>
                    <input type="password" className="newmemberInput" id="userPassword" name="userPassword"/>
                    <label  className="newmemberP">Age:</label>
                    <input type="number" className="newmemberInput" id="userAge" name="userAge"/>
                    <label  className="newmemberP">Picture:</label>
                    <input type="file"  id="avatar" name="avatar"/>
                    <input type="submit" value="Submit" id="newmemberButton"/>
                </form>
                
                
                <footer><p>Made by Nemanja Tomic</p></footer>
            </div>
        );
    }
}

export default Newmemberpage;