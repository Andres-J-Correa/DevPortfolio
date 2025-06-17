import React from "react";
import About from "./about/About";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import ScrollToTop from "./scrollToTop/ScrollToTop";

function Home() {
  return (
    <React.Fragment>
      <About />
      <Projects />
      <Skills />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default Home;
