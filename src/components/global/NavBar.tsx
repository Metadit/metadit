import React, { useRef, useState } from "react";
import logo from "../../../public/images/logo.svg";
import Button from "./Button";
import Hamburger from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faSignIn, faStar } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import HiddenMenu from "./HiddenMenu";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useUser } from "../../contexts/User";
import TextInput from "./TextInput";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

const NavBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { user } = useUser();
    const dropDownRef = useRef(null);
    const [dropDown, toggleDropDown] = useDetectOutsideClick(
        dropDownRef,
        false
    );
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
                <div className="flex gap-6 w-full items-center md:max-w-[400px] xl:max-w-[450px]">
                    <Link href={user?.wallet_address ? "/browse?tab=top" : "/"}>
                        <Image
                            className="w-[100px] lg:w-[200px]"
                            src={logo}
                            alt="metadit-logo"
                        />
                    </Link>
                    <Link className="hidden lg:flex" href="/browse?tab=top">
                        <p
                            className="text-white transition-all duration-200
             font-bold text-[13px] hover:text-primary flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faGlobe} />
                            Browse
                        </p>
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
                    <Link
                        target="_blank"
                        href="https://github.com/Metadit/metadit"
                    >
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
                    {user ? (
                        <>
                            <Link href="/create">
                                <Button className="bg-primary" normal={false}>
                                    + Create post
                                </Button>
                            </Link>
                            <TextInput
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
            {isOpen && <HiddenMenu closeMenu={() => setOpen(!isOpen)} />}
        </nav>
    );
};

export default NavBar;
