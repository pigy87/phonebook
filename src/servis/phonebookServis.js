import Emitter from '../servis/emitter';

const baseUrl = "http://192.168.0.17:4000";
let token = null;

const callServer = {
    registration(userName, userPassword, userAge, userImage) {
        console.log('registration method')
        fetch(baseUrl + "/newmember", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                userPassword: userPassword,
                userAge: userAge,
                userImage: userImage
            })
        })

        .then(response => console.log(response))


    },

    login(userName, userPassword) {
        fetch(`${baseUrl}/login?userName=${userName}&userPassword=${userPassword}`, {
            method: "POST"
        })

        .then(response => {
            if (response.status === 401) {
                alert(response.statusText)

            } else if (response.status === 200) {
                //  Emitter.emit("user_is_logged", { userIsLogged: true });
                alert("Successful Authorization")
                return response.json();

            } else {
                console.log('Error')
            }
        })

        .then(data => {
            if (data) {
                token = data.token
                Emitter.emit("user_is_logged", { userIsLogged: true });
            }
        })

    },

    saveNewContact(name, surName, email, numbers) {
        console.log('save new conatct method')
        return fetch(baseUrl + "/createcontact", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            },
            body: JSON.stringify({
                contactName: name,
                contactSurName: surName,
                contactEmail: email,
                contactNumbers: numbers
            })
        })

    },

    saveAnyway(name, surName, email, numbers, saveAnyway) {
        console.log('saveAnyway conatct method')
        return fetch(baseUrl + "/createcontact", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            },
            body: JSON.stringify({
                contactName: name,
                contactSurName: surName,
                contactEmail: email,
                contactNumbers: numbers,
                saveAnyway: saveAnyway
            })
        })

    },

    overwrite(name, surName, email, numbers, overwrite) {
        console.log('saveAnyway conatct method')
        return fetch(baseUrl + "/createcontact", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            },
            body: JSON.stringify({
                contactName: name,
                contactSurName: surName,
                contactEmail: email,
                contactNumbers: numbers,
                overWrite: overwrite
            })
        })
    },

    getAllContacts() {

        console.log('getAllUsers')
        return fetch(baseUrl + "/contactsdata", {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            }
        })
    },

    getContactById(id) {
        return fetch(baseUrl + "/contactsdata/" + id, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            }
        })
    },

    updateUser(name, surName, email, numbers) {
        console.log('saveAnyway conatct method')
        return fetch(baseUrl + "/updatecontact", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': `${token}`
            },
            body: JSON.stringify({
                contactName: name,
                contactSurName: surName,
                contactEmail: email,
                contactNumbers: numbers
            })
        })
    }





}



export default callServer;