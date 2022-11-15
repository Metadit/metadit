import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import Button from "./button";
import Hamburger from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import HiddenMenu from "./HiddenMenu";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <nav className="h-[75px] border-b  border-b-zinc-800 sticky top-0 z-50 bg-zinc-900 bg-opacity-50 backdrop-blur">
      <div
        className="h-full w-full px-10 max-w-[1400px]
      mx-auto flex items-center justify-between"
      >
        <Image src={logo} alt="metadit-logo" />
        <div className="lg:hidden">
          <Hamburger
            size={25}
            color="white"
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
        <div className="gap-4 hidden lg:flex">
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
      </div>
      {isOpen && <HiddenMenu />}
    </nav>
  );
};

export default NavBar;
