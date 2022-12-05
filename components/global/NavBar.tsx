import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import Button from "./Button";
import Hamburger from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import HiddenMenu from "./HiddenMenu";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useUser } from "../../src/contexts/User";
import UserDropdown from "./UserDropdown";
import { useDetectOutsideClick } from "../../src/hooks/useDetectOutsideClick";

const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const dropDownRef = useRef(null);
  const [dropDown, toggleDropDown] = useDetectOutsideClick(dropDownRef, false);
  return (
    <nav
      ref={dropDownRef}
      className="h-[75px] border-b border-b-zinc-800 sticky top-0 z-50
    bg-contentBg bg-opacity-50 backdrop-blur"
    >
      <div
        className="h-full w-full px-10 max-w-[1400px]
      mx-auto flex items-center justify-between"
      >
        <div className="flex gap-6 w-full items-center max-w-[400px]">
          <Link href={user?.address ? "/browse" : "/"}>
            <Image
              className="w-[100px] lg:w-[200px]"
              src={logo}
              alt="metadit-logo"
            />
          </Link>
          <SearchBox className="hidden lg:block" />
        </div>
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
            <Button className="w-full" normal={true}>
              <FontAwesomeIcon icon={faDiscord} />
              Our Discord
            </Button>
          </Link>
          {user?.address ? (
            <>
              <Link href="/create">
                <Button className="bg-primary" normal={false}>
                  + Create post
                </Button>
              </Link>
              <UserDropdown
                toggleDropDown={toggleDropDown}
                dropDown={dropDown as boolean}
              />
            </>
          ) : (
            <Link href={"/login"}>
              <Button className="bg-primary" normal={false}>
                <FontAwesomeIcon icon={faSignIn} />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      {isOpen && <HiddenMenu />}
    </nav>
  );
};

export default NavBar;
