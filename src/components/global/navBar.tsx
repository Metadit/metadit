import React from "react";
import logo from "../../assets/images/logo.svg";
import Button from "./button";

const NavBar = () => {
  return (
    <nav className="h-[75px] border-b sticky border-b-zinc-800">
      <div
        className="h-full w-full px-10 max-w-[1400px]
      mx-auto flex items-center justify-between"
      >
        <img src={logo} alt="logo" />
        <ul>
          <li></li>
        </ul>
        <div className="flex gap-4">
          <Button normal={true}>Our Discord</Button>
          <Button className="bg-primary" normal={false}>
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
