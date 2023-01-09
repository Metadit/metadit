import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            <main className="px-5">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
