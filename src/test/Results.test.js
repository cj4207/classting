import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Results from "../components/Results";

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}));

describe("Results", () => {
  const mockScore = 5;
  const mockTotalQuestions = 10;
  const mockIncorrectAnswers = [{
    questionText: "What is the capital of France?",
    yourAnswer: "Paris",
    correctAnswer: "London",
  }];
  test("renders score and restart button", () => {
    render(
      <Results
        score={mockScore}
        questions={Array(10)}
        incorrectAnswers={mockIncorrectAnswers}
        totalQuestions={mockTotalQuestions}
        onRestart={() => {}}
      />,
    );
    expect(
      screen.getByText(
        `Your score is ${mockScore} out of ${mockTotalQuestions}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(`Incorrect Answers`)).toBeInTheDocument();
  });
});
