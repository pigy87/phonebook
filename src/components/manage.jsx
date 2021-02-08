import React from 'react';
import "./manage.css";
import Createmodal from './modalCreate';
import Updatemodal from './modalUpdate';
import Contactdatamodal from './modalContactdata';
import callServer from '../servis/phonebookServis';


class Managepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            showCreateModal: false,
            showUpdateModal: false,
            showDeleteModal: false,
            showContactDataModal: false,
            contactList: null,
            contactData: null,
            contactRenderd: false
        })
        console.log('constructor');

        this.getContaDataByclick = this.getContaDataByclick.bind(this);
        this.renderD = this.renderContactsList.bind(this)
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

    showContactDataModal = () => {
        this.setState({ showContactDataModal: true });
    };

    hideContactDataModal = () => {
        this.setState({ showContactDataModal: false });
    };

    showDeleteModal = () => {
        this.setState({ showDeleteModal: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDeleteModal: false });
    };


    async getContacts() {
        let Jresponse = await callServer.getAllContacts();
        let response = await Jresponse.json();
        this.setState({
            contactList: response.contacts
        })
    }

    renderContactsList(contacts) {
        return contacts.map((contact, index) => {
            return (
                
                    <tr key={contact.ContactId} id={contact.ContactId} onClick={this.getContaDataByclick}>
                        <td>{contact.ContactId}</td>
                        <td>{contact.ContactName}</td>
                        <td>{contact.ContactSurname}</td>
                        <td>{contact.ContactEmail}</td>
                    </tr>
                
            )
        })
    }


    findByUsername() {

        let valueFromInput = document.getElementById('findUserInput').value;

        let rows = document.querySelectorAll('tr');
        rows.forEach(element => {
            if (element.children[1].innerHTML === valueFromInput) {
                element.style.color = "blue"
                element.scrollIntoView();
            } else if (element.children[1].innerHTML !== valueFromInput || !valueFromInput) {
                element.style.color = ""
            }
        });
    }

    handleOpenContacts() {
        this.getContacts()
        let tbody = document.querySelector('tbody');
        tbody.style.display = 'table'
    }


    handleCloseDataButton() {
        let tbody = document.querySelector('tbody');
        tbody.style.display = 'none'
    }

    async getContaDataByclick(clickedContact) {
        console.log(clickedContact.nativeEvent.path[1].id);
        let Jresponse = await callServer.getContactById(clickedContact.nativeEvent.path[1].id);
        let response = await Jresponse.json();
        console.log(response.data);
        this.setState({
            contactData: response.data
        })
        this.showContactDataModal();
    }

    handleDelete() {
        console.log('delete button');
    }


    componentDidMount() {
        console.log('component DID MOUNT');
        this.getContacts()
        this.setState({
            contactRenderd: true
        })
    }

    render() {
        console.log('render');
        return (
            <div className="managePage" >
                <p className="titleP" id="titleManage"><span id="spanGreen">M</span>anage <span id="spanYellow">-</span> <span id="spanBlue">C</span>ontacts!</p>
                <div id="manageContact">
                    <button className="manageButtons" onClick={this.showCreateModal.bind(this)}>Create contact</button >
                    <button className="manageButtons" onClick={this.showUpdateModal.bind(this)}>Update contact</button>
                    <button className="manageButtons" onClick={this.handleDelete.bind(this)}>Delete contact</button>
                    <button className="manageButtons" onClick={this.handleOpenContacts.bind(this)}>Refresh contacts</button>
                </div>
                <div id="contactsData">
                    <p>Find by Contact Name</p>
                    <input id="findUserInput" onChange={this.findByUsername.bind(this)} type="text" />
                    <table id="contactsDataTable">
                        <tbody>
                            {this.state.contactList && this.renderContactsList(this.state.contactList)}
                        </tbody>
                    </table>
                    <button className="closeButton" onClick={this.handleCloseDataButton.bind(this)}>Close contacts</button>
                </div>
                {this.state.showCreateModal && (<Createmodal closeCreateModal={this.hideCreateModal} getContacts={this.getContacts.bind(this)}></Createmodal>)}
                {this.state.showUpdateModal && (<Updatemodal closeUpdateModal={this.hideUpdateModal}></Updatemodal>)}
                {this.state.showContactDataModal && (<Contactdatamodal closeContactDataModal={this.hideContactDataModal} contactData={this.state.contactData}></Contactdatamodal>)}
                <footer><p className="footerP">Made by Nemanja Tomic</p></footer>
            </div>
        );
    }
}

export default Managepage;