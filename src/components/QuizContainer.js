import React, { useState, useEffect } from "react";
import Question from "./Question";
import Results from "./Results";
import "../style.css";

function QuizContainer() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (!quizStarted) return;
    const fetchQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple",
      );
      const data = await response.json();
      const formattedQuestions = data.results.map((questionItem, index) => {
        const answerOptions = [
          ...questionItem.incorrect_answers.map((answer) => ({
            answerText: answer,
            isCorrect: false,
          })),
          { answerText: questionItem.correct_answer, isCorrect: true },
        ];
        answerOptions.sort(() => Math.random() - 0.5);
        return {
          id: index,
          questionText: questionItem.question,
          answerOptions: answerOptions,
          correctAnswer: questionItem.correct_answer,
        };
      });
      setQuestions(formattedQuestions);
      setStartTime(new Date());
    };
    fetchQuestions();
  }, [quizStarted]);

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleAnswerSelection = (isCorrect, question, selectedAnswer) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          questionText: question.questionText,
          yourAnswer: selectedAnswer.answerText,
          correctAnswer: question.answerOptions.find((a) => a.isCorrect)
            .answerText,
        },
      ]);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setEndTime(new Date());
    }
  };

  const calculateTimeTaken = () => {
    if (!startTime || !endTime) return "0 seconds";
    const timeTaken = (endTime - startTime) / 1000; // 초 단위로 변환
    return `${timeTaken.toFixed(2)} seconds`;
  };

  return (
    <div
      className="quiz-container"
      style={{ height: showResults ? "" : "100vh" }}
    >
      <div className="quiz-content">
        {!quizStarted ? (
          <button
            className="quiz-start-button"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        ) : (
          <>
            {showResults ? (
              <Results
                score={score}
                timeTaken={calculateTimeTaken()}
                questions={questions}
                incorrectAnswers={incorrectAnswers}
              />
            ) : questions.length > 0 ? (
              <Question
                question={questions[currentQuestionIndex]}
                onAnswerSelection={(isCorrect, selectedAnswer) =>
                  handleAnswerSelection(
                    isCorrect,
                    questions[currentQuestionIndex],
                    selectedAnswer,
                  )
                }
                moveToNextQuestion={moveToNextQuestion}
              />
            ) : (
              <div className="loading-container">
                <p className="loading-text">Loading questions...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuizContainer;
