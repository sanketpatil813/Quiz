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
    constructor(testName, timeDuration = 60, questions = [], totalPoints = 0) {
        this.testName = testName;
        this.questions = questions;
        this.timeDuration = timeDuration;
        this.totalPoints = totalPoints;
    }
}

let newTestSets = [];

document.addEventListener('DOMContentLoaded', () => {
    const addQuestionButton = document.getElementById("addQuestionButton");
    const formContainer = document.getElementById("addQuestionFormContainer");

    let newQuestion = () => {
        console.log("In New Question");

        const newQuestionDiv = document.createElement("div");
        newQuestionDiv.className = "addQuestion";

        newQuestionDiv.innerHTML = `
            <div class="form-group">
                <div class="questiontext">
                    <label for="question">Question:</label>
                    <input type="text" name="question" required>
                </div>
            </div>
            <div id="options-container">
                <div class="option-group">
                    <label for="option1">Option 1:</label>
                    <input type="text" name="options[]" required>
                </div>
                <div class="option-group">
                    <label for="option2">Option 2:</label>
                    <input type="text" name="options[]" required>
                </div>
                <div class="option-group">
                    <label for="option3">Option 3:</label>
                    <input type="text" name="options[]" required>
                </div>
                <div class="option-group">
                    <label for="option4">Option 4:</label>
                    <input type="text" name="options[]" required>
                </div>
            </div>
            <div id="correct-option-group" class="correct-option-group">
                <label for="correct-option">Select the correct option:</label>
                <select name="correct-option" required>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>
            </div>
            <div class="option-group">
                <label for="points">Points:</label>
                <input type="number" name="points" required>
            </div>
        `;

        formContainer.appendChild(newQuestionDiv);
    }

    addQuestionButton.addEventListener("click", newQuestion);

    const addNewTest = document.getElementById("submitButtonNewTest");
    let newTest = (e) => {
        e.preventDefault();

        console.log("In newTest");

        let questions = [];
        let totalPoints = 0;

        let tName = document.getElementById("testName").value;
        let tDuration = document.getElementById("time-limit").value;

        const questionForms = document.querySelectorAll(".addQuestion");

        questionForms.forEach(form => {
            const qName = form.querySelector('input[name="question"]').value;
            const points = parseInt(form.querySelector('input[name="points"]').value);
            totalPoints += points;

            let options = [];
            const correctOptionValue = form.querySelector('select[name="correct-option"]').value;

            const optionInputs = form.querySelectorAll('input[name="options[]"]');
            optionInputs.forEach((input, index) => {
                const isCorrect = (index === parseInt(correctOptionValue.replace("option", "")) - 1);
                options.push(new Option(input.value, isCorrect));
            });

            questions.push(new Question(qName, points, options));
        });

        const testSet = new TestSet(tName, tDuration, questions, totalPoints);
        newTestSets.push(testSet);

        console.log("Test Set Created:", testSet);
        console.log("All Test Sets:", newTestSets);

        let existingTestSets = JSON.parse(localStorage.getItem('allTestSets')) || [];
        existingTestSets.push(...newTestSets);
        localStorage.setItem('allTestSets', JSON.stringify(existingTestSets));

        window.location.replace("./testsets.html");
    }

    if (addNewTest) {
        addNewTest.addEventListener("click", newTest);
    } else {
        console.log("Add new test button not found");
        alert("Add new test button not found");
    }
});
