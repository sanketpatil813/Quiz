class score{
    constructor(username, testIndex, score) {
        this.username = username;
        this.testIndex = testIndex;
        this.score = score;
    }
}
const testScores = localStorage.getItem('allTestScores');
if(testScores === null) {
    const allTestScores = [];
    localStorage.setItem('allTestScores', JSON.stringify(allTestScores));
}
const storedTestSets = localStorage.getItem('allTestSets');

if (storedTestSets === null) {
    const allTestSets = [];
        localStorage.setItem('allTestSets', JSON.stringify(initialTestSets));
}

document.addEventListener('DOMContentLoaded', () => {
    const questionSetsContainer = document.getElementById("questionSetsContainer");
    const testSets = JSON.parse(localStorage.getItem('allTestSets')) || [];

    questionSetsContainer.innerHTML = '';

    testSets.forEach((testSet, index) => {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group';

        const testButton = document.createElement('a');
        testButton.href = `./testdetails.html?testIndex=${index}`;
        testButton.className = 'btn btn-primary active';
        testButton.innerText = `Question Set ${index + 1}: ${testSet.testName}`;

        const linkButton = document.createElement('a');
        linkButton.href = `testpage.html?testIndex=${index}`;
        linkButton.className = 'btn btn-primary';
        linkButton.innerText = 'Link';

        buttonGroup.appendChild(testButton);
        buttonGroup.appendChild(linkButton);

        questionSetsContainer.appendChild(buttonGroup);
    });
});