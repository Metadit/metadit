import React from "react";
import Comment from "./comment";

const Comments = () => {
  return (
    <div className="flex flex-col gap-10">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Comment key={i} />
        ))}
    </div>
  );
};

export default Comments;
