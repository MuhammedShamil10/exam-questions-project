import React, { useEffect, useRef, useState } from "react";
import { data } from "../data/data";
import backgroundImage from "../assest/5687053.jpg";
import { ExamProgress } from "../components/progressBar";
import { CountDownModal } from "../components/countDownModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamTimeCountDown from "../components/timer";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function QuestionWithOptions() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [ConfirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const question = data[currentQuestionIndex];
  
  const [examResult, setExamResult] = useState<
    {
      question: string;
      id: number;
      answer: string;
      givenAnswer: string;
      score: number;
    }[]
  >([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  let count = 0;

  useEffect(() => {
    if (data.length > 0) {
      const initialExamResult = data.map((question) => ({
        question: question.question,
        id: question.id,
        answer: question.answer,
        givenAnswer: "",
        score: 0,
      }));
      setExamResult(initialExamResult);
    }
  }, []);

  const handleExamResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    console.log("id", id);
    console.log("checked", checked);

    const updatedExamResult = examResult.map((result, index) => {
      if (index === currentQuestionIndex) {
        const newGivenAnswer = checked ? id : "";
        const score = newGivenAnswer === result.answer ? 1 : 0;
        return { ...result, givenAnswer: newGivenAnswer, score };
      }
      return result;
    });
    setExamResult(updatedExamResult);
  };

  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    if (currentQuestionIndex === data.length - 1) {
      setConfirmationModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const confirmButton = () => {
    alert("Exam Submitted");
    console.log("examResult", examResult);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const passOrFail = examResult.filter((option) =>
    option.score === 1 ? count++ : null
  );

  if (passOrFail) {
    count >= 8
      ? console.log("you pass the test")
      : console.log("you fail the exam");
  }
  const unansweredCount = examResult.filter(item => item.givenAnswer === "").length;
  const totalQuestions = examResult.length;
  const backButton = () => setConfirmationModalOpen(false);
  return (
    <>
      <CountDownModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        label="Time over"
        info1="Your response is saved, thank you for your participation"
        info2="please inform to your invigilator"
      />
      <CountDownModal
        openModal={ConfirmationModalOpen}
        setOpenModal={setConfirmationModalOpen}
        label="Confirmation"
        info1="Are you sure you want to submit your exam? Once submitted, you will not be able to make any changes."
        info2={`Unanswered questions: ${unansweredCount} out of ${totalQuestions}`}
        buttonSubmit={confirmButton}
        buttonCancel={backButton}
        buttonLabel="Confirm"
      />
      <div
        className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {question.image && (
          <img
            className="absolute  sm:top-[8%] sm:left-[30%] md:top-[17%] md:left-[38%] md:w-44 
            lg:top-[20%] lg:left-[42%] lg:w-48 xl:top-[40%] xl:left-[1%] xl:w-64 2xl:left-[6%] 2xl:w-72"
            src={question.image}
            width={300}
            alt=""
          />
        )}
        <ExamProgress
          values={currentQuestionIndex === 0 ? -1 : currentQuestionIndex}
        />
        <ExamTimeCountDown
          initialTimer={350}
          intervalRef={intervalRef}
          setOpenModal={setOpenModal}
          confirmButton={confirmButton}
        />
        <ToastContainer />
        <div className="absolute top-0 flex flex-col justify-center p-4 w-[640px] h-full">
          {
            <div className="flex flex-col items-start" key={question.id}>
              <p className="font-mukta font-medium text-xl pl-5 pb-6">
                {currentQuestionIndex + 1}. {question.question}
              </p>
              <div className="flex flex-col pl-6 gap-2">
                {Object.entries(question.option).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="default"
                            checked={
                              examResult[currentQuestionIndex]?.givenAnswer ===
                              value
                            }
                            onChange={handleExamResult}
                            id={value}
                          />
                        }
                        label={value}
                      />
                    </FormGroup>
                  </div>
                ))}
              </div>
            </div>
          }
          <div className="flex justify-center gap-10 mt-5">
            <button
              onClick={handlePrevious}
              className="w-40 bg-transparent hover:bg-[#5e656a] font-semibold
             hover:text-white py-2 px-4 border border-[#5e656a] hover:border-transparent rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="w-40 bg-transparent hover:bg-[#5e656a] font-semibold
             hover:text-white py-2 px-4 border border-[#5e656a] hover:border-transparent rounded"
            >
              {currentQuestionIndex === data.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
