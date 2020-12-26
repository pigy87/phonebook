import React from 'react';
import "./modal.css";
import callServer from '../servis/phonebookServis';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      inputNumberId: 1
    })
  }

  addPhoneName() {
    let placeForNewphoneName = document.getElementById("divForAddedNumberInputsAndButtonsDivs"); /*ovde*/ 

    var select = document.createElement("SELECT");
    select.setAttribute("id", `phoneBasicName${this.state.inputNumberId}`);
    select.setAttribute("name", `phoneBasicName${this.state.inputNumberId}`);
    select.setAttribute("class", "addedSelects");
    placeForNewphoneName.appendChild(select);

    var option1 = document.createElement("option");
    option1.setAttribute("value", "Phone");
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

  addMoreNumberFields() {
    this.addPhoneName();

    let placeForNewNumberInput = document.getElementById("divForAddedNumberInputsAndButtonsDivs");/*ovde*/ 

    let addedInputAndButtonDiv = document.createElement("DIV");
    addedInputAndButtonDiv.setAttribute("class", "addedNumberInputAndAddButtonDiv");
    placeForNewNumberInput.appendChild(addedInputAndButtonDiv);

    this.setState({ inputNumberId: this.state.inputNumberId + 1 })
    var input = document.createElement("INPUT");
    input.setAttribute("type", "number");
    input.setAttribute("name", `number${this.state.inputNumberId}`);
    input.setAttribute("id", `number${this.state.inputNumberId}`);
    input.setAttribute("class", "addedNumbersInputs");
    addedInputAndButtonDiv.appendChild(input);

    let addNewInputButton = document.createElement("BUTTON");
    addNewInputButton.setAttribute("type", "button");
    addNewInputButton.setAttribute("class", "addNumberInputButton");
    addNewInputButton.innerHTML = "+";
    addNewInputButton.onclick = this.addMoreNumberFields.bind(this)
    addedInputAndButtonDiv.appendChild(addNewInputButton);

  }


  createNewContact() {

    let name = document.getElementById('name').value;
    let surName = document.getElementById('surName').value;
    let email = document.getElementById('email').value;
    
    let typeOfNumber=document.getElementById('phoneBasicName').value;
    let basicNumber = document.getElementById('number0').value;
  
    let basicPair= {
      typeOfNumber:typeOfNumber,
      number:basicNumber
    };
    
    let basicPairAndAddedPairs = [];
    basicPairAndAddedPairs.push(basicPair)
    
    const addedNumbersNameTypes = document.getElementsByClassName('addedSelects'); 
    const addedNumbersValues=document.getElementsByClassName('addedNumbersInputs');
  
    for (let i = 0; i < addedNumbersValues.length; i++) {
      let addedPair= {
        typeOfNumber:addedNumbersNameTypes[i].value,
        number:addedNumbersValues[i].value
      };
      basicPairAndAddedPairs.push(addedPair)
     };

   callServer.saveNewContact(name, surName, email, basicPairAndAddedPairs);
  }

  removeAddedNumberFields() {
    let placeForNewNumberInput = document.getElementById("divForAddedNumberInputsAndButtonsDivs"); /*ovde*/ 
    placeForNewNumberInput.innerHTML = "";
  }

  handleCloseCreateModal() {
    let closeCreateModal = this.props.closeCreateModal;
    closeCreateModal();
    this.removeAddedNumberFields();

  }


  render() {

    return (
      <div className="modal" >
        <section className="modal-main">
          <div className="contactForm">

            <label > Name: </label>
            <input type="text" name="name" id="name" className="textInputs" />

            <label >Surname: </label>
            <input type="text" name="surName" id="surName" className="textInputs" />

            <label>Email: </label>
            <input type="email" name="email" id="email" className="textInputs" />

            <div className="numbersSection">
              <select name="phoneName" id="phoneBasicName">
                <option value="">Please select phone name!</option>
                <option value="HomePhone">HomePhone</option>
                <option value="CellPhone">CellPhone</option>
                <option value="BusinessPhone">BusinessPhone</option>
              </select>

              <div id="basicNumberInputAndAddButton">
                <input type="number" name="number0" id="number0" className="firstNumberInput" />
                <button type="button" className="addNumberInputButton" onClick={this.addMoreNumberFields.bind(this)}>+</button>
              </div>
              <div id="divForAddedNumberInputsAndButtonsDivs" ></div>
            </div>


            <button id="handleSaveContact" onClick={this.createNewContact} >Save contact!</button>
            <button id="closeCreateModalButton" onClick={this.handleCloseCreateModal.bind(this)}>Close Create Contact</button>
          </div>



        </section>
      </div>
    );
  }
};


export default Modal