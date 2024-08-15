class score{
    constructor(username, testIndex, score) {
        this.username = username;
        this.testIndex = testIndex;
        this.score = score;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const testIndex = urlParams.get('testIndex');

    const testSets = JSON.parse(localStorage.getItem('allTestSets')) || [];

    const currentTestSet = testSets[testIndex];

    if (!currentTestSet) {
        alert("Test not found!");
        return;
    }

 
    document.getElementById('testTitle').innerText = currentTestSet.testName;


    const questionsContainer = document.getElementById('questionsContainer');
    currentTestSet.questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';


        questionDiv.innerHTML = `<h5>Q${qIndex + 1}: ${question.qName}</h5>`;

        question.options.forEach((option, oIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check';

            optionDiv.innerHTML = `
                <input class="form-check-input" type="radio" name="question${qIndex}" id="question${qIndex}Option${oIndex}" value="${oIndex}">
                <label class="form-check-label" for="question${qIndex}Option${oIndex}">
                    ${option.optionName}
                </label>
            `;
            questionDiv.appendChild(optionDiv);
        });

        questionsContainer.appendChild(questionDiv);
    });


    const testForm = document.getElementById('testForm');
    testForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let totalScore = 0;

        currentTestSet.questions.forEach((question, qIndex) => {

            const selectedOption = document.querySelector(`input[name="question${qIndex}"]:checked`);

            if (selectedOption) {
                const selectedOptionIndex = parseInt(selectedOption.value);

                if (question.options[selectedOptionIndex].correctness) {
                    totalScore += question.points;
                }
            }
        });

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const username = users[0].username || '';
        const newScore = new score(username, testIndex, totalScore);

    
        const allTestScores = JSON.parse(localStorage.getItem('allTestScores')) || [];
        allTestScores.push(newScore);
        localStorage.setItem('allTestScores', JSON.stringify(allTestScores));

        alert(`Test submitted! Your score is: ${totalScore}`);
        window.location.href = './results.html';
    });
});

