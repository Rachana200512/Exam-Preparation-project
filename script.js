// ===============================
// GET ELEMENTS
// ===============================

const questions = document.querySelectorAll(".question-row");

const progress = document.getElementById("progress");
const attempted = document.getElementById("attempted");

const submitBtn = document.getElementById("submitBtn");

const resultCard = document.getElementById("resultCard");
const scoreDisplay = document.getElementById("score");
const percentageDisplay = document.getElementById("percentage");

const closeBtn = document.getElementById("closeBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");


// ===============================
// PROGRESS BAR
// ===============================

function updateProgress() {

    let answered = 0;

    questions.forEach(function(question) {

        const selected = question.querySelector(
            'input[type="radio"]:checked'
        );

        if (selected) {
            answered++;
        }

    });

    const total = questions.length;

    const percentage = (answered / total) * 100;

    progress.style.width = percentage + "%";

    attempted.textContent = answered;
}


// Detect when an option is selected

const radioButtons = document.querySelectorAll(
    'input[type="radio"]'
);

radioButtons.forEach(function(radio) {

    radio.addEventListener("change", updateProgress);

});


// ===============================
// SUBMIT AND CALCULATE SCORE
// ===============================

submitBtn.addEventListener("click", function() {

    let score = 0;

    questions.forEach(function(question) {

        const correctAnswer = question.dataset.answer;

        const selected = question.querySelector(
            'input[type="radio"]:checked'
        );


        // Get all options

        const options = question.querySelectorAll(".opt");


        // Remove old styles and messages

        options.forEach(function(option) {

            option.classList.remove(
                "correct-answer",
                "wrong-answer"
            );

        });


        const oldStatus = question.querySelector(
            ".answer-status"
        );

        if (oldStatus) {
            oldStatus.remove();
        }


        // ===============================
        // HIGHLIGHT CORRECT ANSWER
        // ===============================

        options.forEach(function(option) {

            const radio = option.querySelector(
                'input[type="radio"]'
            );

            if (radio.value === correctAnswer) {

                option.classList.add(
                    "correct-answer"
                );

            }

        });


        // ===============================
        // CHECK USER ANSWER
        // ===============================

        if (selected) {

            if (selected.value === correctAnswer) {

                // Correct answer

                score++;

                const status = document.createElement("div");

                status.className = "answer-status correct-status";

                status.textContent = "✓ Correct";

                question.appendChild(status);

            } else {

                // Wrong answer

                selected.closest(".opt").classList.add(
                    "wrong-answer"
                );

                const status = document.createElement("div");

                status.className = "answer-status wrong-status";

                // Find the correct answer text

                const correctOption = question.querySelector(
                    'input[value="' + correctAnswer + '"]'
                );

                let correctText = correctAnswer;

                if (correctOption) {

                    correctText =
                        correctOption.nextElementSibling.textContent;

                }

                status.textContent =
                    "✗ Incorrect — Correct answer: " +
                    correctText;

                question.appendChild(status);

            }

        } else {

            // ===============================
            // NOT ANSWERED
            // ===============================

            const status = document.createElement("div");

            status.className = "answer-status unanswered-status";

            const correctOption = question.querySelector(
                'input[value="' + correctAnswer + '"]'
            );

            let correctText = correctAnswer;

            if (correctOption) {

                correctText =
                    correctOption.nextElementSibling.textContent;

            }

            status.textContent =
                "⚠ Not answered — Correct answer: " +
                correctText;

            question.appendChild(status);

        }

    });


    // ===============================
    // SHOW RESULT
    // ===============================

    const total = questions.length;

    const percentage = (score / total) * 100;

    scoreDisplay.textContent =
        score + " / " + total;

    percentageDisplay.textContent =
        percentage + "%";

    resultCard.style.display = "block";

});


// ===============================
// CLOSE RESULT CARD
// ===============================

closeBtn.addEventListener("click", function() {

    resultCard.style.display = "none";

});


// ===============================
// TRY AGAIN
// ===============================

tryAgainBtn.addEventListener("click", function() {

    location.reload();

});