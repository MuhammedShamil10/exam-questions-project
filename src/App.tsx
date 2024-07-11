import React from "react";
import "./App.css";
import { ExamProgress } from "./components/progressBar";
import QuestionWithOptions from "./screen/questionWithOptions";

function App() {
  return (
    <div className="items-center text-center">
      <QuestionWithOptions />
    </div>
  );
}

export default App;
