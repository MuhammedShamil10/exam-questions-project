import { CircularProgress } from "@mui/material";
type ProgressValue = {
  values: number;
};
export const ExamProgress = ({ values }: ProgressValue) => {
  return (
    <CircularProgress
      variant="determinate"
      style={{ color: "#B8C1CA" }}
      thickness={1}
      size={"44rem"}
      value={((values + 1) * 100) / 12}
    />
  );
};
