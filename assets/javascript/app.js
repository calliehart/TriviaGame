var finalLineQuestions = [
    {
        question: "Throw that junk.",
        answers: [
            "Forrest Gump",
            "Citizen Kane",
            "The Graduate"
        ],
        correctAnswer: "Citizen Kane"
    },
    {
        question: "I think this is the beginning of a beautiful friendship.",
        answers: [
            "Clueless",
            "Snow White and the Seven Dwarfs",
            "Casablanca"
        ],
        correctAnswer: "Casablanca"
    },
    {
        question: "It's too bad she won't live. But then again, who does?",
        answers: [
            "Blade Runner",
            "Jaws",
            "A Few Good Men"
        ],
        correctAnswer: "Blade Runner"
    },
    {
        question: "I love this town!",
        answers: [
            "Ghostbusters",
            "Casablanca",
            "Field of Dreams"
        ],
        correctAnswer: "Ghostbusters"
    },
    {
        question: "As you wish.",
        answers: [
            "Aladdin",
            "Big",
            "The Princess Bride"
        ],
        correctAnswer: "The Princess Bride"
    },
    {
        question: "Where we're going, we don't need roads.",
        answers: [
            "The Fast and the Furious",
            "Speed",
            "Back to the Future"
        ],
        correctAnswer: "Back to the Future"
    }
];

var bradPittQuestions = [
    {
        question: "Which is older?",
        answers: [
            "Brad Pitt",
            "lasers"
        ],
        correctAnswer: "lasers"
    },
    {
        question: "Which is older?",
        answers: [
            "Betty White",
            "penicillin"
        ],
        correctAnswer: "Betty White"
    },
    {
        question: "Which is older?",
        answers: [
            "Oreo cookies",
            "Volkswagen Beetle"
        ],
        correctAnswer: "Oreo Cookies"
    },
    {
        question: "Which is older?",
        answers: [
            "the Barbie Doll",
            "the New York Mets"
        ],
        correctAnswer: "the Barbie Doll"
    },
    {
        question: "Which is older?",
        answers: [
            "Coca-Cola",
            "the Eiffel Tower"
        ],
        correctAnswer: "Coca-Cola"
    },
    {
        question: "Which is older?",
        answers: [
            "gummy bears",
            "Band-Aids"
        ],
        correctAnswer: "Band-Aids"
    }
];

var omGeographyQuestions = [
    {
        question: "What country has the longest coastline in the world?",
        answers: [
            "Chile",
            "Australia",
            "Canada"
        ],
        correctAnswer: "Canada"
    },
    {
        question: "How many time zones are there in China?",
        answers: [
            "10",
            "1",
            "6"
        ],
        correctAnswer: "1"
    },
    {
        question: "What is the largest lake in Africa?",
        answers: [
            "Lake Victoria",
            "Lake Albert",
            "Lake Malawi"
        ],
        correctAnswer: "Lake Victoria"
    },
    {
        question: "What is the only country that doesn't have a rectangular or square national flag?",
        answers: [
            "Malta",
            "Nepal",
            "Maldives"
        ],
        correctAnswer: "Nepal"
    },
    {
        question: "What is the first country to experience each new day?",
        answers: [
            "Kiribati",
            "Liechtenstein",
            "England"
        ],
        correctAnswer: "Kiribati"
    },
    {
        question: "Which state in the U.S. has the highest surface elevation?",
        answers: [
            "Colorado",
            "Hawaii",
            "Alaska"
        ],
        correctAnswer: "Alaska"
    }
];

var questionArrays = [finalLineQuestions, bradPittQuestions, omGeographyQuestions];
var incorrectAnswerCount = 0;
var correctAnswerCount = 0;
var chosenArray = questionArrays[Math.floor(Math.random()*questionArrays.length)];
var chosenQuestionNum = 0;
var seconds = 30;
var interval = 1000;
var timer;

quizStartPage();

