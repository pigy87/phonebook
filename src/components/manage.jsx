import React from 'react';
import "./manage.css";
import Modal from './modal'
import callServer from '../servis/phonebookServis';

class Managepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            showCreateModal: false,
            showUpdateModal: false,
            showDeleteModal: false       
        })
    }

    showCreateModal = () => {
        this.setState({ showCreateModal: true });
    };

    hideCreateModal = () => {
        this.setState({ showCreateModal: false });   
    };

    showUpdateModal = () => {
        this.setState({ showUpdateModal: true });
    };

    hideUpdateModal = () => {
        this.setState({ showUpdateModal: false });
    };
    showDeleteModal = () => {
        this.setState({ showDeleteModal: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDeleteModal: false });
    };




    render() {
        console.log(this.state.showCreateModal)

        return (
            <div className="managePage" >
                <p className="titleP" id="titleManage"><span id="spanGreen">M</span>anage <span id="spanYellow">-</span> <span id="spanBlue">C</span>ontacts!</p>
                <div id="manageContact">
                    <button className="manageButtons" onClick={this.showCreateModal.bind(this)}>Create contact</button >
                    <button className="manageButtons" onClick={this.showUpdateModal.bind(this)}>Update contact</button>
                    <button className="manageButtons" onClick={this.showDeleteModal.bind(this)}>Delete contact</button>
                    <button className="manageButtons">Get all contacts</button>
                </div>

                {this.state.showCreateModal && (<Modal closeCreateModal={this.hideCreateModal}></Modal>)}

                <footer><p className="footerP">Made by Nemanja Tomic</p></footer>
            </div>
        );
    }
}

export default Managepage;