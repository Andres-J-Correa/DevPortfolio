import React from "react";

const about = {
  name: "Andres Correa",
  role: "Full Stack Software Developer",
  resume: "https://example.com",
  social: {
    linkedin: "https://www.linkedin.com/in/andres-correa-7aa819244/",
    github: "https://github.com/Andres-J-Correa",
  },
};

const projects = [
  {
    name: "AI Code Interviews",
    description:
      "A tool for practicing coding interviews with real-time feedback and dynamic problem sets",
    stack: ["CSS", "JavaScript", "React"],
    sourceCode: "https://github.com",
    path: "/interviews",
    component: React.lazy(() =>
      import("./components/Projects/interviews/LandingPage")
    ),
  },
];

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "SASS",
  "Material UI",
  "Git",
  "CI/CD",
  "Jest",
  "Enzyme",
];

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: "johnsmith@mail.com",
};

export { about, projects, skills, contact };
