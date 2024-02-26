import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function Chart({ score, totalQuestions }) {
  const chartData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        label: "Quiz Results",
        data: [score, totalQuestions - score],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="result-chart"
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "400px",
      //   width: "400px",
      // }}
    >
      <Doughnut data={chartData} />
    </div>
  );
}

export default Chart;
