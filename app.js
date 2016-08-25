$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "What was the most popular form of entertainment?",
            s: ["Gladiator Fights", "Pantomime", "Bathhouses", "Chariot Racing"],
            a: "Chariot Racing",
            correct: 0
        }, {
            q: "When was the first sack of Rome?",
            s: ["390BC by the Senones", "410AD by the Visigoths", "455AD by the Vandals", "420AD by the Franks"],
            a: "390BC by the Senones",
            correct: 0
        }, {
            q: "What was the Roman equivalent of the Greek god Apollo?",
            s: ["Pluto", "Mercury", "Apollo", "Jupiter"],
            a: "Apollo",
            correct: 0
        }, {
            q: "What became more common in the Roman military as time went on?",
            s: ["Slaves", "Mercenaries", "Veterans", "Militia"],
            a: "Mercenaries",
            correct: 0
        }, {
            q: "When did the Roman Empire break into East and West?",
            s: ["330AD", "351AD", "380AD", "395AD"],
            a: "395AD",
            correct: 0
        }, {
            q: "When did the Eastern Roman Empire finally fall?",
            s: ["1453", "1466", "1480", "1501"],
            a: "1453",
            correct: 0
        }, {
            q: "Who founded the city of Rome?",
            s: ["Remus", "Aeneas", "Paris", "Romulus"],
            a: "Romulus",
            correct: 0
        }, {
            q: "What was a common armament for Roman soldiers all the way until the fall of the ERE?",
            s: ["Shortsword", "Shield", "Pilum (Throwing Spear)", "All of the above"],
            a: "All of the above",
            correct: 0
        }, {
            q: "Who of the following 4 emperors was considered 'bad'?",
            s: ["Trajan", "Caligula", "Marcus Aurelius", "Hadrian"],
            a: "Caligula",
            correct: 0
        }, {
            q: "Which of these did the Romans NOT use in battle?",
            s: ["Siege Engines", "Missile Launchers", "Submarines", "Steel Bolts"],
            a: "Submarines",
            correct: 0
        }];

        var counter = questions.length;

        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT &#8594;</button></p></form>');
            }
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }

        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); 
            var qNum = $(this).closest("form").attr("id"); 
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); 
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});