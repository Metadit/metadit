import React from "react"
import CircularProgress from "@mui/material/CircularProgress"

interface Props {
    size?: number
    color?: string
}

const Loading = ({ size, color }: Props) => {
    return (
        <div className="w-full h-full absolute flex justify-center items-center left-0 top-0">
            <CircularProgress
                sx={{ color: color || "white" }}
                size={size || 25}
            />
        </div>
    )
}

export default Loading
