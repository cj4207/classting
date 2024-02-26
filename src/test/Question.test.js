import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Question from "../components/Question";
import React from "react";

describe("Question Component", () => {
  const mockQuestion = {
    question: "What is the capital of France?",
    answerOptions: [
      { answerText: "Paris", isCorrect: true },
      { answerText: "London", isCorrect: false },
      { answerText: "Berlin", isCorrect: false },
      { answerText: "Madrid", isCorrect: false },
    ],
  };
  const mockOnAnswerSelection = jest.fn();
  test("allows user to select an answer", () => {
    render(
      <Question
        question={mockQuestion}
        onAnswerSelection={mockOnAnswerSelection}
        moveToNextQuestion={() => {}}
      />,
    );

    const firstAnswerButton = screen.getByRole("button", { name: "Paris" });
    fireEvent.click(firstAnswerButton);

    expect(mockOnAnswerSelection).toHaveBeenCalledWith(true, {
      answerText: "Paris",
      isCorrect: true,
    });
  });

  test("allows user to select an answer", () => {
    render(
      <Question
        question={mockQuestion}
        onAnswerSelection={mockOnAnswerSelection}
        moveToNextQuestion={() => {}}
      />,
    );

    const firstAnswerButton = screen.getByRole("button", { name: "London" });
    fireEvent.click(firstAnswerButton);

    expect(mockOnAnswerSelection).toHaveBeenCalledWith(false, {
      answerText: "London",
      isCorrect: false,
    });
  });
});
