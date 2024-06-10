import React from "react";
import About from "./about/About";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Contact from "./Contact/Contact";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Navbar from "./Navbar/Navbar";
import "./Header/header.css";

function Home() {
  return (
    <React.Fragment>
      <header className="header center">
        <Navbar />
      </header>
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default Home;
