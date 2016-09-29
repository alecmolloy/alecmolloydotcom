var currentLevel = 0;
var score = 0;
var stars = [];
var levelNames = ['planet', 'draw', 'snake', 'pong', 'ls', 'tilde', 'colour', 'minecraft']

var initialiseGame = function () {
    currentLevel = 0;
    score = 0;
    stars = [];

    // Put focus in the answer field
    document.addEventListener('mouseup', function () {
        answerField.focus();
    });
    answerField.focus();

    answerField.addEventListener('keyup', submitAnswer);
    newLevel();
}

var newLevel = function () {
    // Set current level to the first level (planet)
    var levelNum = Math.floor(Math.random() * levelNames.length);

    currentLevel = levelNames[levelNum];
    document.getElementById('body').style.backgroundImage = 'url(img/bg-' + levelNum + '.png)';
}

var submitAnswer = function (e) {
    if (e.which === 13) {
        for (var i = 0; i < answers[currentLevel].length; i++) {
            if (answerField.value === answers[currentLevel][i]) {
                console.log('you got it right!');
                success()
                return true;
            }
        }
        failure();
    }
}

var success = function () {
    var star = document.createElement('img')
    star.src = 'img/star.svg';
    star.className = 'star';
    document.getElementById('starbox').appendChild(star);
    stars.push(star);

    answerField.value = '';
    newLevel();
}

var failure = function () {
    answerField.value = '';
    newLevel();
}
