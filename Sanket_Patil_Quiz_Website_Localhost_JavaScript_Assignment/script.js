class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
class Option {
    constructor(optionName, correctness = false) {
        this.optionName = optionName;
        this.correctness = correctness;
    }
}

class Question {
    constructor(qName, points, options) {
        this.qName = qName;
        this.points = points;
        this.options = options;
    }
}

class TestSet {
    constructor(testName, timeDuration = 60, questions = []) {
        this.testName = testName;
        this.questions = questions;
        this.timeDuration = questions;
    }
}

let users = [];
const login = document.getElementById("loginButton");
let questionsCount = 0;
let saveUser = (e) => {
    console.log("login pressed")
    e.preventDefault();
    let fName = document.getElementById("inputUsername1");
    let uEmail = document.getElementById("inputEmail1");
    let uPass = document.getElementById("inputPassword1");
    users.push(new User(fName.value, uEmail.value, uPass.value))
    localStorage.setItem("users", JSON.stringify(users))
    if(fName.value && uEmail.value && uPass.value) {
        window.location.replace("./testsets.html");
    }
    else {
        alert("Required fields are empty!!!");
    }
}
if(login){
    login.addEventListener("click", saveUser);
}
let addQuestionButton = document.getElementById("");