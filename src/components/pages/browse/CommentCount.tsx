import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-solid-svg-icons"

interface Props {
    count: number
}

const CommentCount = ({ count }: Props) => {
    return (
        <div className="flex gap-2 items-center">
            <FontAwesomeIcon className="text-content" icon={faComment} />
            <p className="text-content">{count}</p>
        </div>
    )
}

export default CommentCount
