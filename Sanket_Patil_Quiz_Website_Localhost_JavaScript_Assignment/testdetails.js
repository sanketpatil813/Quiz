
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const testIndex = urlParams.get('testIndex');

 
    const testSets = JSON.parse(localStorage.getItem('allTestSets')) || [];
    const allTestScores = JSON.parse(localStorage.getItem('allTestScores')) || [];

    const currentTestSet = testSets[testIndex];
    if (!currentTestSet) {
        alert("Test not found!");
        return;
    }

    const testTitle = document.getElementById('testTitle');
    const testInfo = document.getElementById('testInfo');
    testTitle.innerText = currentTestSet.testName;
    testInfo.innerHTML = `
        <p><strong>Test Name:</strong> ${currentTestSet.testName}</p>
        <p><strong>Time Duration:</strong> ${currentTestSet.timeDuration} minutes</p>
        <p><strong>Total Questions:</strong> ${currentTestSet.questions.length}</p>
    `;

    const questionsContainer = document.getElementById('questionsContainer');
    currentTestSet.questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-3';

        questionDiv.innerHTML = `<h5>Q${qIndex + 1}: ${question.qName}</h5>`;

        question.options.forEach((option, oIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check';

            optionDiv.innerHTML = `
                <input class="form-check-input" type="radio" disabled ${option.correctness ? 'checked' : ''}>
                <label class="form-check-label">${option.optionName} ${option.correctness ? '(Correct)' : ''}</label>
            `;
            questionDiv.appendChild(optionDiv);
        });

        questionsContainer.appendChild(questionDiv);
    });

    const scoresContainer = document.getElementById('scoresContainer');
    allTestScores
        .filter(score => score.testIndex === testIndex)
        .forEach(score => {
            const scoreRow = document.createElement('tr');
            scoreRow.innerHTML = `
                <td>${score.username}</td>
                <td>${score.score}</td>
            `;
            scoresContainer.appendChild(scoreRow);
        });
});
