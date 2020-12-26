import React from 'react';
import "./landingPage.css";



class Landingpage extends React.Component {
   
    render() {
        return (
            <div className="landingPage1" >
                <p id="title"><span id="spanGreen">P</span>HONE <span id="spanYellow">B</span>OOK <span id="spanBlue">A</span>PP!</p>
                <div id="welcomeText">
                    <p className="welcomeP">Welcome to phone book app</p>
                    <p className="welcomeP">If you are new here please create your account and if you are not just login!</p>
                    <p className="welcomeP">Use our app to save new ,update old or find some contact </p>
                    <p className="welcomeP">Hope you will enjoy!</p>
                </div>
                

                <footer><p>Made by Nemanja Tomic</p></footer>
            </div>
        );
    }
}

export default Landingpage;