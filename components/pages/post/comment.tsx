import React from "react";
import Avatar from "react-avatar";
import CommentVote from "./CommentVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faFlag } from "@fortawesome/free-solid-svg-icons";

const Comment = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-wrap gap-2">
        <Avatar
          className="mr-2 align-top"
          name="Jager32"
          size="40"
          round={true}
        />
        <div className="flex flex-wrap items-center flex-col">
          <div className="flex w-full gap-2 items-center">
            <h2 className="text-[15px] text-white font-bold">John Doe</h2>
            <p className="text-content text-sm">13hr.ago</p>
          </div>
          <p className="text-white text-[14px] mt-1 w-full text-left">
            Yo this was hilarious and so funny xD
          </p>
          <div className="justify-start mt-4 w-full flex gap-4 items-center">
            <CommentVote count={200} />
            <p
              className="text-content text-sm
            transition-all duration-200 cursor-pointer
             hover:text-primary"
            >
              <FontAwesomeIcon className="mr-1" icon={faReply} />
              Reply
            </p>
            <p
              className="text-content text-sm
            transition-all duration-200 cursor-pointer
             hover:text-primary"
            >
              <FontAwesomeIcon className="mr-1" icon={faFlag} />
              Report
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