function reset() {
    $("#quizDescriptions").empty();
    $("#questionHolder").empty();
    quizStartPage();
    incorrectAnswerCount = 0;
    correctAnswerCount = 0;
    chosenQuestionNum = 0;
    
};


function questionTime() {
    if (seconds > 0) {
        seconds = seconds - 1;
        $("#timer").html("<h1>Time Remaining: " + seconds + "</h1>");
    } else {
        clearInterval(timer);
        evaluateAnswer();
    };
};

function answerTime() {
    setTimeout(statusOfQuiz, 3000);
    
};


function quizStartPage() {
   
    if (chosenArray === finalLineQuestions) {
        $("#quizDescriptions").html("Final Lines of Movies: Match the final quote to the correct movie!");
    } else if (chosenArray === bradPittQuestions) {
        $("#quizDescriptions").html("Brad Pitt or Lasers: Determine which of the two possibilities came first!");
    } else if (chosenArray === omGeographyQuestions) {
        $("#quizDescriptions").html("OMGeography: Answer a few geography questions!");
    };

    var startBtn = $("<button>");
    startBtn.addClass("btn btn-primary startBtn");
    startBtn.text("Start Quiz");
    $("#questionHolder").append(startBtn);
    $(".startBtn").on("click", function () {
        loadQuestion();
    });

};

function loadQuestion() {  
    $("#quizDescriptions").empty();
    $("#questionHolder").empty();
    seconds = 30;
    $("#timer").html("<h1>Time Remaining: " + seconds + "</h1>");
    timer = setInterval(questionTime, interval); 
    $("#quizDescriptions").append(chosenArray[chosenQuestionNum].question);
    
        for (var i = 0; i < chosenArray[chosenQuestionNum].answers.length; i++) {
        
        var j = $("<button>");
           
        j.addClass("answer btn");
        j.attr("data-name", chosenArray[chosenQuestionNum].answers[i]);
        j.text(chosenArray[chosenQuestionNum].answers[i]);

        $("#questionHolder").append(j);
        
        };

    $(".answer").on("click", function(event) {
        var dataName = $(this).attr('data-name');
        console.log(dataName);
        clearInterval(timer);
        evaluateAnswer(dataName);
        
        console.log(correctAnswerCount, incorrectAnswerCount);
        
    });
};

function evaluateAnswer (dataName) {
    console.log(dataName);
    var dataAnswer = chosenArray[chosenQuestionNum].correctAnswer;
    
    if ( dataAnswer === dataName ) {
        correctAnswerCount++;
        $("#quizDescriptions").empty();
        $("#questionHolder").empty();
        $("#timer").empty();

        $("#quizDescriptions").append("You Are Correct!")
        $("#questionHolder").append("<h3>The Answer is:</h3><br>" + dataAnswer);


    } else {
        incorrectAnswerCount++;
        $("#quizDescriptions").empty();
        $("#questionHolder").empty();
        $("#timer").empty();

        $("#quizDescriptions").append("Sorry, You Are Not Correct.");
        $("#questionHolder").append("<h3>The Answer is:</h3><br>" + dataAnswer);
    };
    answerTime();
    chosenQuestionNum++;
    
};

function statusOfQuiz() {
    if (chosenQuestionNum >= chosenArray.length) {
        $("#quizDescriptions").empty();
        $("#questionHolder").empty();
        $("#quizDescriptions").append("Results!!");
        $("#questionHolder").append("Correct Answers: " + correctAnswerCount + "<br>");
        $("#questionHolder").append("Incorrect Answers: " + incorrectAnswerCount + "<br>");

        var restartBtn = $("<button>");
        restartBtn.addClass("btn btn-primary restartBtn");
        restartBtn.text("Start New Quiz");
        $("#questionHolder").append(restartBtn);
        $(".restartBtn").on("click", function () {
            reset();
        });

    } else {
        loadQuestion();
    }

};


