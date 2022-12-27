import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  size?: number;
  color?: string;
}

const Loading = ({ size, color }: Props) => {
  return (
    <div className="flex justify-center w-full">
      <CircularProgress sx={{ color: "white" }} size={size || 25} />
    </div>
  );
};

export default Loading;
