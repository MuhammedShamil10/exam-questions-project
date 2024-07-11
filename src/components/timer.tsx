import React, { useEffect, useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";

type TimerProp = {
  initialTimer: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmButton: () => void;
};

export const Timer = ({
  initialTimer,
  confirmButton,
  setOpenModal,
}: TimerProp) => {
  const [timer, setTimer] = useState<number>(initialTimer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer === 300) {
      toast.info(`You have ${Math.floor(timer / 60)} minutes left`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    intervalRef.current = setInterval(() => {
      timer > 0 && setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setOpenModal(true);
    }
  }, [setOpenModal, timer]);


  confirmButton = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  return (
    <span className="absolute top-10 right-10">
      Time left - {`${Math.floor(timer / 60)}`.padStart(2, "0")}:
      {`${timer % 60}`.padStart(2, "0")}
    </span>
  );
};

export default Timer;
