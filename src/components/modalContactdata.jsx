
import './modalContactdata.css';
import React, { Component } from 'react';
import callServer from '../servis/phonebookServis';

class Contactdatamodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: this.props.contactData[0],
      contactPhones: this.props.contactData[1],
      startInput:false,
      numerationNumber: this.props.contactData[1].length + 1,
      name: this.props.contactData[0].ContactName || "",
      surname: this.props.contactData[0].ContactSurname || "",
      email: this.props.contactData[0].ContactEmail || ""

    };
  }

  handleChangeContactData(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setInitalStateForNumbers(contactNumbers) {
    contactNumbers.map((contactNumber, index) => {
      return this.setState(
        {
          [`numberType${index + 1}`]: contactNumber.NumberType,
          [`number${index + 1}`]: contactNumber.Number
        }
      )
    })

  }



  updateContact() {
    let basicPairAndAddedPairs = [];
    let firstNumber;
    if(this.state.numberType0){
      firstNumber=-1
    }else{
      firstNumber=0
    }
    for (let i =firstNumber ; i <= this.state.numerationNumber - 2; i++) {

      console.log(this.state[`number${i + 1}`]);
      let addedPair = {
        typeOfNumber: this.state[`numberType${i + 1}`],
        number: this.state[`number${i + 1}`]
      };
      if (addedPair.typeOfNumber !== 'undefined') {
        basicPairAndAddedPairs.push(addedPair)
      } else {
        console.log('1 inde');

      }
    }

    let valuesForUpdate = {
      id: this.state.contactData.ContactId,
      name: this.state.name,
      surName: this.state.surname,
      email: this.state.email,
      numbers: basicPairAndAddedPairs
    }
    console.log(this.state);
    console.log(valuesForUpdate);
    
        callServer.updateContact(valuesForUpdate.id, valuesForUpdate.name, valuesForUpdate.surName, valuesForUpdate.email, valuesForUpdate.numbers)
          .then(response => response.json())
          .then(jResponse => alert(jResponse.response));
    

  }

  renderContactData() {
    return (
      <div id="contactsPersonalData">
        <label > Name: </label>
        <input type="text" value={this.state.name} onChange={this.handleChangeContactData.bind(this)} name="name" id="name" className="textInputs" />
        <label > Surname: </label>
        <input type="text" value={this.state.surname} onChange={this.handleChangeContactData.bind(this)} name="surname" id="surname" className="textInputs" />
        <label > Email: </label>
        <input type="text" value={this.state.email} onChange={this.handleChangeContactData.bind(this)} name="email" id="email" className="textInputs" />
      </div>
    )
  }

  renderContactsNumbers(contactNumbers) {

    
    return contactNumbers.map((contactNumber, index) => {

      let numberType = this.state[`numberType` + (index + 1)];
      let number = this.state[`number` + (index + 1)];
      console.log(numberType);
      console.log(number);

      return (
        <div key={index + 1} className="numberDiv">
          <select name={`numberType${index + 1}`} id="phoneBasicName" value={numberType} onChange={this.handleChangeContactData.bind(this)}>
            <option value="">Please select phone name!</option>
            <option value="HomePhone">HomePhone</option>
            <option value="CellPhone">CellPhone</option>
            <option value="BusinessPhone">BusinessPhone</option>
          </select>
          <div id="divForAddedNumberInputsAndButtons">
            <input type="text" name={`number${index + 1}`} value={number} onChange={this.handleChangeContactData.bind(this)} id={`number${index + 1}`} className="addedNumbersInputs" />
            <button type="button" className="addNumberInputButton" onClick={this.addMoreNumberFields.bind(this)}>+</button>
            <button type="button" className="deleteNumberInputButton" onClick={this.deleteNumberInputButton.bind(this)}>-</button>
          </div>
        </div>
      )
    })
  
  }

  startInput() {
    console.log('startInput');
   
    return (
      <div className="numberDiv">
        <select name="numberType0" id="phoneBasicName" value={this.state.numberType0} onChange={this.handleChangeContactData.bind(this)}>
          <option value="">Please select phone name!</option>
          <option value="HomePhone">HomePhone</option>
          <option value="CellPhone">CellPhone</option>
          <option value="BusinessPhone">BusinessPhone</option>
        </select>
        <div id="divForAddedNumberInputsAndButtons">
          <input type="text" name="number0" value={this.state.number0} onChange={this.handleChangeContactData.bind(this)} id="number1" className="addedNumbersInputs" />
          <button type="button" className="addNumberInputButton" onClick={this.addMoreNumberFields.bind(this)}>+</button>
          <button type="button" className="deleteNumberInputButton" onClick={this.deleteNumberInputButton.bind(this)}>-</button>
        </div>
      </div>
    )
    
    

  }

  addPhoneName() {

    let placeForNewphoneName = document.getElementById("divForAddedNumberInputsAndButtonsDivs");
    let numerationNumber = this.state.numerationNumber;

    var select = document.createElement("SELECT");
    select.setAttribute("id", `phoneBasicName${numerationNumber}`);
    select.setAttribute("name", `numberType${numerationNumber}`);
    select.setAttribute("class", "addedSelects");
    select.setAttribute("value", " ");
    select.onchange = this.handleChangeContactData.bind(this)

    placeForNewphoneName.appendChild(select);


    var option1 = document.createElement("option");
    option1.setAttribute("value", "Phone");
    var phoneName1 = document.createTextNode("Please select phone name!");
    option1.appendChild(phoneName1);
    document.getElementById(`phoneBasicName${numerationNumber}`).appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value", "HomePhone");
    var phoneName2 = document.createTextNode("HomePhone");
    option2.appendChild(phoneName2);
    document.getElementById(`phoneBasicName${numerationNumber}`).appendChild(option2);

    var option3 = document.createElement("option");
    option3.setAttribute("value", "CellPhone");
    var phoneName3 = document.createTextNode("CellPhone");
    option3.appendChild(phoneName3);
    document.getElementById(`phoneBasicName${numerationNumber}`).appendChild(option3);

    var option4 = document.createElement("option");
    option4.setAttribute("value", "BusinessPhone");
    var phoneName4 = document.createTextNode("BusinessPhone");
    option4.appendChild(phoneName4);
    document.getElementById(`phoneBasicName${numerationNumber}`).appendChild(option4);

    return select
  }

  addMoreNumberFields() {
    let select = this.addPhoneName();

    let placeForNewNumberInput = document.getElementById("divForAddedNumberInputsAndButtonsDivs");
    let numerationNumber = this.state.numerationNumber;
    let number = this.state[`number` + numerationNumber];
    console.log(`this is number:${number}`);

    let numberDiv = document.createElement("DIV");
    placeForNewNumberInput.appendChild(numberDiv);
    numberDiv.setAttribute("class", "numberDiv");
    numberDiv.appendChild(select)

    let addedInputAndButtonDiv = document.createElement("DIV");
    addedInputAndButtonDiv.setAttribute("class", "addedNumberInputAndAddButtonDiv");

    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("name", `number${numerationNumber}`);
    input.setAttribute("id", `number${numerationNumber}`);
    input.setAttribute("class", "addedNumbersInputs");
    
    input.setAttribute("value", " ");
    input.onchange = this.handleChangeContactData.bind(this)

    addedInputAndButtonDiv.appendChild(input);

    let addNewInputButton = document.createElement("BUTTON");
    addNewInputButton.setAttribute("type", "button");
    addNewInputButton.setAttribute("class", "addNumberInputButton");
    addNewInputButton.innerHTML = "+";
    addNewInputButton.onclick = this.addMoreNumberFields.bind(this)
    addedInputAndButtonDiv.appendChild(addNewInputButton);


    let addNewDeleteInputButton = document.createElement("BUTTON");
    addNewDeleteInputButton.setAttribute("type", "button");
    addNewDeleteInputButton.setAttribute("class", "deleteNumberInputButton");
    addNewDeleteInputButton.setAttribute("id", `deleteNumber${numerationNumber}`);
    addNewDeleteInputButton.innerHTML = "-";
    addNewDeleteInputButton.onclick = this.deleteNumberInputButton.bind(this)
    addedInputAndButtonDiv.appendChild(addNewDeleteInputButton);

    numberDiv.appendChild(addedInputAndButtonDiv);

    this.setState({
      numerationNumber: this.state.numerationNumber + 1
    })
  }

  deleteNumberInputButton(e) {
    let id = e.target.parentElement.firstChild.attributes[2].nodeValue.slice(-1);
    let numberType = `numberType${id}`
    let number = `number${id}`;
    console.log(numberType);
    console.log(number);
    this.setState({
      [numberType]: 'undefined',
      [number]: 'undefined'
    })

    let fatherElement = e.target.parentNode.parentNode
    console.log(fatherElement);
    fatherElement.remove()
  }


  handleCloseContactdataButton() {
    let closeContactDataModal = this.props.closeContactDataModal;
    closeContactDataModal();
  }

  
  componentWillMount(){
    this.setInitalStateForNumbers(this.props.contactData[1])
  }

  render() {
    console.log('rendermodal');

    let phones=this.props.contactData[1].length
    console.log(this.state);
    return (
      <div>
        <div className="modal" >
          <section className="modal-main-contactData">
            <div className="contactDataForm">
              {this.props.contactData && this.renderContactData()}
              <div className="numbers">
                {phones!==0?this.renderContactsNumbers(this.state.contactPhones):this.startInput()}
                <div id="divForAddedNumberInputsAndButtonsDivs"> </div>
              </div>
              <button id="handleSaveContact" onClick={this.updateContact.bind(this)} >Update contact!</button>
              <button id="closeContactDataModalButton" onClick={this.handleCloseContactdataButton.bind(this)}>Close Contact Data</button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Contactdatamodal;
