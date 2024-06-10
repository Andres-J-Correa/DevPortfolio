import React from "react";
import About from "./about/About";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Contact from "./Contact/Contact";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

function Home() {
  return (
    <React.Fragment>
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default Home;
