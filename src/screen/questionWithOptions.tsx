import React, { useEffect, useRef, useState } from "react";
import { data } from "../data/data";
import backgroundImage from "../assest/5687053.jpg";
import { Checkbox, Label } from "flowbite-react";
import { ExamProgress } from "../components/progressBar";
import { CountDownModal } from "../components/countDownModal";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timer from "../components/timer";
export default function QuestionWithOptions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ConfirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  // const [timer, setTimer] = useState<number>(400);
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const question = data[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    if (currentQuestionIndex === data.length - 1) {
      console.log("clicked");

      setConfirmationModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // useEffect(() => {
  //   if (timer === 300) {
  //     toast.info(`You have ${Math.floor(timer / 60)} minutes left`, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       rtl: false,
  //       pauseOnFocusLoss: true,
  //       draggable: true,
  //       pauseOnHover: true,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  //   intervalRef.current = setInterval(() => {
  //     timer > 0 && setTimer((prevTimer) => prevTimer - 1);
  //   }, 1000);
  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [timer]);

  // useEffect(() => {
  //   if (timer === 0) {
  //     setOpenModal(true);
  //   }
  // }, [timer]);

  const confirmButton = () => {
    alert("Exam Submitted");
  };

  const backButton = () => setConfirmationModalOpen(false);

  return (
    <>
      <CountDownModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        label="Time over"
        info1="Your time is over, thank you for your participation"
        info2="please inform to your invigilator"
      />
      <CountDownModal
        openModal={ConfirmationModalOpen}
        setOpenModal={setConfirmationModalOpen}
        label="Confirmation"
        info1="Are you sure you want to submit your exam? Once submitted, you will not be able to make any changes."
        buttonSubmit={confirmButton}
        buttonCancel={backButton}
        buttonLabel="Confirm"
      />
      <div
        className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <ExamProgress
          values={currentQuestionIndex === 0 ? -1 : currentQuestionIndex}
        />
        <Timer
          initialTimer={400}
          setOpenModal={setOpenModal}
          confirmButton={confirmButton}
        />
        <ToastContainer />
        <div className="absolute top-0 flex flex-col justify-center p-4 w-[650px] h-full">
          {
            <div className="flex flex-col items-start" key={question.id}>
              {question.image && (
                <img
                  className="absolute top-[10%] left-[39%]"
                  src={question.image}
                  width={120}
                  alt=""
                />
              )}
              <p className="font-mono font-medium text-xl pl-5 pb-6">
                {currentQuestionIndex + 1},{question.question}
              </p>
              <div className="flex flex-col pl-6 gap-3">
                {Object.entries(question.option).map(([key, value]) => (
                  <div className="flex gap-3">
                    <Checkbox id={value} />
                    <Label
                      htmlFor={value}
                      className="text-base font-light"
                      key={key}
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          }
          <div className="flex justify-center gap-10 mt-5">
            <button
              onClick={handlePrevious}
              className="w-40 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
             hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="w-40 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
             hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {currentQuestionIndex === data.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
