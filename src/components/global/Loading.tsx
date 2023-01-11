import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
    size?: number;
    color?: string;
    noAbsolute?: false;
}

const Loading = ({ size, color, noAbsolute }: Props) => {
    return (
        <div
            className={`${
                !noAbsolute ? "" : "absolute"
            } w-full h-full flex justify-center items-center left-0 top-0`}
        >
            <CircularProgress
                sx={{ color: color || "white" }}
                size={size || 25}
            />
        </div>
    );
};

export default Loading;
