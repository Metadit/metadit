import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NavBar from "./components/global/navBar";
import Footer from "./components/global/footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
