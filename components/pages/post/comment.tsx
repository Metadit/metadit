import React from "react";
import Avatar from "react-avatar";
import CommentVote from "./CommentVote";

const Comment = () => {
  return (
    <div className="flex w-full">
      <div className="flex gap-2">
        <Avatar
          className="mr-2 align-top"
          name="Jager32"
          size="40"
          round={true}
        />
        <div className="flex items-center flex-col">
          <div className="flex w-full gap-2 items-center">
            <h2 className="text-[15px] text-white font-bold">John Doe</h2>
            <p className="text-content text-sm">13hr.ago</p>
          </div>
          <p className="text-white text-[14px] mt-1">
            Yo this was hilarious and so funny xD
          </p>
          <div className="justify-start mt-4 w-full">
            <CommentVote count={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
