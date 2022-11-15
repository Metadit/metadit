import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import Button from "./button";
import Hamburger from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import HiddenMenu from "./HiddenMenu";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <nav className="h-[75px] border-b  border-b-zinc-800 sticky top-0 z-50 bg-zinc-900 bg-opacity-50 backdrop-blur">
      <div
        className="h-full w-full px-10 max-w-[1400px]
      mx-auto flex items-center justify-between"
      >
        <Link href="/">
          <Image src={logo} alt="metadit-logo" />
        </Link>
        <div className="lg:hidden">
          <Hamburger
            size={25}
            color="white"
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
        <div className="gap-4 hidden lg:flex">
          <Link target="_blank" href="https://github.com/Metadit/metadit">
            <Button normal={true}>
              <FontAwesomeIcon icon={faStar} />
              Github
            </Button>
          </Link>
          <Link target="_blank" href="https://discord.gg/r6HjT4JD5p">
            <Button normal={true}>
              <FontAwesomeIcon icon={faDiscord} />
              Our Discord
            </Button>
          </Link>
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
