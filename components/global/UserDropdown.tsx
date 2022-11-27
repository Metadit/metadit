import React from "react";
import { useUser } from "../../src/contexts/User";
import Avatar from "react-avatar";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDropdown = () => {
  const { user } = useUser();
  return (
    <div
      className="text-white text-[12px]
      flex items-center justify-between gap-5 cursor-pointer
      transition-all w-auto px-7 rounded-md hover:transition-all
      hover:duration-200 hover:brightness-125 bg-zinc-800 border border-zinc-700"
    >
      <div className="flex items-center">
        <Avatar
          className="mr-2 align-top"
          name="Jager32"
          size="20"
          round={true}
        />
        <p className="text-[13px]">{user?.address.substring(0, 6)}...</p>
      </div>
      <FontAwesomeIcon className="mr-2" icon={faCaretDown} />
    </div>
  );
};

export default UserDropdown;
