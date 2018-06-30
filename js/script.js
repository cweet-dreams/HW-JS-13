class Http {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    get(url, callback) {
        this.http.open("GET", url);
        const self = this;

        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText);
            }
            else {
                callback(`Error: ${self.http.status}`, null);
            }
        });
        this.http.send();
    }
}


//Class UI
class UI {
    createList(name, id) {
        //console.log(id);
        const list = document.querySelector('ul');
        // Create markup
        const li = `<li data-id = ${id}> ${name}</li>`;
        list.insertAdjacentHTML('beforeend', li);
    }

    information(fullName, username, email, website) {
        const div = document.querySelector('.info');
        const del = document.querySelector('.user-info');


        const p = `
             <table class="user-info">
         <tr>
             <td></td>
             <td><i class="far fa-times-circle"></i></td>
        </tr>
             
        <tr>
            <td>Name:</td>
            <td>${fullName}</td>
        </tr>
        <tr>
            <td>User Name:</td>
            <td>${username}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Web-site:</td>
            <td>${website}</td>
        </tr>
    </table> 
    `;
        if (del) {div.removeChild(del)}

        div.insertAdjacentHTML('afterbegin', p);
    }

}

//Events
const button = document.querySelector('.users-list');
const btnDetails = document.querySelector('ul');
const btnDelete = document.querySelector( '.info');
// Get users list
button.addEventListener('click', function (e) {

    const ui = new UI;
    const http = new Http();

    http.get("https://jsonplaceholder.typicode.com/users", function (err, res) {

        usersArr = JSON.parse(res);

        for (let i = 0; i < usersArr.length; i++) {
            fullName = usersArr[i].name;
            id = usersArr[i].id;
            ui.createList(fullName, id);
        }
    });

});


btnDetails.addEventListener('click', function (e) {
    const http = new Http();
    const ui = new UI;

    http.get("https://jsonplaceholder.typicode.com/users", function (err, res) {

        usersArr = JSON.parse(res);

        if (e.target.tagName.toLowerCase() === 'li') {

            let index = e.target.dataset.id - 1;

            fullName = usersArr[index].name;
            username = usersArr[index].username;
            email = usersArr[index].email;
            website = usersArr[index].website;

            ui.information(fullName, username, email, website);

        }
    });

});

btnDelete.addEventListener('click', function (e){
    if (e.target.tagName.toLowerCase() === 'i') {
        const div = document.querySelector('.info');
        const del = document.querySelector('.user-info');
        div.removeChild(del);
    }
    console.log();

});




