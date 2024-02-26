// Results.js
import React from "react";
import Chart from "./Chart";

function Results({ questions, score, incorrectAnswers, timeTaken }) {
  return (
    <div className="result-contanier">
      <p className="score">
        Your score is {score} out of {questions.length}
      </p>
      <p className="time-taken">Time taken: {timeTaken}</p>
      <Chart score={score} totalQuestions={questions.length} />
      {incorrectAnswers.length > 0 && (
        <div className="incorrect-answers">
          <h3>Incorrect Answers</h3>
          {incorrectAnswers.map((item, index) => (
            <div key={index} className="incorrect-item">
              <p className="question-text" dangerouslySetInnerHTML={{ __html: item.questionText }} />
              <p className="user-answer">Your answer: <span dangerouslySetInnerHTML={{ __html: item.yourAnswer }} /></p>
              <p className="correct-answer">Correct answer: <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} /></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
