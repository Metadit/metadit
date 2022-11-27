import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faStar } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import SearchBox from "./SearchBox";

const HiddenMenu = () => {
  return (
    <div
      className="flex-col flex gap-2 p-5 w-full justify-center bg-zinc-800
           bg-opacity-50 backdrop-blur border-b  border-b-zinc-800"
    >
      <Link target="_blank" href="https://github.com/Metadit/metadit">
        <Button className="w-full" normal={true}>
          <FontAwesomeIcon icon={faStar} />
          Github
        </Button>
      </Link>
      <Link target="_blank" href="https://discord.gg/r6HjT4JD5p">
        <Button className="w-full" normal={true}>
          <FontAwesomeIcon icon={faDiscord} />
          Our Discord
        </Button>
      </Link>
      <Link href={"/login"}>
        <Button className="bg-primary w-full" normal={false}>
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </Button>
      </Link>
      <SearchBox className="mt-5" />
    </div>
  );
};

export default HiddenMenu;
