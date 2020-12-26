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
            showDeleteModal: false,
            inputNumberId: 1

        })
    }


    showCreateModal = () => {
        this.setState({ showCreateModal: true });
    };

    hideCreateModal = () => {
        this.setState({ showCreateModal: false });
        this.removeNumberInput()
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

    addPhoneName() {
        let placeForNewphoneName = document.getElementById("addedNumberInputs");

        var select = document.createElement("SELECT");
        select.setAttribute("id", `phoneBasicName${this.state.inputNumberId}`);
        select.setAttribute("name", `phoneBasicName${this.state.inputNumberId}`);

        placeForNewphoneName.appendChild(select);


        var option1 = document.createElement("option");
        option1.setAttribute("value", "djoka");
        var phoneName1 = document.createTextNode("Please select phone name!");
        option1.appendChild(phoneName1);
        document.getElementById(`phoneBasicName${this.state.inputNumberId}`).appendChild(option1);

        var option2 = document.createElement("option");
        option2.setAttribute("value", "HomePhone");
        var phoneName2 = document.createTextNode("HomePhone");
        option2.appendChild(phoneName2);
        document.getElementById(`phoneBasicName${this.state.inputNumberId}`).appendChild(option2);

        var option3 = document.createElement("option");
        option3.setAttribute("value", "CellPhone");
        var phoneName3 = document.createTextNode("CellPhone");
        option3.appendChild(phoneName3);
        document.getElementById(`phoneBasicName${this.state.inputNumberId}`).appendChild(option3);

        var option4 = document.createElement("option");
        option4.setAttribute("value", "BusinessPhone");
        var phoneName4 = document.createTextNode("BusinessPhone");
        option4.appendChild(phoneName4);
        document.getElementById(`phoneBasicName${this.state.inputNumberId}`).appendChild(option4);

    }

    proba(){
        console.log('neske')
    }

    addNumberinput() {
        this.addPhoneName();

        let placeForNewNumberInput = document.getElementById("addedNumberInputs");
        
        let addedInputAndButtonDiv = document.createElement("DIV");
        addedInputAndButtonDiv.setAttribute("class","basicNumberInputAndAddButton");
        placeForNewNumberInput.appendChild(addedInputAndButtonDiv);
        
        this.setState({ inputNumberId: this.state.inputNumberId + 1 })
        var input = document.createElement("INPUT");
        input.setAttribute("type", "number");
        input.setAttribute("name", `number${this.state.inputNumberId}`);
        input.setAttribute("id", `number${this.state.inputNumberId}`);
        input.setAttribute("class", "createContactinput");
        addedInputAndButtonDiv.appendChild(input);

        let addNewInputButton=document.createElement("BUTTON");
        addNewInputButton.setAttribute("type", "button");
        addNewInputButton.setAttribute("class", "addNumberInputButton");
        addNewInputButton.innerHTML = "+";
        addNewInputButton.onclick=this.addNumberinput.bind(this)
        addedInputAndButtonDiv.appendChild( addNewInputButton);
        
        
    }

    removeNumberInput() {
        let placeForNewNumberInput = document.getElementById("addedNumberInputs");
        placeForNewNumberInput.innerHTML = "";
    }

    createNewContact() {

        let name = document.getElementById('name').value;
        let surName = document.getElementById('surName').value;
        let basicNumber = document.getElementById('number0').value;
        let email = document.getElementById('email').value;

        // console.log(document.getElementById('email').attributes[0].nodeValue)
        // console.log(document.getElementById('addedNumberInputs').children)
        let allNumbers = [];
        allNumbers.push(basicNumber)
        const otherDivNumbers = document.getElementById('addedNumberInputs');
        for (let i = 0; i < otherDivNumbers.children.length; i++) {
            allNumbers.push(otherDivNumbers.children[i].value);
        };

        console.log(name)
        console.log(surName)
        console.log(email)
        console.log(allNumbers)

        callServer.saveNewContact(name, surName, email, allNumbers);
    }


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



                {this.state.showCreateModal && (
                    <Modal
                        handleClose={this.hideCreateModal}>
                        <div className="createContactForm">

                            <label > Name: </label>
                            <input type="text" name="name" id="name" className="createContactinput" />

                            <label >Surname: </label>
                            <input type="text" name="surName" id="surName" className="createContactinput" />

                            <label>Email: </label>
                            <input type="email" name="email" id="email" className="createContactinput" />

                            <div className="numbersSection">
                                <select name="phoneName" id="phoneBasicName">
                                    <option value="">Please select phone name!</option>
                                    <option value="HomePhone">HomePhone</option>
                                    <option value="CellPhone">CellPhone</option>
                                    <option value="BusinessPhone">BusinessPhone</option>
                                </select>

                                <div id="basicNumberInputAndAddButton">
                                    <input type="number" name="number0" id="number0" className="firstNumberInput" />
                                    <button type="button" id="addNumberInputButton" onClick={this.addNumberinput.bind(this)}>+</button>
                                </div>
                                <div id="addedNumberInputs" className="addedNumberInputs"></div>
                            </div>


                            <button id="handleSaveContact" onClick={this.createNewContact} >Save contact!</button>
                        </div>

                    </Modal>
                )}

                <footer><p className="footerP">Made by Nemanja Tomic</p></footer>
            </div>
        );
    }
}

export default Managepage;