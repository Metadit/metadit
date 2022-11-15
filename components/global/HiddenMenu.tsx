import React from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faStar } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const HiddenMenu = () => {
  return (
    <div
      className="flex-col flex gap-2 p-5 w-full justify-center bg-zinc-800
           bg-opacity-50 backdrop-blur border-b  border-b-zinc-800"
    >
      <Button normal={true}>
        <FontAwesomeIcon icon={faStar} />
        Github
      </Button>
      <Button normal={true}>
        <FontAwesomeIcon icon={faDiscord} />
        Our Discord
      </Button>
      <Button className="bg-primary" normal={false}>
        <FontAwesomeIcon icon={faSignIn} />
        Login
      </Button>
    </div>
  );
};

export default HiddenMenu;
