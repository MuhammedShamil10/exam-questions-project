import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

type ModalProp = {
  openModal: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  info1: string;
  info2?: string;
  buttonSubmit?: () => void;
  buttonCancel?: () => void;
  buttonLabel?: string;
};

export const CountDownModal = ({
  openModal,
  setOpenModal,
  label,
  info1,
  info2,
  buttonSubmit,
  buttonCancel,
  buttonLabel,
}: ModalProp) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleButtonDisable = () => {
    buttonSubmit && buttonSubmit();
    setButtonDisable(true);
  };

  return (
    <div>
      <Modal open={openModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {label}
          </Typography>
          <Typography sx={{ mt: 2 }} className="flex flex-col justify-center">
            {info1}
          </Typography>
          <Typography sx={{ mt: 2 }} className="flex flex-col justify-center">
            {info2}
          </Typography>
          {buttonLabel && (
            <div className="flex gap-2">
              <Button
                disabled={buttonDisable}
                onClick={buttonCancel}
                variant="outlined"
              >
                Go back
              </Button>
              <Button
                onClick={handleButtonDisable}
                variant="contained"
                color="success"
              >
                {buttonLabel}
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};
