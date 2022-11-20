import React from "react";
import NavBar from "./NavBar";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main className="px-10">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
