import React, { useState } from "react";

function Question({ question, onAnswerSelection, moveToNextQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const handleAnswerClick = (index, isCorrect) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
    onAnswerSelection(isCorrect, question.answerOptions[index]);
  };

  const resetSelectedAnswer = () => {
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    moveToNextQuestion();
  };

  return (
    <div className="question-container">
      <div
        className="question-title"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />
      <div className="answer-options">
        {question.answerOptions.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index, answer.isCorrect)}
            dangerouslySetInnerHTML={{ __html: answer.answerText }}
            className={`answer-option ${
              selectedAnswer === index
                ? answer.isCorrect
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
          />
        ))}
      </div>
      <button
        className="next-button"
        onClick={resetSelectedAnswer}
        disabled={!isAnswerSelected}
        style={{ cursor: !isAnswerSelected && "not-allowed", backgroundColor: !isAnswerSelected && 'gray' }}
      >
        다음 문제
      </button>
    </div>
  );
}

export default Question;
