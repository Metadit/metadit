import React from "react";
import Button from "../../global/Button";

const ThreadCard = () => {
  return (
    <div className="w-full border  rounded rounded-xl border-zinc-800 p-4 text-center">
      <h1 className="text-white font-bold text-[20px]">Title</h1>
      <p className="text-content text-sm my-2 leading-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi culpa
        doloribus eaque exercitationem in laboriosam libero, minima molestias
        mollitia nostrum sequi.
      </p>
      <Button normal={false} className="bg-primary w-[30%] mx-auto mt-5">
        View
      </Button>
    </div>
  );
};

export default ThreadCard;
