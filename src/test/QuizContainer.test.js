import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import QuizContainer from "../components/QuizContainer";

describe("QuizContainer", () => {
  test('renders "Start Quiz" button and starts quiz on click', async () => {
    render(<QuizContainer />);
    const startButton = screen.getByRole("button", { name: /Start Quiz/i });
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.queryByText(/loading questions.../i)).toBeInTheDocument();
    });
  });
});
