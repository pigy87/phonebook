
import './modalContactdata.css';
import React, { Component } from 'react';

class Contactdatamodal extends Component {
  constructor(props) {
    super(props);
  }

  updateContact() {
    console.log('update works');
  }

  renderContactData(contactPersonalData) {
    return (
      <div id="contactsPersonalData">
        <label > Name: </label>
        <input type="text" defaultValue={contactPersonalData.ContactName} name="name" id="name" className="textInputs" />
        <label > Surname: </label>
        <input type="text" defaultValue={contactPersonalData.ContactSurname} name="surname" id="surname" className="textInputs" />
        <label > Email: </label>
        <input type="text" defaultValue={contactPersonalData.ContactEmail} name="email" id="email" className="textInputs" />
      </div>
    )

  }

  renderContactsNumbers(contactNumbers) {
    return contactNumbers.map((contactNumber, index) => {
      return (
        <div key={index + 1} className="numberDiv">
          <select name="phoneName" id="phoneBasicName" defaultValue={contactNumber.NumberType}>
                <option value="">Please select phone name!</option>
                <option value="HomePhone">HomePhone</option>
                <option value="CellPhone">CellPhone</option>
                <option value="BusinessPhone">BusinessPhone</option>
              </select>
          <input type="number" defaultValue={contactNumber.Number} name={`name${contactNumbers.NumberId}`} id={`name${contactNumbers.NumberId}`} className="textInputs" />
        </div>
      )
    })
  }
/*
  extractValues() {

    let name = document.getElementById('name').value;
    let surName = document.getElementById('surName').value;
    let email = document.getElementById('email').value;

    let typeOfNumber = document.getElementById('phoneBasicName').value;
    let basicNumber = document.getElementById('number0').value;

    let basicPair = {
      typeOfNumber: typeOfNumber,
      number: basicNumber
    };

    let basicPairAndAddedPairs = [];
    basicPairAndAddedPairs.push(basicPair)

    const addedNumbersNameTypes = document.getElementsByClassName('addedSelects');
    const addedNumbersValues = document.getElementsByClassName('addedNumbersInputs');

    for (let i = 0; i < addedNumbersValues.length; i++) {
      let addedPair = {
        typeOfNumber: addedNumbersNameTypes[i].value,
        number: addedNumbersValues[i].value
      };
      basicPairAndAddedPairs.push(addedPair)
    };

    let formValues = {
      name: name,
      surName: surName,
      email: email,
      numbers: basicPairAndAddedPairs
    }

   return formValues
  }
*/
  handleCloseContactdataButton() {
    let closeContactDataModal = this.props.closeContactDataModal;
    closeContactDataModal();

  }

  render() {
    // this.renderContactData()
    return (
      <div>
        <div className="modal" >
          <section className="modal-main-contactData">
            <div className="contactDataForm">
              {this.props.contactData && this.renderContactData(this.props.contactData[0])}
              {this.props.contactData && this.renderContactsNumbers(this.props.contactData[1])}
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
